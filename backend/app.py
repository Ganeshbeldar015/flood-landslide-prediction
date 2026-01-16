import os
import pickle
import numpy as np
import requests
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
flood_model = pickle.load(open("flood_model.pkl", "rb"))
landslide_model = pickle.load(open("landslide_model.pkl", "rb"))

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

@app.route("/")
def home():
    return {"message": "Flood & Landslide Prediction API running"}

@app.route("/predict", methods=["POST"])
def predict():
    d = request.json
    weather = get_weather(d["city"])
    if not weather:
        return {"error": "Invalid city"}, 400

    X = np.array([[
        weather["rainfall"],
        float(d["river_level"]),
        weather["humidity"],
        float(d["slope"]),
        float(d["vegetation"]),
        int(d["past_events"])
    ]])

    return jsonify({
        "city": d["city"],
        "lat": weather["lat"],
        "lon": weather["lon"],
        "rainfall_mm": weather["rainfall"],
        "humidity_percent": weather["humidity"],
        "flood_risk": "High" if flood_model.predict(X)[0] == 1 else "Low",
        "landslide_risk": "High" if landslide_model.predict(X)[0] == 1 else "Low"
    })

if __name__ == "__main__":
    app.run(debug=True)
