import { useEffect, useState } from "react";
import { Trash2, History as HistoryIcon } from "lucide-react";
import { getHistory, clearHistory } from "../utils/historyStorage";
import HistoryCard from "../components/HistoryCard";

export default function History() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(getHistory());
  }, []);

  const clearAll = () => {
    clearHistory();
    setRecords([]);
  };

  return (
    <div className="w-full bg-[#1e293b] rounded-[2.5rem] shadow-2xl
                    border border-slate-700/40 p-10 text-white">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-3">
          <HistoryIcon className="text-emerald-400" size={26} />
          <h2 className="text-3xl font-black italic tracking-tight">
            Prediction History
          </h2>
        </div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em]">
          Previously generated risk assessments
        </p>
      </div>

      {/* Clear Button */}
      {records.length > 0 && (
        <div className="flex justify-end mb-6">
          <button
            onClick={clearAll}
            className="flex items-center gap-2 text-xs font-bold
                       bg-red-500/10 border border-red-500/30
                       text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/20"
          >
            <Trash2 size={14} />
            Clear History
          </button>
        </div>
      )}

      {/* Content */}
      {records.length === 0 ? (
        <div className="text-center text-slate-500 text-sm py-20">
          No prediction history available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((item, index) => (
            <HistoryCard key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
