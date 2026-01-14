import React from "react";
import { ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { EditableCell } from "./EditableCell";
import type { RowData, VisibleColumns } from "../type/type";

interface GridRowProps {
  index: number;
  data: RowData;
  isSelected: boolean;
  onToggle: (id: number) => void;
  onUpdate: (id: number, field: keyof RowData, value: string) => void;
  visibleColumns: VisibleColumns;
  isDarkMode: boolean;
}

export const GridRow: React.FC<GridRowProps> = ({
  index,
  data,
  isSelected,
  onToggle,
  onUpdate,
  visibleColumns,
  isDarkMode,
}) => {
  if (data.isLoading)
    return <SkeletonRow index={index} isDarkMode={isDarkMode} />;

  const borderClass = isDarkMode ? "border-gray-700" : "border-gray-100";
  const hoverClass = isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50";
  const selectedClass = isDarkMode ? "bg-blue-900/20" : "bg-blue-50/50";
  const textMain = isDarkMode ? "text-gray-300" : "text-gray-900";
  const textSub = isDarkMode ? "text-gray-500" : "text-gray-500";
  const iconColor = isDarkMode ? "text-gray-500" : "text-gray-400";
  const cellBg = isDarkMode
    ? "bg-gray-800 border-gray-600"
    : "bg-gray-100 border-gray-200";

  return (
    <tr
      className={`border-b ${borderClass} text-sm transition-colors ${
        isSelected ? selectedClass : hoverClass
      }`}
    >
      <td className={`w-10 text-center ${textSub} border-r ${borderClass}`}>
        {index}
      </td>
      <td className="p-2 w-10 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(data.id)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
        />
      </td>

      {visibleColumns.name && (
        <td className="p-2">
          <div className="flex items-center space-x-2">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                isDarkMode
                  ? "bg-blue-900 text-blue-300"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {data.name ? data.name.charAt(0).toUpperCase() : "?"}
            </div>
            <div className={`flex-1 min-w-0 ${textMain}`}>
              <EditableCell
                value={data.name}
                onSave={(val) => onUpdate(data.id, "name", val)}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </td>
      )}

      {visibleColumns.date && (
        <td className={`p-2 ${textSub} text-xs`}>{data.date}</td>
      )}

      {visibleColumns.company && (
        <td className="p-2">
          <div className="flex items-center space-x-2">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 ${cellBg}`}
            >
              <span className="text-[8px] font-bold">
                {data.company ? data.company.charAt(0).toUpperCase() : "-"}
              </span>
            </div>
            <div className={`flex-1 min-w-0 ${textMain}`}>
              <EditableCell
                value={data.company}
                onSave={(val) => onUpdate(data.id, "company", val)}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </td>
      )}

      {visibleColumns.website && (
        <td className={`p-2 ${textSub}`}>
          <div className="flex items-center space-x-1 group">
            {data.website && (
              <ExternalLink size={12} className={`${iconColor} shrink-0`} />
            )}
            <div className="flex-1 min-w-0">
              <EditableCell
                value={data.website}
                onSave={(val) => onUpdate(data.id, "website", val)}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </td>
      )}

      {visibleColumns.linkedin && (
        <td className={`p-2 ${textSub}`}>
          <div className="flex items-center space-x-1 group">
            {data.linkedin && (
              <span
                className={`text-[10px] font-bold px-1 rounded shrink-0 ${
                  isDarkMode
                    ? "text-blue-400 bg-blue-900/40"
                    : "text-blue-600 bg-blue-50"
                }`}
              >
                in
              </span>
            )}
            <div className="flex-1 min-w-0">
              <EditableCell
                value={data.linkedin}
                onSave={(val) => onUpdate(data.id, "linkedin", val)}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </td>
      )}

      {visibleColumns.email && (
        <td className="p-2">
          <div className="flex items-center space-x-2">
            <div
              className={`shrink-0 ${
                data.email ? "text-green-500" : "text-gray-300"
              }`}
            >
              {data.email ? (
                <CheckCircle size={14} />
              ) : (
                <AlertCircle size={14} />
              )}
            </div>
            <div className={`flex-1 min-w-0 ${textMain}`}>
              <EditableCell
                value={data.email}
                onSave={(val) => onUpdate(data.id, "email", val)}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </td>
      )}
    </tr>
  );
};

export const SkeletonRow: React.FC<{ index: number; isDarkMode: boolean }> = ({
  index,
  isDarkMode,
}) => (
  <tr
    className={`border-b text-sm animate-pulse ${
      isDarkMode
        ? "border-gray-700 bg-gray-900"
        : "border-gray-100 bg-gray-50/50"
    }`}
  >
    <td
      className={`w-10 text-center border-r ${
        isDarkMode
          ? "border-gray-700 text-gray-600"
          : "border-gray-100 text-gray-400"
      }`}
    >
      {index}
    </td>
    <td className="p-2 w-10 text-center">
      <div
        className={`w-4 h-4 rounded mx-auto ${
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      ></div>
    </td>
    <td colSpan={6} className="p-2">
      <div
        className={`h-5 rounded w-full ${
          isDarkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      ></div>
    </td>
  </tr>
);
