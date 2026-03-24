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
    <div className="w-full bg-[#2D2C2A] rounded-[2rem] shadow-xl
                    border border-[#3E3D3B]/50 p-10 text-[#F0EFEA]">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-3">
          <HistoryIcon className="text-[#A3B18A]" size={26} />
          <h2 className="text-4xl font-serif tracking-tight text-[#F0EFEA]">
            Prediction History
          </h2>
        </div>
        <p className="text-[#A09E99] text-xs font-medium uppercase tracking-widest">
          Previously generated risk assessments
        </p>
      </div>

      {/* Clear Button */}
      {records.length > 0 && (
        <div className="flex justify-end mb-6">
          <button
            onClick={clearAll}
            className="flex items-center gap-2 text-xs font-medium
                       bg-[#D96B58]/10 border border-[#D96B58]/30
                       text-[#D96B58] px-4 py-2 rounded-lg hover:bg-[#D96B58]/20 transition-colors"
          >
            <Trash2 size={14} />
            Clear History
          </button>
        </div>
      )}

      {/* Content */}
      {records.length === 0 ? (
        <div className="text-center text-[#A09E99] text-sm py-20 font-medium tracking-wide">
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
