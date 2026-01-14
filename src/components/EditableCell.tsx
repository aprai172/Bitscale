import React, { useState, useEffect, useRef } from 'react';

interface EditableCellProps {
  value: string;
  onSave: (value: string) => void;
  isDarkMode: boolean;
}

export const EditableCell: React.FC<EditableCellProps> = ({ value, onSave, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(tempValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleBlur();
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full p-1 text-sm border rounded outline-none shadow-sm ${
          isDarkMode
            ? "bg-gray-700 border-blue-500 text-white"
            : "bg-white border-blue-500 text-black"
        }`}
      />
    );
  }

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      className={`cursor-text truncate p-1 rounded border border-transparent transition-colors ${
        !value
          ? 'text-gray-400 italic'
          : isDarkMode ? 'text-gray-200' : 'text-gray-700'
      } ${isDarkMode ? 'hover:bg-gray-700 hover:border-gray-600' : 'hover:bg-gray-100 hover:border-gray-200'}`}
    >
      {value || "Double click to edit"}
    </div>
  );
};