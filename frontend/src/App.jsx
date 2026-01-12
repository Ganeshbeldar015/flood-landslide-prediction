import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Placeholder components for the other routes
const HistoryPage = () => <div className="p-12 bg-[#1e293b] rounded-[2.5rem] border border-slate-700/50 text-white font-bold">Historical Risk Logs</div>;
const EmergencyPage = () => <div className="p-12 bg-[#1e293b] rounded-[2.5rem] border border-slate-700/50 text-white font-bold">Local Emergency Response Contacts</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;