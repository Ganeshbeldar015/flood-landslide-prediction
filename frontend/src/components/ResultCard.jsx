import {
  AlertTriangle,
  CheckCircle,
  CloudRain,
  Droplets,
  MapPin
} from "lucide-react";
import MapView from "./MapView";

const getRiskConfig = (risk) => {
  if (risk === "High") {
    return {
      color: "text-red-400",
      bg: "bg-red-500/5",
      border: "border-red-500/20",
      bar: "w-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
    };
  }

  if (risk === "Medium") {
    return {
      color: "text-amber-400",
      bg: "bg-amber-500/5",
      border: "border-amber-500/20",
      bar: "w-2/3 bg-amber-500"
    };
  }

  return {
    color: "text-emerald-400",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
    bar: "w-1/3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"
  };
};

export default function ResultCard({ result }) {
  // 🔍 DEBUG (you can remove later)
  console.log("Map coords:", result.lat, result.lon);

  return (
    <div className="mt-16 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Section Title */}
      <div className="flex items-center gap-4 mb-8 opacity-40">
        <div className="h-px flex-1 bg-slate-700" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">
          Computation Output
        </h3>
        <div className="h-px flex-1 bg-slate-700" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <StatCard
          icon={<MapPin className="text-emerald-400" />}
          label="Target"
          value={result.city}
        />
        <StatCard
          icon={<CloudRain className="text-blue-400" />}
          label="Rainfall"
          value={`${result.rainfall_mm} mm`}
        />
        <StatCard
          icon={<Droplets className="text-cyan-400" />}
          label="Humidity"
          value={`${result.humidity_percent}%`}
        />
      </div>

      {/* Risk Meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <RiskMeter title="Flood Probability" risk={result.flood_risk} />
        <RiskMeter title="Landslide Probability" risk={result.landslide_risk} />
      </div>

      {/* 🗺️ GOOGLE MAP (THIS WAS MISSING BEFORE) */}
      {result.lat && result.lon && (
        <MapView
          lat={Number(result.lat)}
          lon={Number(result.lon)}
          floodRisk={result.flood_risk}
          landslideRisk={result.landslide_risk}
        />
      )}
    </div>
  );
}

/* ---------- Sub Components ---------- */

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-[#0f172a] p-5 rounded-2xl border border-slate-700/50 flex items-center gap-4 transition-transform hover:-translate-y-1">
      <div className="p-3 bg-slate-800 rounded-xl">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
          {label}
        </p>
        <p className="text-lg font-black text-white">{value}</p>
      </div>
    </div>
  );
}

function RiskMeter({ title, risk }) {
  const cfg = getRiskConfig(risk);

  return (
    <div className={`p-8 rounded-3xl border ${cfg.border} ${cfg.bg}`}>
      <div className="flex justify-between items-end mb-4">
        <div>
          <h4 className="text-slate-500 text-[10px] font-bold uppercase mb-1">
            {title}
          </h4>
          <p className={`text-3xl font-black ${cfg.color}`}>{risk}</p>
        </div>

        {risk === "High" ? (
          <AlertTriangle className={cfg.color} size={32} />
        ) : (
          <CheckCircle className={cfg.color} size={32} />
        )}
      </div>

      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${cfg.bar}`}
        />
      </div>
    </div>
  );
}
