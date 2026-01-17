import { AlertTriangle, CheckCircle, Calendar, MapPin } from "lucide-react";

export default function HistoryCard({ item }) {
  const Risk = ({ label, value }) => {
    const high = value === "High";
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold
          ${high
            ? "bg-red-500/10 text-red-400"
            : "bg-emerald-500/10 text-emerald-400"}`}
      >
        {high ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
        {label}: {value}
      </div>
    );
  };

  return (
    <div className="bg-[#0f172a] border border-slate-700 rounded-2xl p-6
                    hover:border-emerald-500/40 transition">

      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 text-white font-black text-lg">
            <MapPin size={16} className="text-emerald-400" />
            {item.city}
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
            <Calendar size={12} />
            {item.date}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Risk label="Flood" value={item.flood} />
        <Risk label="Landslide" value={item.landslide} />
      </div>
    </div>
  );
}
