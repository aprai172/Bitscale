import  { useState, useRef, useMemo } from "react";
import { LayoutGrid, AlertCircle } from "lucide-react";
import { Header } from "../components/Header";
import { Toolbar } from "../components/Toolbar";
import { GridRow } from "../components/GridRow";
import { Footer } from "../components/Footer";
import { PaymentModal } from "../components/PaymentModal";
import type {
  RowData,
  Sheet,
  SortConfig,
  FilterStatus,
  VisibleColumns,
  RunStatus,
} from "../type/type";

const generateInitialData = (): RowData[] => [
  {
    id: 1,
    name: "Mike Braham",
    date: "Oct 12, 2024",
    company: "Google",
    website: "google.com",
    linkedin: "linkedin.com/in/mike",
    email: "mike@google.com",
    status: "found",
  },
  {
    id: 2,
    name: "Alex Johnson",
    date: "Oct 12, 2024",
    company: "Amazon",
    website: "amazon.com",
    linkedin: "linkedin.com/in/alex",
    email: "alex@amazon.com",
    status: "found",
  },
  {
    id: 3,
    name: "Sarah Thompson",
    date: "Oct 13, 2024",
    company: "LinkedIn",
    website: "linkedin.com",
    linkedin: "linkedin.com/in/sarah",
    email: "",
    status: "missing",
  },
];

export default function BitscaleAdvanced() {
  const [sheets, setSheets] = useState<Sheet[]>([
    { id: 1, name: "Bitscale grid only" },
  ]);
  const [activeSheetId, setActiveSheetId] = useState(1);
  const [allData, setAllData] = useState<{ [key: number]: RowData[] }>({
    1: generateInitialData(),
  });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEnriching, setIsEnriching] = useState(false);
  const [runStatus, setRunStatus] = useState<RunStatus>("idle");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
    name: true,
    date: true,
    company: true,
    website: true,
    linkedin: true,
    email: true,
  });

  const currentData = allData[activeSheetId] || [];

  const handleAddSheet = () => {
    const newId = Math.max(...sheets.map((s) => s.id), 0) + 1;
    setSheets((prev) => [...prev, { id: newId, name: `Sheet ${newId}` }]);
    setAllData((prev) => ({ ...prev, [newId]: [] }));
    setActiveSheetId(newId);
  };

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    setAllData((prev) => ({
      ...prev,
      [activeSheetId]: prev[activeSheetId].filter(
        (row) => !selectedRows.includes(row.id)
      ),
    }));
    setSelectedRows([]);
  };

  const updateCell = (id: number, field: keyof RowData, value: string) => {
    setAllData((prev) => ({
      ...prev,
      [activeSheetId]: prev[activeSheetId].map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      ),
    }));
  };

  const handleAddRow = () => {
    const allRowsFlat = Object.values(allData).flat();
    const newId =
      allRowsFlat.length > 0
        ? Math.max(...allRowsFlat.map((d) => d.id)) + 1
        : 1;

    const newRow: RowData = {
      id: newId,
      name: "",
      date: new Date().toLocaleDateString(),
      company: "",
      website: "",
      linkedin: "",
      email: "",
      status: "pending",
      isLoading: true,
    };

    setAllData((prev) => ({
      ...prev,
      [activeSheetId]: [...(prev[activeSheetId] || []), newRow],
    }));

    setTimeout(() => {
      setAllData((prev) => ({
        ...prev,
        [activeSheetId]: prev[activeSheetId].map((row) =>
          row.id === newId ? { ...row, isLoading: false } : row
        ),
      }));
    }, 500);
  };

  const handleKillRun = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    setIsEnriching(false);
    setRunStatus("stopped");
  };

  const runEnrichment = () => {
    if (isEnriching) return;
    setIsEnriching(true);
    setRunStatus("running");
    let currentProgress = progress;

    progressInterval.current = setInterval(() => {
      currentProgress += 5;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress > 40 && currentData.length < 10) {
        const enrichedRow: RowData = {
          id: 999 + Math.floor(Math.random() * 1000),
          name: "Enriched User",
          date: "Just now",
          company: "Apple",
          website: "apple.com",
          linkedin: "linkedin/apple",
          email: "contact@apple.com",
          status: "found",
          isLoading: false,
        };
        setAllData((prev) => ({
          ...prev,
          [activeSheetId]: [...prev[activeSheetId], enrichedRow],
        }));
      }
      if (currentProgress >= 100) {
        if (progressInterval.current) clearInterval(progressInterval.current);
        setIsEnriching(false);
        setRunStatus("completed");
      }
    }, 200);
  };

  const processedData = useMemo(() => {
    let result = [...currentData];

    if (searchTerm) {
      result = result.filter(
        (row) =>
          (row.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          (row.company || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== "all") {
      result = result.filter((row) => {
        if (filterStatus === "found")
          return row.email !== "" && row.email != null;
        if (filterStatus === "missing")
          return row.email === "" || row.email == null;
        return true;
      });
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const valA = (a[sortConfig.key!] || "").toString().toLowerCase();
        const valB = (b[sortConfig.key!] || "").toString().toLowerCase();
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [currentData, searchTerm, sortConfig, filterStatus]);

  return (
    <div
      className={`flex flex-col h-screen font-sans overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <Header
        progress={progress}
        totalRows={currentData.length}
        status={runStatus}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* RED BANNER */}
      <div className="bg-red-600 text-white px-4 py-2 flex items-center justify-center text-sm font-medium relative z-10">
        <span className="mr-4">
          Payment failed. 450,000 credits will permanently expire in 30 days
        </span>
        <AlertCircle size={16} className="mr-4" />
        <button
          onClick={() => setIsPaymentModalOpen(true)}
          className="bg-white text-red-600 px-3 py-1 rounded shadow-sm text-xs font-bold hover:bg-gray-50 transition-colors"
        >
          Pay Now
        </button>
      </div>

      <Toolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCount={selectedRows.length}
        onDelete={deleteSelected}
        onEnrich={runEnrichment}
        isEnriching={isEnriching}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        isDarkMode={isDarkMode}
      />

      <div className="flex-1 overflow-auto relative">
        {processedData.length === 0 &&
        searchTerm === "" &&
        currentData.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center h-full ${
              isDarkMode ? "text-gray-600" : "text-gray-400"
            }`}
          >
            <LayoutGrid size={48} className="mb-4 opacity-20" />
            <p>This sheet is empty</p>
            <button
              onClick={handleAddRow}
              className="mt-2 text-blue-500 hover:underline"
            >
              Add a row
            </button>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead
              className={`sticky top-0 z-10 text-xs font-semibold border-b ${
                isDarkMode
                  ? "bg-gray-800 text-gray-400 border-gray-700"
                  : "bg-gray-50 text-gray-600 border-gray-200"
              }`}
            >
              <tr>
                <th
                  className={`p-2 w-10 text-center border-r ${
                    isDarkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  #
                </th>
                <th className="p-2 w-10 text-center">
                  <div
                    className={`w-3 h-3 border rounded mx-auto ${
                      isDarkMode ? "border-gray-500" : "border-gray-400"
                    }`}
                  ></div>
                </th>
                {visibleColumns.name && (
                  <th
                    className={`p-3 min-w-[200px] border-r ${
                      isDarkMode ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    Name
                  </th>
                )}
                {visibleColumns.date && (
                  <th
                    className={`p-3 min-w-[150px] border-r ${
                      isDarkMode ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    Date
                  </th>
                )}
                {visibleColumns.company && (
                  <th
                    className={`p-3 min-w-[160px] border-r ${
                      isDarkMode ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    Company
                  </th>
                )}
                {visibleColumns.website && (
                  <th
                    className={`p-3 min-w-[200px] border-r ${
                      isDarkMode ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    Website
                  </th>
                )}
                {visibleColumns.linkedin && (
                  <th
                    className={`p-3 min-w-[200px] border-r ${
                      isDarkMode ? "border-gray-700" : "border-gray-100"
                    }`}
                  >
                    LinkedIn
                  </th>
                )}
                {visibleColumns.email && (
                  <th className="p-3 min-w-[200px]">Email</th>
                )}
              </tr>
            </thead>
            <tbody>
              {processedData.map((row, index) => (
                <GridRow
                  key={row.id}
                  index={index + 1}
                  data={row}
                  isSelected={selectedRows.includes(row.id)}
                  onToggle={toggleRow}
                  onUpdate={updateCell}
                  visibleColumns={visibleColumns}
                  isDarkMode={isDarkMode}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer
        sheets={sheets}
        activeSheetId={activeSheetId}
        onSwitchSheet={setActiveSheetId}
        onAddSheet={handleAddSheet}
        onAddRow={handleAddRow}
        onKillRun={handleKillRun}
        isEnriching={isEnriching}
        isDarkMode={isDarkMode}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
