import React from "react";
import { Home, Star, Moon, Sun } from "lucide-react";
import type { RunStatus } from "../type/type.ts";

interface HeaderProps {
  progress: number;
  totalRows: number;
  status: RunStatus;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  totalRows,
  status,
  isDarkMode,
  toggleTheme,
}) => {
  const bgClass = isDarkMode
    ? "bg-gray-900 border-gray-700"
    : "bg-white border-gray-200";
  const textMain = isDarkMode ? "text-gray-200" : "text-gray-800";
  const textSub = isDarkMode ? "text-gray-400" : "text-gray-600";
  const iconColor = isDarkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 border-b ${bgClass} text-sm transition-colors duration-300`}
    >
      <div className={`flex items-center space-x-2 ${textSub}`}>
        <Home size={16} className={iconColor} />
        <span className="text-gray-300">/</span>
        <Star size={16} className="text-yellow-400 fill-current" />
        <span className={textSub}>Workbook</span>
        <span className="text-gray-300">/</span>
        <span className={`font-semibold ${textMain}`}>Bitscale grid</span>
      </div>

      <div className="flex items-center space-x-4">
        
        <button
          onClick={toggleTheme}
          className={`p-1.5 rounded-full transition-colors ${
            isDarkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        
        <div
          className={`flex items-center space-x-2 px-3 py-1 rounded-full border transition-all ${
            status === "stopped"
              ? "bg-red-50 border-red-100"
              : isDarkMode
              ? "bg-blue-900/30 border-blue-800"
              : "bg-blue-50 border-blue-100"
          }`}
        >
          <span
            className={`text-xs font-medium ${
              status === "stopped"
                ? "text-red-700"
                : isDarkMode
                ? "text-blue-400"
                : "text-blue-700"
            }`}
          >
            {status === "stopped"
              ? "Stopped"
              : progress < 100
              ? "Processing"
              : "Done"}
          </span>
          <div
            className={`w-20 h-2 rounded-full overflow-hidden ${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <div
              className={`h-full transition-all duration-300 ease-out ${
                status === "stopped" ? "bg-red-500" : "bg-blue-600"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span
            className={`text-xs ${
              status === "stopped"
                ? "text-red-700"
                : isDarkMode
                ? "text-blue-400"
                : "text-blue-700"
            }`}
          >
            {progress}%
          </span>
        </div>

        <div
          className={`flex items-center space-x-2 border-l pl-4 ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <span className={`${textSub} font-medium`}>
            {totalRows} / 500 Credits
          </span>
          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold border border-purple-200">
            Free Plan
          </span>
        </div>
      </div>
    </div>
  );
};
