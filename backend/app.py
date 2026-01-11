import os
import pickle
import numpy as np
import requests

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# --------------------------------------------------
# Load environment variables
# --------------------------------------------------
load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

if not API_KEY:
    raise Exception("❌ OpenWeather API key not found in .env file")

# --------------------------------------------------
# Flask app setup
# --------------------------------------------------
app = Flask(__name__)
CORS(app)  # Allow frontend (React) to access backend

# --------------------------------------------------
# Load trained ML models
# --------------------------------------------------
try:
    flood_model = pickle.load(open("flood_model.pkl", "rb"))
    landslide_model = pickle.load(open("landslide_model.pkl", "rb"))
except FileNotFoundError:
    raise Exception("❌ Model files not found. Run model.py first.")

# --------------------------------------------------
# Helper function: Fetch live weather data
# --------------------------------------------------
def get_weather(city):
    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}&appid={API_KEY}&units=metric"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return None, None, "City not found or API error"

    data = response.json()

    rainfall = data.get("rain", {}).get("1h", 0)  # mm
    humidity = data["main"]["humidity"]           # %

    return rainfall, humidity, None

# --------------------------------------------------
# Routes
# --------------------------------------------------

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Flood & Landslide Prediction API is running 🚀"
    })

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # Required input
        city = data.get("city")
        river_level = float(data.get("river_level"))
        slope = float(data.get("slope"))
        vegetation = float(data.get("vegetation"))
        past_events = int(data.get("past_events"))

        if not city:
            return jsonify({"error": "City name is required"}), 400

        # Fetch live weather
        rainfall, humidity, error = get_weather(city)
        if error:
            return jsonify({"error": error}), 400

        # Prepare ML input
        features = np.array([[
            rainfall,
            river_level,
            humidity,
            slope,
            vegetation,
            past_events
        ]])

        # Predictions
        flood_pred = flood_model.predict(features)[0]
        landslide_pred = landslide_model.predict(features)[0]

        return jsonify({
            "city": city,
            "rainfall_mm": rainfall,
            "humidity_percent": humidity,
            "flood_risk": "High" if flood_pred == 1 else "Low",
            "landslide_risk": "High" if landslide_pred == 1 else "Low"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --------------------------------------------------
# Run server
# --------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
