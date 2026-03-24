import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Waves, Activity, LayoutDashboard, History, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
    { path: "/history", label: "History", icon: <History size={16} /> },
    { path: "/emergency", label: "Emergency", icon: <PhoneCall size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#232220] flex flex-col text-[#F0EFEA] font-sans">
      {/* Header */}
      <header className="pt-8 px-4 flex justify-center">
        <div className="bg-[#2D2C2A]/80 backdrop-blur-xl border border-[#3E3D3B]/50 h-16 rounded-full flex items-center justify-between w-full max-w-5xl px-6 shadow-2xl">
          
          <NavLink to="/" className="flex items-center gap-2">
            <div className="bg-[#D96B58] p-1.5 rounded-lg text-[#F0EFEA]">
              <Waves size={18} />
            </div>
            <h1 className="text-lg font-serif tracking-wide text-[#F0EFEA]">
              Geo<span className="text-[#D96B58] italic">Guard</span>
            </h1>
          </NavLink>

          <nav className="relative flex items-center bg-[#1A1A19]/40 p-1 rounded-full border border-[#3E3D3B]/50">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative px-5 py-2 rounded-full text-[12px] font-medium flex gap-2 items-center transition-colors ${
                    active ? "text-[#D96B58]" : "text-[#A09E99] hover:text-[#F0EFEA]"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-[#D96B58]/10 border border-[#D96B58]/20 rounded-full -z-10"
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="text-[#D96B58] text-[10px] flex gap-2 items-center font-bold tracking-wider">
            <Activity size={12} className="animate-pulse" /> SYSTEM ACTIVE
          </div>
        </div>
      </header>

      {/* Page */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pt-12 pb-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-[#8A8885] text-[10px] tracking-[0.3em] uppercase font-bold">
        © 2026 GEOGUARD ENTERPRISE ANALYTICS
      </footer>
    </div>
  );
}
