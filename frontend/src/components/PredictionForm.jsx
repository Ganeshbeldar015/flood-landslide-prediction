import { useState } from "react";
import axios from "axios";
import Result from "./ResultCard";
import {
  MapPin,
  Waves,
  Mountain,
  Leaf,
  History,
  Search,
  Loader2
} from "lucide-react";

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    city: "",
    river_level: "",
    slope: "",
    vegetation: "",
    past_events: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData
      );
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-10">

      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold flex justify-center gap-2">
          <Search />
          Disaster Risk Prediction
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Weather data is fetched automatically using live APIs
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Field icon={<MapPin />} label="City Name">
          <input name="city" onChange={handleChange} className="input" />
        </Field>

        <Field icon={<Waves />} label="River Level (m)">
          <input name="river_level" type="number" onChange={handleChange} className="input" />
        </Field>

        <Field icon={<Mountain />} label="Slope (°)">
          <input name="slope" type="number" onChange={handleChange} className="input" />
        </Field>

        <Field icon={<Leaf />} label="Vegetation Index">
          <input name="vegetation" step="0.01" type="number" onChange={handleChange} className="input" />
        </Field>

        <Field icon={<History />} label="Past Events">
          <input name="past_events" type="number" onChange={handleChange} className="input" />
        </Field>
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-10 w-full flex justify-center items-center gap-3
                   bg-gradient-to-r from-blue-600 to-indigo-700
                   text-white py-4 rounded-2xl font-semibold text-lg
                   hover:scale-[1.02] transition
                   disabled:opacity-60"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Search />}
        {loading ? "Analyzing Risk..." : "Predict Risk"}
      </button>

      {error && (
        <p className="text-red-600 text-center text-sm mt-4">{error}</p>
      )}

      {result && <Result result={result} />}
    </div>
  );
}

/* Reusable Field */
function Field({ icon, label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
