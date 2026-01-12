import { useState } from "react";
import axios from "axios";
import { MapPin, Waves, Mountain, Leaf, History, Search, Loader2 } from "lucide-react";
import ResultCard from "./ResultCard";

export default function PredictionForm() {
  // Initial state helper
  const initialState = {
    city: "",
    river_level: "",
    slope: "",
    vegetation: "",
    past_events: ""
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
      setError("Please enter a target city.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null); 

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData); 
      setResult(res.data);
      
      // --- AUTO-REMOVE DATA HERE ---
      setFormData(initialState); 
      // -----------------------------

    } catch (err) {
      setError("Failed to fetch analysis. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#1e293b] rounded-[2.5rem] shadow-2xl border border-slate-700/40 p-10 transition-all">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-white italic tracking-tighter">Prediction Engine</h2>
        <p className="text-slate-500 mt-1 text-[10px] font-bold uppercase tracking-[0.4em]">Live Environmental Data Processing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mb-10">
        <Field label="Target City" desc="Primary location" icon={<MapPin size={16} className="text-emerald-400" />}>
          <input 
            name="city" 
            value={formData.city} // Added value binding
            placeholder="e.g. Mumbai" 
            className="dark-input w-full" 
            onChange={handleChange} 
          />
        </Field>
        
        <Field label="River Level" desc="Meters (0.00)" icon={<Waves size={16} className="text-cyan-400" />}>
          <input 
            name="river_level" 
            value={formData.river_level} // Added value binding
            type="number" 
            placeholder="4.2" 
            className="dark-input w-full" 
            onChange={handleChange} 
          />
        </Field>
        
        <Field label="Slope Angle" desc="Degrees (0-90)" icon={<Mountain size={16} className="text-orange-400" />}>
          <input 
            name="slope" 
            value={formData.slope} // Added value binding
            type="number" 
            placeholder="25" 
            className="dark-input w-full" 
            onChange={handleChange} 
          />
        </Field>
        
        <Field label="Vegetation" desc="NDVI Index" icon={<Leaf size={16} className="text-emerald-400" />}>
          <input 
            name="vegetation" 
            value={formData.vegetation} // Added value binding
            step="0.01" 
            type="number" 
            placeholder="0.65" 
            className="dark-input w-full" 
            onChange={handleChange} 
          />
        </Field>
        
        <Field label="Past Events" desc="Historical count" icon={<History size={16} className="text-purple-400" />}>
          <input 
            name="past_events" 
            value={formData.past_events} // Added value binding
            type="number" 
            placeholder="2" 
            className="dark-input w-full" 
            onChange={handleChange} 
          />
        </Field>
      </div>

      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="w-full flex justify-center items-center gap-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
        {loading ? "ANALYZING..." : "RUN RISK ANALYSIS"}
      </button>

      {error && <p className="text-red-400 text-xs mt-4 text-center font-bold">{error}</p>}

      {result && <ResultCard result={result} />}
    </div>
  );
}

function Field({ icon, label, desc, children }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center px-1">
        <label className="text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-2">
          {icon} {label}
        </label>
        <span className="text-[9px] text-slate-500 italic font-semibold">{desc}</span>
      </div>
      {children}
    </div>
  );
}