import { Outlet } from "react-router-dom";
import { Waves, Activity } from "lucide-react";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-100 to-indigo-200">

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-3">
            <Waves size={36} />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Flood & Landslide Prediction
            </h1>
          </div>
          <p className="mt-3 text-blue-100 flex justify-center items-center gap-2 text-sm md:text-base">
            <Activity size={18} />
            Live Weather + Machine Learning Risk Analysis
          </p>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex justify-center px-4 py-14">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-blue-200 text-center py-4">
        <p className="text-xs tracking-wide">
          © 2026 | AI-Based Disaster Prediction System
        </p>
      </footer>
    </div>
  );
}
