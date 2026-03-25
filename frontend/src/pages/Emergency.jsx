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
    <div className="w-full bg-[#2D2C2A] rounded-[2rem] shadow-xl border border-[#3E3D3B]/50 p-6 sm:p-10 text-[#F0EFEA]">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-2 sm:gap-3 mb-3">
          <AlertTriangle className="text-[#D96B58] animate-pulse" size={24} sm:size={28} />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-[#F0EFEA]">
            Emergency Response
          </h2>
        </div>
        <p className="text-[#A09E99] text-xs font-medium uppercase tracking-widest">
          Immediate help & critical contacts
        </p>
      </div>

      {/* ================= CITY SELECTOR ================= */}
      <div className="flex justify-center mb-10 sm:mb-14">
        <div className="bg-[#1A1A19] border border-[#3E3D3B]/50 rounded-2xl px-4 py-4 sm:px-8 sm:py-6
                        flex flex-col sm:flex-row items-center sm:gap-5 shadow-lg w-full sm:w-auto">

          <div className="p-3 bg-[#A3B18A]/10 rounded-xl mb-3 sm:mb-0 hidden sm:block">
            <MapPin className="text-[#A3B18A]" size={20} />
          </div>

          <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
            <span className="text-[10px] text-[#A09E99] font-medium uppercase tracking-widest text-center sm:text-left">
              Selected City
            </span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent outline-none text-[#F0EFEA] text-lg font-medium cursor-pointer text-center sm:text-left w-full mt-1 sm:mt-0"
            >
              {Object.keys(emergencyData).map((c) => (
                <option key={c} className="bg-[#2D2C2A]">
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
          icon={<ShieldAlert className="text-[#4F759B]" />}
        />

        <EmergencyCard
          label="Ambulance"
          number={data.ambulance}
          icon={<Ambulance className="text-[#A3B18A]" />}
        />

        <EmergencyCard
          label="Fire Brigade"
          number={data.fire}
          icon={<Flame className="text-[#D9AC6B]" />}
        />

        <EmergencyCard
          label="Disaster Helpline"
          number={data.disaster}
          icon={<PhoneCall className="text-[#B292A5]" />}
        />

        <EmergencyCard
          label="Flood Control Room"
          number={data.flood}
          icon={<AlertTriangle className="text-[#D96B58]" />}
          danger
        />
      </div>

      {/* ================= SAFETY NOTE ================= */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 text-center flex-wrap sm:flex-nowrap
                      bg-[#D96B58]/10 border border-[#D96B58]/30
                      rounded-xl px-4 sm:px-6 py-4 text-[#D96B58] text-xs font-medium">
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
      className={`relative group rounded-2xl p-6
                  bg-[#1A1A19] border transition-all
                  hover:-translate-y-1 hover:shadow-lg
        ${danger
          ? "border-[#D96B58]/40 hover:bg-[#D96B58]/10"
          : "border-[#3E3D3B]/50 hover:border-[#A3B18A]/40 hover:bg-[#2D2C2A]"}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-[10px] text-[#A09E99] font-medium uppercase tracking-wider">
            {label}
          </p>
          <p className={`text-2xl font-medium mt-1 ${danger ? "text-[#D96B58]" : "text-[#F0EFEA]"}`}>
            {number}
          </p>
        </div>

        <div className={`p-3 rounded-xl
          ${danger ? "bg-[#D96B58]/10" : "bg-[#A3B18A]/10"}`}>
          {icon}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-[2px]
                      bg-gradient-to-r from-transparent via-[#A3B18A]/30 to-transparent
                      opacity-0 group-hover:opacity-100 transition" />
    </a>
  );
}
