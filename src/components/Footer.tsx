import React, { useState } from 'react';
import { LayoutGrid, Plus, StopCircle, RotateCcw } from 'lucide-react';
import type { Sheet } from '../type/type';

interface FooterProps {
  sheets: Sheet[];
  activeSheetId: number;
  onSwitchSheet: (id: number) => void;
  onAddSheet: () => void;
  onAddRow: () => void;
  onKillRun: () => void;
  isEnriching: boolean;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  sheets, activeSheetId, onSwitchSheet, onAddSheet,
  onAddRow, onKillRun, isEnriching, isDarkMode
}) => {
  const [autoRun, setAutoRun] = useState(false);

  const bgClass = isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200";
  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-200";
  const activeTab = isDarkMode ? "bg-blue-900/20 text-blue-400 border-t-blue-500" : "bg-blue-50 text-blue-700 border-t-blue-600";
  const inactiveTab = isDarkMode ? "text-gray-400 hover:bg-gray-800 hover:text-gray-200" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
  const iconActive = isDarkMode ? "text-blue-400" : "text-blue-500";
  const iconInactive = isDarkMode ? "text-gray-500" : "text-gray-400";
  const btnText = isDarkMode ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100";

  return (
    <div className={`${bgClass} border-t flex items-center justify-between px-0 h-10 text-sm select-none transition-colors duration-300`}>
      {/* Tabs */}
      <div className="flex items-center h-full overflow-x-auto no-scrollbar max-w-[60%]">
        {sheets.map((sheet) => (
          <button
            key={sheet.id}
            onClick={() => onSwitchSheet(sheet.id)}
            className={`
                px-4 h-full border-r ${borderClass} whitespace-nowrap transition-all flex items-center space-x-2 border-t-2 border-t-transparent
                ${activeSheetId === sheet.id ? activeTab : inactiveTab}
            `}
          >
            <LayoutGrid size={14} className={activeSheetId === sheet.id ? iconActive : iconInactive} />
            <span>{sheet.name}</span>
          </button>
        ))}

        <button
          onClick={onAddSheet}
          className={`px-3 h-full transition-colors border-r ${borderClass} ${btnText}`}
          title="Add New Sheet"
        >
          <Plus size={18} />
        </button>
      </div>

     
      <div className={`flex items-center space-x-2 pr-2 border-l pl-2 ${borderClass}`}>
        <button
          onClick={onAddRow}
          className={`flex items-center space-x-1 px-3 py-1 rounded font-medium ${isDarkMode ? "text-blue-400 hover:bg-gray-800" : "text-blue-600 hover:bg-gray-100"}`}
        >
          <Plus size={14} />
          <span>Row</span>
        </button>

        <div className={`h-4 w-px mx-1 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>

        <button
          onClick={onKillRun}
          disabled={!isEnriching}
          className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${isEnriching
              ? 'text-red-600 hover:bg-red-50 cursor-pointer'
              : isDarkMode ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-not-allowed'
            }`}
        >
          <StopCircle size={14} />
          <span className="hidden sm:inline">Stop</span>
        </button>

        <button
          onClick={() => setAutoRun(!autoRun)}
          className={`flex items-center space-x-1 px-2 py-1 rounded transition-all ${autoRun
              ? 'bg-green-100 text-green-700 font-medium'
              : isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
            }`}
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
};