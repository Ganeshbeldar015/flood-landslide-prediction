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
    <div className="min-h-screen bg-[#0f172a] flex flex-col font-sans text-slate-200">
      <header className="w-full z-50 pt-8 px-4 flex justify-center">
        <div className="bg-[#1e293b]/80 backdrop-blur-xl border border-slate-700/50 h-16 rounded-full flex items-center justify-between w-full max-w-5xl px-6 shadow-2xl">
          
          <NavLink to="/" className="flex items-center gap-2 min-w-[120px]">
            <div className="bg-indigo-500 p-1.5 rounded-lg text-white shadow-lg shadow-indigo-500/20">
              <Waves size={18} />
            </div>
            <h1 className="text-sm font-black text-white tracking-tight uppercase">
              Geo<span className="text-indigo-400">Guard</span>
            </h1>
          </NavLink>

          <nav className="relative flex items-center bg-slate-900/40 p-1 rounded-full border border-slate-800/50">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold transition-all duration-300 z-10 ${
                    isActive ? "text-indigo-300" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.icon} 
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-indigo-500/20 border border-indigo-500/30 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex justify-end min-w-[120px]">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-[10px] font-bold text-indigo-400 tracking-tighter">
               <Activity size={12} className="animate-pulse" /> SYSTEM ACTIVE
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pt-12 mb-20 relative z-20">
        <Outlet />
      </main>

      <footer className="py-10 text-center text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em] border-t border-slate-800/40 mx-10">
        © 2026 GEOGUARD Enterprise Analytics
      </footer>
    </div>
  );
}