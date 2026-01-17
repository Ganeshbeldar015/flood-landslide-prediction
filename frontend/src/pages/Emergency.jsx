import { useState } from "react";
import {
  PhoneCall,
  Ambulance,
  Flame,
  ShieldAlert,
  AlertTriangle,
  MapPin
} from "lucide-react";
import { emergencyData } from "../data/emergencyNumbers";

export default function Emergency() {
  const [city, setCity] = useState("Mumbai");
  const data = emergencyData[city];

  return (
    <div className="w-full bg-[#1e293b] rounded-[2.5rem] shadow-2xl border border-slate-700/40 p-10 text-white">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-3">
          <AlertTriangle className="text-red-400 animate-pulse" size={28} />
          <h2 className="text-3xl md:text-4xl font-black italic tracking-tight">
            Emergency Response
          </h2>
        </div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em]">
          Immediate help & critical contacts
        </p>
      </div>

      {/* ================= CITY SELECTOR ================= */}
      <div className="flex justify-center mb-14">
        <div className="bg-slate-900 border border-slate-700 rounded-3xl px-8 py-6
                        flex items-center gap-5 shadow-xl">

          <div className="p-3 bg-emerald-500/10 rounded-2xl">
            <MapPin className="text-emerald-400" size={20} />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Selected City
            </span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent outline-none text-white text-lg font-black cursor-pointer"
            >
              {Object.keys(emergencyData).map((c) => (
                <option key={c} className="bg-slate-900">
                  {c}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* ================= EMERGENCY ACTION GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

        <EmergencyCard
          label="Police"
          number={data.police}
          icon={<ShieldAlert className="text-blue-400" />}
        />

        <EmergencyCard
          label="Ambulance"
          number={data.ambulance}
          icon={<Ambulance className="text-emerald-400" />}
        />

        <EmergencyCard
          label="Fire Brigade"
          number={data.fire}
          icon={<Flame className="text-orange-400" />}
        />

        <EmergencyCard
          label="Disaster Helpline"
          number={data.disaster}
          icon={<PhoneCall className="text-purple-400" />}
        />

        <EmergencyCard
          label="Flood Control Room"
          number={data.flood}
          icon={<AlertTriangle className="text-red-400" />}
          danger
        />
      </div>

      {/* ================= SAFETY NOTE ================= */}
      <div className="flex items-center justify-center gap-3
                      bg-red-500/10 border border-red-500/30
                      rounded-2xl px-6 py-4 text-red-400 text-xs font-bold">
        <AlertTriangle size={14} />
        Call emergency services immediately if risk is high
      </div>
    </div>
  );
}

/* ================= REUSABLE CARD ================= */

function EmergencyCard({ label, number, icon, danger }) {
  return (
    <a
      href={`tel:${number}`}
      className={`relative group rounded-3xl p-6
                  bg-slate-900 border transition-all
                  hover:scale-[1.03] hover:shadow-xl
        ${danger
          ? "border-red-500/40 hover:bg-red-500/10"
          : "border-slate-700 hover:border-emerald-500/40 hover:bg-slate-800"}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            {label}
          </p>
          <p className={`text-2xl font-black mt-1 ${danger ? "text-red-400" : ""}`}>
            {number}
          </p>
        </div>

        <div className={`p-3 rounded-2xl
          ${danger ? "bg-red-500/20" : "bg-emerald-500/10"}`}>
          {icon}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[3px]
                      bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent
                      opacity-0 group-hover:opacity-100 transition" />
    </a>
  );
}
