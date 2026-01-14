import React, { useState, useEffect } from 'react';
import { Search, LayoutGrid, Eye, EyeOff, ArrowUpDown, Check, Filter, Trash2, Loader2, Zap } from 'lucide-react';
import type { SortConfig, FilterStatus, VisibleColumns } from '../type/type';

interface ToolbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCount: number;
  onDelete: () => void;
  onEnrich: () => void;
  isEnriching: boolean;
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (status: FilterStatus) => void;
  visibleColumns: VisibleColumns;
  setVisibleColumns: React.Dispatch<React.SetStateAction<VisibleColumns>>;
  isDarkMode: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  searchTerm, setSearchTerm, selectedCount, onDelete,
  onEnrich, isEnriching, sortConfig, setSortConfig,
  filterStatus, setFilterStatus, visibleColumns, setVisibleColumns,
  isDarkMode
}) => {
  const [activeMenu, setActiveMenu] = useState<'view' | 'sort' | 'filter' | null>(null);
  const toggleMenu = (menu: 'view' | 'sort' | 'filter') => setActiveMenu(activeMenu === menu ? null : menu);

 
  const bgClass = isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200";
  const inputBg = isDarkMode ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500" : "bg-white border-gray-300 text-gray-700 focus:ring-blue-100";
  const btnClass = isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50";
  const activeBtn = isDarkMode ? "bg-gray-800 border-gray-500" : "bg-gray-100 border-gray-400";
  const dropdownBg = isDarkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700";
  const dropdownHover = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50";

  useEffect(() => {
    const handleClick = () => setActiveMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={`px-4 py-3 border-b flex justify-between items-center sticky top-0 z-20 transition-colors duration-300 ${bgClass}`}>
      <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
   
        <div className="relative group">
          <Search size={14} className={`absolute left-3 top-2.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} group-focus-within:text-blue-500`} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-9 pr-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:border-blue-500 w-64 transition-all ${inputBg}`}
          />
        </div>

    
        <div className="relative">
          <button
            onClick={() => toggleMenu('view')}
            className={`flex items-center space-x-1 px-3 py-1.5 border rounded text-sm transition-colors ${activeMenu === 'view' ? activeBtn : btnClass}`}
          >
            <LayoutGrid size={14} />
            <span>View</span>
          </button>
          {activeMenu === 'view' && (
            <div className={`absolute top-full left-0 mt-1 w-48 border rounded shadow-lg z-30 p-2 ${dropdownBg}`}>
              <div className="text-xs font-semibold text-gray-500 mb-2 px-2">TOGGLE COLUMNS</div>
              {(Object.keys(visibleColumns) as Array<keyof VisibleColumns>).map(col => (
                <div
                  key={col}
                  onClick={() => setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }))}
                  className={`flex items-center px-2 py-1.5 cursor-pointer rounded text-sm ${dropdownHover}`}
                >
                  {visibleColumns[col] ? <Eye size={14} className="mr-2 text-blue-500" /> : <EyeOff size={14} className="mr-2 text-gray-500" />}
                  <span className="capitalize">{col}</span>
                </div>
              ))}
            </div>
          )}
        </div>


        <div className="relative">
          <button
            onClick={() => toggleMenu('sort')}
            className={`flex items-center space-x-1 px-3 py-1.5 border rounded text-sm transition-colors ${activeMenu === 'sort' ? activeBtn : btnClass}`}
          >
            <ArrowUpDown size={14} />
            <span>Sort</span>
          </button>
          {activeMenu === 'sort' && (
            <div className={`absolute top-full left-0 mt-1 w-40 border rounded shadow-lg z-30 p-1 ${dropdownBg}`}>
              <div className="text-xs font-semibold text-gray-500 mb-1 px-2 py-1">SORT BY</div>
              <div onClick={() => setSortConfig({ key: 'name', direction: 'asc' })} className={`px-3 py-1.5 text-sm cursor-pointer flex justify-between ${dropdownHover}`}>
                Name (A-Z) {sortConfig.key === 'name' && sortConfig.direction === 'asc' && <Check size={14} />}
              </div>
              <div onClick={() => setSortConfig({ key: 'name', direction: 'desc' })} className={`px-3 py-1.5 text-sm cursor-pointer flex justify-between ${dropdownHover}`}>
                Name (Z-A) {sortConfig.key === 'name' && sortConfig.direction === 'desc' && <Check size={14} />}
              </div>
              <div onClick={() => setSortConfig({ key: 'company', direction: 'asc' })} className={`px-3 py-1.5 text-sm cursor-pointer flex justify-between ${dropdownHover}`}>
                Company (A-Z) {sortConfig.key === 'company' && sortConfig.direction === 'asc' && <Check size={14} />}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => toggleMenu('filter')}
            className={`flex items-center space-x-1 px-3 py-1.5 border rounded text-sm transition-colors ${activeMenu === 'filter' ? activeBtn : btnClass}`}
          >
            <Filter size={14} />
            <span>Filter</span>
            {filterStatus !== 'all' && <div className="bg-blue-600 w-2 h-2 rounded-full absolute top-1 right-1"></div>}
          </button>
          {activeMenu === 'filter' && (
            <div className={`absolute top-full left-0 mt-1 w-40 border rounded shadow-lg z-30 p-1 ${dropdownBg}`}>
              <div className="text-xs font-semibold text-gray-500 mb-1 px-2 py-1">FILTER BY STATUS</div>
              <div onClick={() => setFilterStatus('all')} className={`px-3 py-1.5 text-sm cursor-pointer flex justify-between ${dropdownHover}`}>
                Show All {filterStatus === 'all' && <Check size={14} />}
              </div>
              <div onClick={() => setFilterStatus('found')} className={`px-3 py-1.5 text-sm cursor-pointer flex justify-between ${dropdownHover}`}>
                Found Only {filterStatus === 'found' && <Check size={14} />}
              </div>
              <div onClick={() => setFilterStatus('missing')} className={`px-3 py-1.5 text-sm cursor-pointer flex justify-between ${dropdownHover}`}>
                Missing Only {filterStatus === 'missing' && <Check size={14} />}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {selectedCount > 0 && (
          <button
            onClick={onDelete}
            className="flex items-center space-x-1 px-3 py-1.5 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100 animate-in fade-in"
          >
            <Trash2 size={14} />
            <span>Delete ({selectedCount})</span>
          </button>
        )}

        <button
          onClick={onEnrich}
          disabled={isEnriching}
          className={`flex items-center space-x-2 px-4 py-1.5 rounded text-sm transition-all ${isEnriching ? 'bg-gray-800 cursor-not-allowed opacity-80' : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg shadow-purple-500/20'
            }`}
        >
          {isEnriching ? <Loader2 size={14} className="animate-spin text-purple-400" /> : <Zap size={14} className="text-purple-400" />}
          <span>{isEnriching ? "Enriching..." : "Enrich Data"}</span>
        </button>
      </div>
    </div>
  );
};