# 🌊⛰️ GeoGuard  
### Flood & Landslide Prediction System using Machine Learning

GeoGuard is a web-based disaster prediction system that uses **Machine Learning**, **live weather data**, and **interactive maps** to predict **flood and landslide risks** for different cities.  
The system also provides **emergency response information** and maintains a **history of past predictions** for analysis.

---

## 📌 Features
### 🔮 Prediction Module
- Predicts **Flood Risk** and **Landslide Risk**
- Uses **Machine Learning models** (Random Forest)
- Combines **live weather data** with environmental parameters
- Displays results with **color-coded risk levels**

### 🌦️ Live Weather Integration
- Fetches real-time data using **OpenWeather API**
- Parameters used:
  - Rainfall
  - Humidity
  - Latitude & Longitude

### 🗺️ Map Visualization
- Integrated **Google Maps**
- Displays city location with **risk markers**
- Helps in spatial understanding of disaster-prone areas

### 🚨 Emergency Response Page
- City-wise **emergency helpline numbers**
- Click-to-call support
- Flood and landslide safety guidance
- Static data for reliability during emergencies

### 🕘 History Page
- Stores past predictions using **localStorage**
- Displays:
  - City
  - Date & Time
  - Flood Risk
  - Landslide Risk
- Color-coded risk badges
- Clear history option

### 🎨 UI / UX
- Modern **dark theme**
- Built using **Tailwind CSS**
- Consistent design across all pages
- Mobile-friendly layout
- Uses **lucide-react icons**

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- lucide-react
- Axios
- Google Maps API

### Backend
- Flask
- Python
- Scikit-learn
- NumPy
- Pandas

### Machine Learning
- Random Forest Classifier
- Trained on historical flood & landslide data

---

## 📂 Project Structure
Flood-and-Landslide-Prediction/
│
├── backend/
│ ├── app.py
│ ├── model.py
│ ├── dataset.csv
│ ├── requirements.txt
│ └── .env
│
├── frontend/
│ ├── public/
│ │ └── favicon.svg
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── data/
│ │ ├── utils/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── .env
│
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/geoguard.git
cd geoguard

#Backend setup 
cd backend
pip install -r requirements.txt
python model.py
python app.py

#Create .env file:
OPENWEATHER_API_KEY=your_openweather_api_key

# Frontend Setup
cd frontend
npm install
npm run dev

#🧠 How the System Works
User enters city and environmental parameters
Backend fetches live weather data
ML model predicts flood & landslide risk
Results are displayed with:
Risk indicators
Google Map visualization
Prediction is saved in history
Emergency page provides immediate response information

👨‍💻 Author
Ganesh Bhaktaraj Beldar
Engineering Student – AI & Data Science

🧾 Disclaimer
This project is for educational and research purposes only.
Predictions are based on historical and real-time data and should not replace official disaster warnings.
