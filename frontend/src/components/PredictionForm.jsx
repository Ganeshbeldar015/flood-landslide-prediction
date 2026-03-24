import { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Waves,
  Mountain,
  Leaf,
  History,
  Search,
  Loader2
} from "lucide-react";
import ResultCard from "./ResultCard";
import { saveHistory } from "../utils/historyStorage";


export default function PredictionForm() {
  // Initial state helper
  const initialState = {
    city: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.city) {
      setError("Please enter a target city to fetch live weather and geographical data.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post(
        "/api/predict",
        formData
      );

      setResult(res.data);
      saveHistory({
        city: res.data.city,
        flood: res.data.flood_risk,
        landslide: res.data.landslide_risk,
        date: new Date().toLocaleString()
      });


      // Reset form after successful prediction
      setFormData(initialState);

    } catch (err) {
      setError("Failed to fetch analysis. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#2D2C2A] rounded-[2rem] shadow-xl border border-[#3E3D3B]/50 p-10 transition-all">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif text-[#F0EFEA] tracking-tight">
          Risk Assessment
        </h2>
        <p className="text-[#A09E99] mt-2 text-xs font-medium tracking-wide uppercase">
          Live Environmental Data Processing
        </p>
      </div>

      {/* Inputs */}
      <div className="mb-10 w-full flex flex-col gap-6">
        <Field
          label="Target City"
          desc="Fetches real-time weather & geographical data"
          icon={<MapPin size={16} className="text-[#A3B18A]" />}
        >
          <input
            name="city"
            value={formData.city}
            placeholder="e.g. Mumbai"
            className="dark-input w-full"
            onChange={handleChange}
          />
        </Field>
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex justify-center items-center gap-3
                   bg-[#D96B58] hover:bg-[#C55A48] text-[#F0EFEA] 
                   py-4 rounded-xl font-medium text-base shadow-lg
                   shadow-[#D96B58]/20 transition-all
                   hover:-translate-y-0.5 active:translate-y-0
                   disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
        {loading ? "Analyzing Data..." : "Run Risk Analysis"}
      </button>

      {/* Error */}
      {error && (
        <p className="text-[#D96B58] text-sm mt-4 text-center font-medium">
          {error}
        </p>
      )}

      {/* Result */}
      {result && <ResultCard result={result} />}
    </div>
  );
}

/* ---------- Field Component ---------- */

function Field({ icon, label, desc, children }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center px-1 mb-1">
        <label className="text-xs font-medium text-[#F0EFEA] flex items-center gap-2">
          {icon} {label}
        </label>
        <span className="text-[10px] text-[#A09E99]">
          {desc}
        </span>
      </div>
      {children}
    </div>
  );
}
