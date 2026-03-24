import os
import pickle
import numpy as np
import requests
import hashlib
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")
NASA_API_KEY = os.getenv("NASA_API_KEY", "w0I4nC4PHtg1DvsDQcttcLhm0rAM3zEYWJB9wlZJ")
if not API_KEY:
    raise Exception("OpenWeather API key not found")

app = Flask(__name__)
CORS(app)

# Load Hybrid Model
from PIL import Image
import io
import math
import sys

# Instead of using pickle (which causes __main__ AttributeError), 
# we instantiate the mock model directly since TensorFlow is unvailable on Python 3.14.
try:
    from train_mock_hybrid import MockHybridModel
    hybrid_model = MockHybridModel()
except ImportError:
    print("Could not import MockHybridModel. Please ensure train_mock_hybrid.py exists.")
    sys.exit(1)

def get_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    res = requests.get(url)

    if res.status_code != 200:
        return None

    data = res.json()
    
    # Extract rainfall if available, else 0
    rainfall = 0
    if "rain" in data and "1h" in data["rain"]:
        rainfall = data["rain"]["1h"]

    return {
        "humidity": data["main"]["humidity"],
        "lat": data["coord"]["lat"],
        "lon": data["coord"]["lon"],
        "rainfall": rainfall
    }

def generate_geo_data(city):
    # Simulate a database lookup for geographical metrics using deterministic random
    import random
    np.random.seed(sum(ord(c) for c in city)) 
    return {
        "river_level": round(np.random.uniform(1.0, 15.0), 2),
        "slope": round(np.random.uniform(0.0, 60.0), 2),
        "vegetation": round(np.random.uniform(0.1, 1.0), 2),
        "past_events": np.random.randint(0, 10)
    }

def fetch_satellite_image(lat, lon, zoom=12):
    headers = {"User-Agent": "FloodPredictionApp/1.0"}

    # 1. Try NASA Earth Imagery API first!
    try:
        nasa_url = f"https://api.nasa.gov/planetary/earth/imagery?lon={lon}&lat={lat}&dim=0.15&api_key={NASA_API_KEY}"
        res = requests.get(nasa_url, headers=headers, timeout=8)
        if res.status_code == 200:
            print("Successfully fetched satellite image from NASA Earth API")
            return Image.open(io.BytesIO(res.content)).convert('RGB')
    except Exception as e:
        print(f"NASA API Failed: {e}. Falling back to ArcGIS...")

    # 2. Fallback to live satellite tile from ArcGIS World Imagery
    try:
        lat_rad = math.radians(lat)
        n = 2.0 ** zoom
        xtile = int((lon + 180.0) / 360.0 * n)
        ytile = int((1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n)
        
        url = f"https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{zoom}/{ytile}/{xtile}"
        headers = {"User-Agent": "FloodPredictionApp/1.0"}
        res = requests.get(url, headers=headers, timeout=5)
        if res.status_code == 200:
            return Image.open(io.BytesIO(res.content)).convert('RGB')
    except Exception as e:
        print(f"Error fetching satellite image: {e}")
    
    # Fallback to random noise image if API fails
    return Image.fromarray(np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8))

@app.route("/")
def home():
    return {"message": "Flood & Landslide Prediction API running"}

@app.route("/predict", methods=["POST"])
def predict():
    d = request.json if request.json else request.form
    city = d.get("city", "")
    if not city:
        return {"error": "City is required to fetch real-time weather data."}, 400

    weather = get_weather(city)
    if not weather:
        return {"error": f"Could not find weather for '{city}'. Please check the spelling."}, 400

    try:
        # Process Live Satellite Image
        img = fetch_satellite_image(weather["lat"], weather["lon"])
        img = img.resize((224, 224))
        img_array = np.array(img, dtype=np.float32) / 255.0
        img_batch = np.expand_dims(img_array, axis=0)  # Shape: (1, 224, 224, 3)
        
        # Process Environmental Data Automatically
        geo_data = generate_geo_data(city)
        rainfall = float(weather.get("rainfall", 0))
        river_level = float(geo_data["river_level"])
        humidity = float(weather["humidity"])
        slope = float(geo_data["slope"])
        vegetation = float(geo_data["vegetation"])
        past_events = float(geo_data["past_events"])
        
        weather_features = np.array([[
            rainfall,
            river_level,
            humidity,
            slope,
            vegetation,
            past_events
        ]], dtype=np.float32)
        weather_batch = np.expand_dims(weather_features, axis=0) # Shape: (1, 1, 6)
        
    except (ValueError, TypeError) as e:
        return {"error": "Invalid input values. Please provide valid data."}, 400
    except Exception as e:
        return {"error": f"Error processing input: {str(e)}"}, 400

    # Run Prediction
    prediction = hybrid_model.predict({'image_input': img_batch, 'weather_input': weather_batch})
    
    flood_pred = float(np.array(prediction[0]).flatten()[0])
    landslide_pred = float(np.array(prediction[1]).flatten()[0])
    
    flood_risk = "High" if flood_pred > 0.5 else "Low"
    landslide_risk = "High" if landslide_pred > 0.5 else "Low"

    return jsonify({
        "city": city,
        "lat": weather["lat"],
        "lon": weather["lon"],
        "rainfall_mm": rainfall,
        "humidity_percent": humidity,
        "river_level": river_level,
        "slope": slope,
        "vegetation": vegetation,
        "past_events": past_events,
        "flood_risk": flood_risk,
        "landslide_risk": landslide_risk,
        "flood_probability": flood_pred,
        "landslide_probability": landslide_pred
    })

if __name__ == "__main__":
    app.run(debug=True)
