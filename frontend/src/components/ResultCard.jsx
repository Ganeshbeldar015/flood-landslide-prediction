import {
  AlertTriangle,
  CheckCircle,
  CloudRain,
  Droplets,
  MapPin
} from "lucide-react";

function getRiskStyle(risk) {
  if (risk === "High") return "bg-red-50 border-red-500 text-red-700";
  if (risk === "Medium") return "bg-yellow-50 border-yellow-500 text-yellow-700";
  return "bg-green-50 border-green-500 text-green-700";
}

export default function Result({ result }) {
  return (
    <div className="mt-12 p-8 bg-gray-50 rounded-3xl shadow-inner">
      <h3 className="text-xl font-bold text-center mb-8">
        Prediction Result
      </h3>

      {/* Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Info icon={<MapPin />} label="City" value={result.city} />
        <Info icon={<CloudRain />} label="Rainfall" value={`${result.rainfall_mm} mm`} />
        <Info icon={<Droplets />} label="Humidity" value={`${result.humidity_percent} %`} />
      </div>

      {/* Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RiskCard title="Flood Risk" risk={result.flood_risk} />
        <RiskCard title="Landslide Risk" risk={result.landslide_risk} />
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow flex gap-3 items-center">
      {icon}
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function RiskCard({ title, risk }) {
  return (
    <div className={`p-6 border-l-4 rounded-2xl flex items-center gap-3 font-semibold ${getRiskStyle(risk)}`}>
      {risk === "High" ? <AlertTriangle /> : <CheckCircle />}
      {title}: {risk}
    </div>
  );
}
