import { useEffect, useState } from 'react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';
import { 
  Search, 
  RotateCcw, 
  Calendar, 
  Download, 
  ArrowLeft, 
  ChevronDown, 
  FileSpreadsheet,
  PackageCheck
} from 'lucide-react';

export interface PackageSummaryRecord {
  id: string;
  packageType: string;
  packingTag: string;
  creationDate: string;
  operator: string;
  dept: string;
  area: string;
  areaCode: string;
  successfulQty: number;
}

export interface PackageDetailItem {
  id: string;
  packingTag: string;
  packageCode: string;
  itemCode: string;
  serviceNo: string;
  serviceNoItemCode: string;
  ruim: string;
  ruimItemCode: string;
}

// Mock Summary Dataset
const MOCK_SUMMARY_PACKAGES: PackageSummaryRecord[] = [
  {
    id: '1',
    packageType: 'StartPack',
    packingTag: 'Pac_Z_Pro_50_150726',
    creationDate: '2026-07-19 14:22:50',
    operator: 'zahid6635',
    dept: '3.1 CACTeletalk',
    area: 'STANDARD',
    areaCode: 'ZTE HLR',
    successfulQty: 46
  },
  {
    id: '2',
    packageType: 'StartPack',
    packingTag: 'Pac_Teletalk_GenZ_2026',
    creationDate: '2026-07-18 10:15:30',
    operator: 'zahid6635',
    dept: '3.1 CACTeletalk',
    area: 'STANDARD',
    areaCode: 'HUAWEI HLR',
    successfulQty: 120
  },
  {
    id: '3',
    packageType: 'OptionPack',
    packingTag: 'Pac_Corporate_Post_009',
    creationDate: '2026-07-15 16:40:00',
    operator: 'farhad_admin',
    dept: '3.1 CACTeletalk',
    area: 'PREMIUM',
    areaCode: 'ZTE HLR',
    successfulQty: 85
  }
];

// Helper to generate realistic package detail records (46 records like in image_1.png)
const generateDetailItems = (packingTag: string): PackageDetailItem[] => {
  const baseNumbers = [
    '1566600377', '1566600211', '1566600299', '1566600022', '1566600333',
    '1566600066', '1566600144', '1566600255', '1566600411', '1566600188'
  ];

  return Array.from({ length: 46 }, (_, index) => {
    const numSeq = baseNumbers[index % baseNumbers.length];
    const ruimSeq = `89880040925042240${(300 + index * 7).toString().padStart(3, '0')}`;
    return {
      id: `det-${index + 1}`,
      packingTag: packingTag || 'Pac_Z_Pro_50_150726',
      packageCode: numSeq,
      itemCode: 'DataPack',
      serviceNo: numSeq,
      serviceNoItemCode: 'MSISDN',
      ruim: ruimSeq,
      ruimItemCode: 'Sim card 64K'
    };
  });
};

export default function CRMQueryPackage() {
  const addTab = useTabStore((state) => state.addTab);
  const addToast = useToastStore((state) => state.addToast);

  // Search Condition State
  const [packageType, setPackageType] = useState('StartPack');
  const [packingTag, setPackingTag] = useState('');
  const [area, setArea] = useState('STANDARD');
  const [areaCode, setAreaCode] = useState('ZTE HLR');
  const [dept, setDept] = useState('3.1 CACTeletalk');
  const [creationDateFrom, setCreationDateFrom] = useState('2026-07-19 02:22:38');
  const [creationDateTo, setCreationDateTo] = useState('2026-07-19 14:22:50');

  // Navigation & Results State
  const [viewMode, setViewMode] = useState<'summary' | 'detail'>('summary');
  const [selectedTag, setSelectedTag] = useState<string>('Pac_Z_Pro_50_150726');
  const [summaryResults, setSummaryResults] = useState<PackageSummaryRecord[]>(MOCK_SUMMARY_PACKAGES);
  const [detailItems, setDetailItems] = useState<PackageDetailItem[]>([]);

  // Pagination State for Details Table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    addTab({
      id: 'query-package',
      name: 'Query Package',
      path: '/crm/query-package',
      isClosable: true
    });
  }, [addTab]);

  const handleQuery = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const filtered = MOCK_SUMMARY_PACKAGES.filter((item) => {
      const matchType = packageType === 'All' || item.packageType === packageType;
      const matchTag = !packingTag.trim() || item.packingTag.toLowerCase().includes(packingTag.trim().toLowerCase());
      return matchType && matchTag;
    });

    setSummaryResults(filtered);
    setViewMode('summary');
    if (filtered.length > 0) {
      addToast(`Found ${filtered.length} matching package summary records`, 'success');
    } else {
      addToast('No package summary records found for search criteria', 'warning');
    }
  };

  const handleReset = () => {
    setPackageType('StartPack');
    setPackingTag('');
    setArea('STANDARD');
    setAreaCode('ZTE HLR');
    setDept('3.1 CACTeletalk');
    setCreationDateFrom('2026-07-19 02:22:38');
    setCreationDateTo('2026-07-19 14:22:50');
    setSummaryResults(MOCK_SUMMARY_PACKAGES);
    setViewMode('summary');
    addToast('Search conditions reset', 'info');
  };

  const handleOpenDetail = (tag: string) => {
    setSelectedTag(tag);
    setDetailItems(generateDetailItems(tag));
    setCurrentPage(1);
    setViewMode('detail');
    addToast(`Loaded package details for: ${tag}`, 'info');
  };

  const handleDownloadFile = () => {
    // Generate CSV content from detail items
    const headers = ['Packing Tag', 'Package Code', 'Item Code', 'Service No.', 'Service No. Item Code', 'RUIM', 'RUIM Item Code'];
    const rows = detailItems.map(d => [d.packingTag, d.packageCode, d.itemCode, d.serviceNo, d.serviceNoItemCode, d.ruim, d.ruimItemCode].join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedTag}_details.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast(`File download started for ${selectedTag}`, 'success');
  };

  // Pagination slice for detail view
  const totalPages = Math.ceil(detailItems.length / itemsPerPage) || 1;
  const currentDetailSlice = detailItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4 animate-fade-in text-gray-800 font-sans select-none pb-8">
      {/* Breadcrumb Path */}
      <div className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
        <span>Home</span> &gt; <span>Inventory</span> &gt; <span>Package</span> &gt; 
        <span className="font-bold text-gray-800">Query Package</span>
      </div>

      {viewMode === 'summary' ? (
        <>
          {/* SEARCH CONDITION PANEL (Matches image_0.png) */}
          <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
            {/* Header Title Bar */}
            <div className="bg-[#e9ecef] border-b border-[#cfd2d7] px-4 py-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-red-600 rounded-full inline-block"></span>
              <span className="text-xs font-bold text-gray-800">Search Condition</span>
            </div>

            {/* Form Body - 3 Column Layout */}
            <form onSubmit={handleQuery} className="p-4 bg-white space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 items-center">
                
                {/* COLUMN 1 */}
                <div className="space-y-3">
                  {/* Package Type */}
                  <div className="flex items-center gap-2">
                    <label className="w-28 text-xs font-medium text-gray-700 text-right pr-1">
                      Package Type
                    </label>
                    <select
                      value={packageType}
                      onChange={(e) => setPackageType(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
                    >
                      <option value="StartPack">StartPack</option>
                      <option value="OptionPack">OptionPack</option>
                      <option value="All">All</option>
                    </select>
                  </div>

                  {/* Area Code */}
                  <div className="flex items-center gap-2">
                    <label className="w-28 text-xs font-medium text-gray-700 text-right pr-1">
                      Area Code
                    </label>
                    <select
                      value={areaCode}
                      onChange={(e) => setAreaCode(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
                    >
                      <option value="ZTE HLR">ZTE HLR</option>
                      <option value="HUAWEI HLR">HUAWEI HLR</option>
                    </select>
                  </div>

                  {/* Creation Date To */}
                  <div className="flex items-center gap-2">
                    <label className="w-28 text-xs font-medium text-gray-700 text-right pr-1">
                      Creation Date To
                    </label>
                    <div className="flex-1 relative flex items-center">
                      <input
                        type="text"
                        value={creationDateTo}
                        onChange={(e) => setCreationDateTo(e.target.value)}
                        className="w-full border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none pr-6 font-mono"
                      />
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* COLUMN 2 */}
                <div className="space-y-3">
                  {/* Packing Tag */}
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-gray-700 text-right pr-1">
                      Packing Tag
                    </label>
                    <input
                      type="text"
                      value={packingTag}
                      onChange={(e) => setPackingTag(e.target.value)}
                      placeholder="e.g. Pac_Z_Pro_50_150726"
                      className="flex-1 border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>

                  {/* Dept. */}
                  <div className="flex items-center gap-2">
                    <label className="w-24 text-xs font-medium text-gray-700 text-right pr-1 flex items-center justify-end gap-0.5">
                      <span className="text-red-600 font-bold">*</span>Dept.
                    </label>
                    <div className="flex-1 relative flex items-center">
                      <input
                        type="text"
                        value={dept}
                        onChange={(e) => setDept(e.target.value)}
                        className="w-full border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none pr-6 font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => addToast('Opening department picker...', 'info')}
                        className="absolute right-1 text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        <Search className="w-3.5 h-3.5 text-cyan-600" />
                      </button>
                    </div>
                  </div>

                  {/* Empty Spacer */}
                  <div className="h-6 hidden md:block"></div>
                </div>

                {/* COLUMN 3 */}
                <div className="space-y-3">
                  {/* Area */}
                  <div className="flex items-center gap-2">
                    <label className="w-32 text-xs font-medium text-gray-700 text-right pr-1">
                      Area
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
                    >
                      <option value="STANDARD">STANDARD</option>
                      <option value="PREMIUM">PREMIUM</option>
                    </select>
                  </div>

                  {/* Creation Date From */}
                  <div className="flex items-center gap-2">
                    <label className="w-32 text-xs font-medium text-gray-700 text-right pr-1">
                      Creation Date From
                    </label>
                    <div className="flex-1 relative flex items-center">
                      <input
                        type="text"
                        value={creationDateFrom}
                        onChange={(e) => setCreationDateFrom(e.target.value)}
                        className="w-full border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none pr-6 font-mono"
                      />
                      <Calendar className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Action Buttons: Query & Reset */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="submit"
                      className="bg-gradient-to-b from-[#ffffff] to-[#e6e6e6] hover:from-[#f3f3f3] hover:to-[#dbdbdb] active:from-[#dcdcdc] border border-[#adadad] rounded-sm text-gray-800 px-5 py-0.5 text-xs font-bold shadow-2xs h-6 cursor-pointer"
                    >
                      Query
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="bg-gradient-to-b from-[#ffffff] to-[#e6e6e6] hover:from-[#f3f3f3] hover:to-[#dbdbdb] active:from-[#dcdcdc] border border-[#adadad] rounded-sm text-gray-800 px-5 py-0.5 text-xs font-bold shadow-2xs h-6 cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>

              </div>
            </form>
          </div>

          {/* QUERY RESULTS SUMMARY TABLE */}
          <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
            {/* Export Toolbar */}
            <div className="bg-[#f8f9fa] border-b border-[#cfd2d7] px-3 py-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => addToast('Exporting summary report to Excel...', 'info')}
                className="flex items-center gap-1 border border-gray-300 bg-white hover:bg-gray-50 px-2 py-0.5 rounded-sm text-[11px] font-medium text-gray-700 cursor-pointer"
              >
                <span>Export</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#f0f2f5] text-gray-700 font-bold border-b border-[#cfd2d7] divide-x divide-[#d1d5db]">
                    <th className="px-3 py-2">Package Type</th>
                    <th className="px-3 py-2">Packing Tag</th>
                    <th className="px-3 py-2">Creation Date</th>
                    <th className="px-3 py-2">Operator</th>
                    <th className="px-3 py-2">Dept.</th>
                    <th className="px-3 py-2">Area</th>
                    <th className="px-3 py-2">Area Code</th>
                    <th className="px-3 py-2 text-center">Successful Qty.</th>
                    <th className="px-3 py-2 text-center">Operation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {summaryResults.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-6 text-center text-gray-500 text-xs">
                        No Record.
                      </td>
                    </tr>
                  ) : (
                    summaryResults.map((row) => (
                      <tr key={row.id} className="hover:bg-blue-50/50 transition-colors divide-x divide-gray-200 text-gray-800">
                        <td className="px-3 py-2 font-medium">{row.packageType}</td>
                        <td className="px-3 py-2 font-mono font-bold text-blue-700">{row.packingTag}</td>
                        <td className="px-3 py-2 font-mono text-gray-600">{row.creationDate}</td>
                        <td className="px-3 py-2">{row.operator}</td>
                        <td className="px-3 py-2 text-gray-700">{row.dept}</td>
                        <td className="px-3 py-2">{row.area}</td>
                        <td className="px-3 py-2">{row.areaCode}</td>
                        <td className="px-3 py-2 text-center font-bold text-emerald-700">{row.successfulQty}</td>
                        <td className="px-3 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleOpenDetail(row.packingTag)}
                            className="text-blue-700 hover:text-blue-900 font-bold hover:underline cursor-pointer"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Bar (Matches image_0.png) */}
            <div className="bg-[#e9ecef] border-t border-[#cfd2d7] px-3 py-1.5 flex flex-wrap items-center justify-between text-[11px] text-gray-700">
              <div>Total Records: {summaryResults.length}</div>
              <div className="flex items-center gap-2">
                <select className="border border-gray-300 bg-white rounded text-[11px] px-1 py-0.5">
                  <option>10 Records</option>
                  <option>20 Records</option>
                  <option>50 Records</option>
                </select>
                <div className="flex items-center gap-1 font-mono">
                  <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50" disabled>&lt;&lt;</button>
                  <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50" disabled>&lt;</button>
                  <span className="px-1">1 / 1</span>
                  <button className="px-2 py-0.5 border border-gray-300 bg-white rounded text-[11px] font-bold">Go</button>
                  <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50" disabled>&gt;</button>
                  <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50" disabled>&gt;&gt;</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* PACKAGE DETAILS DRILLDOWN VIEW (Matches image_1.png) */
        <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
          {/* Header Title Bar */}
          <div className="bg-[#e9ecef] border-b border-[#cfd2d7] px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-gray-800">Package Details ({selectedTag})</span>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('summary')}
              className="text-xs text-blue-700 hover:text-blue-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Summary
            </button>
          </div>

          {/* Details Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f0f2f5] text-gray-700 font-bold border-b border-[#cfd2d7] divide-x divide-[#d1d5db]">
                  <th className="px-3 py-2">Packing Tag ^</th>
                  <th className="px-3 py-2">Package Code ^</th>
                  <th className="px-3 py-2">Item Code ^</th>
                  <th className="px-3 py-2">Service No. ^</th>
                  <th className="px-3 py-2">Service No. Item Code ^</th>
                  <th className="px-3 py-2">RUIM ^</th>
                  <th className="px-3 py-2">RUIM Item Code ^</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 font-mono">
                {currentDetailSlice.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/60 transition-colors divide-x divide-gray-200 text-gray-800">
                    <td className="px-3 py-2 font-sans font-medium text-gray-900">{item.packingTag}</td>
                    <td className="px-3 py-2 font-bold text-blue-800">{item.packageCode}</td>
                    <td className="px-3 py-2 font-sans text-gray-700">{item.itemCode}</td>
                    <td className="px-3 py-2 font-bold text-blue-700">{item.serviceNo}</td>
                    <td className="px-3 py-2 font-sans text-gray-600">{item.serviceNoItemCode}</td>
                    <td className="px-3 py-2 text-gray-700">{item.ruim}</td>
                    <td className="px-3 py-2 font-sans text-gray-700">{item.ruimItemCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Details Footer Bar (Matches image_1.png) */}
          <div className="bg-[#e9ecef] border-t border-[#cfd2d7] px-3 py-1.5 flex flex-wrap items-center justify-between text-[11px] text-gray-700">
            <div>Total Records: {detailItems.length}</div>
            <div className="flex items-center gap-2">
              <select 
                value={itemsPerPage} 
                onChange={() => {}} 
                className="border border-gray-300 bg-white rounded text-[11px] px-1 py-0.5"
              >
                <option value={10}>10 Records</option>
                <option value={20}>20 Records</option>
                <option value={50}>50 Records</option>
              </select>
              <div className="flex items-center gap-1 font-mono">
                <button 
                  onClick={() => setCurrentPage(1)} 
                  disabled={currentPage === 1}
                  className="px-1.5 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50 cursor-pointer"
                >
                  &lt;&lt;
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  disabled={currentPage === 1}
                  className="px-1.5 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50 cursor-pointer"
                >
                  &lt;
                </button>
                <span className="px-1">{currentPage} /{totalPages}</span>
                <button 
                  onClick={() => addToast(`Jumping to page ${currentPage}`, 'info')}
                  className="px-2 py-0.5 border border-gray-300 bg-white rounded text-[11px] font-bold cursor-pointer"
                >
                  Go
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                  disabled={currentPage === totalPages}
                  className="px-1.5 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50 cursor-pointer"
                >
                  &gt;
                </button>
                <button 
                  onClick={() => setCurrentPage(totalPages)} 
                  disabled={currentPage === totalPages}
                  className="px-1.5 py-0.5 border border-gray-300 bg-white rounded disabled:opacity-50 cursor-pointer"
                >
                  &gt;&gt;
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar (Matches image_1.png: Download File & Return buttons) */}
          <div className="p-3 bg-white border-t border-[#cfd2d7] flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadFile}
              className="bg-gradient-to-b from-[#ffffff] to-[#e6e6e6] hover:from-[#f3f3f3] hover:to-[#dbdbdb] active:from-[#dcdcdc] border border-[#adadad] rounded-sm text-gray-800 px-4 py-1 text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              Download File
            </button>
            <button
              type="button"
              onClick={() => setViewMode('summary')}
              className="bg-gradient-to-b from-[#ffffff] to-[#e6e6e6] hover:from-[#f3f3f3] hover:to-[#dbdbdb] active:from-[#dcdcdc] border border-[#adadad] rounded-sm text-gray-800 px-4 py-1 text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-gray-600" />
              Return
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
