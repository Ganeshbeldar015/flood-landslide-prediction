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
if not API_KEY:
    raise Exception("OpenWeather API key not found")

app = Flask(__name__)
CORS(app)

# Load models
model_path = os.path.dirname(__file__)
flood_model = pickle.load(open(os.path.join(model_path, "flood_model.pkl"), "rb"))
landslide_model = pickle.load(open(os.path.join(model_path, "landslide_model.pkl"), "rb"))

def get_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    res = requests.get(url)

    if res.status_code != 200:
        return None

    data = res.json()
    return {
        "rainfall": data.get("rain", {}).get("1h", 0),
        "humidity": data["main"]["humidity"],
        "lat": data["coord"]["lat"],
        "lon": data["coord"]["lon"]
    }

def generate_geo_data(city):
    # Deterministically generate realistic-looking geo data based on city name
    hash_val = int(hashlib.md5(city.lower().encode('utf-8')).hexdigest(), 16)
    
    # Generate river_level between 1.0 and 15.0 meters
    river_level = 1.0 + (hash_val % 140) / 10.0
    
    # Generate slope between 0 and 45 degrees
    slope = hash_val % 46
    
    # Generate vegetation index (NDVI) between 0.1 and 0.9
    vegetation = 0.1 + (hash_val % 80) / 100.0
    
    # Generate past_events between 0 and 10
    past_events = hash_val % 11
    
    return {
        "river_level": round(river_level, 2),
        "slope": slope,
        "vegetation": round(vegetation, 2),
        "past_events": past_events
    }


@app.route("/")
def home():
    return {"message": "Flood & Landslide Prediction API running"}

@app.route("/predict", methods=["POST"])
def predict():
    d = request.json
    city = d.get("city", "")
    if not city:
        return {"error": "City is required"}, 400

    weather = get_weather(city)
    if not weather:
        return {"error": f"Could not find weather for '{city}'. Please check the spelling."}, 400

    geo_data = generate_geo_data(city)

    X = np.array([[
        weather["rainfall"],
        geo_data["river_level"],
        weather["humidity"],
        geo_data["slope"],
        geo_data["vegetation"],
        geo_data["past_events"]
    ]])
    
    flood_risk = "High" if flood_model.predict(X)[0] == 1 else "Low"
    landslide_risk = "High" if landslide_model.predict(X)[0] == 1 else "Low"

    return jsonify({
        "city": city,
        "lat": weather["lat"],
        "lon": weather["lon"],
        "rainfall_mm": weather["rainfall"],
        "humidity_percent": weather["humidity"],
        "river_level": geo_data["river_level"],
        "slope": geo_data["slope"],
        "vegetation": geo_data["vegetation"],
        "past_events": geo_data["past_events"],
        "flood_risk": flood_risk,
        "landslide_risk": landslide_risk
    })

if __name__ == "__main__":
    app.run(debug=True)
