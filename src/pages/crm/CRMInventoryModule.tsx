import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToastStore } from '@/store/useToastStore';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  RefreshCw, 
  Database, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Format slug or title nicely
function formatModuleName(slug: string = '') {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CRMInventoryModule() {
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  const addToast = useToastStore((state) => state.addToast);

  const moduleTitle = formatModuleName(moduleSlug || 'inventory-module');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate dynamic sample data matching telecom CRM records
  const sampleRecords = [
    { id: 'REC-9081', code: 'TR-10023', name: `${moduleTitle} Entry Alpha`, status: 'Active', category: 'Standard', updatedAt: '2026-07-21 18:42:00', operator: 'Zahid Hasan' },
    { id: 'REC-9082', code: 'TR-10024', name: `${moduleTitle} Item Beta`, status: 'Pending', category: 'Priority', updatedAt: '2026-07-21 19:15:30', operator: 'Tabtila Islam' },
    { id: 'REC-9083', code: 'TR-10025', name: `${moduleTitle} Config Gamma`, status: 'Active', category: 'Enterprise', updatedAt: '2026-07-21 20:01:10', operator: 'Rafiqul Islam' },
    { id: 'REC-9084', code: 'TR-10026', name: `${moduleTitle} Unit Delta`, status: 'Locked', category: 'Standard', updatedAt: '2026-07-21 21:10:45', operator: 'Nasir Uddin' },
    { id: 'REC-9085', code: 'TR-10027', name: `${moduleTitle} Batch Epsilon`, status: 'Active', category: 'Bulk', updatedAt: '2026-07-21 22:30:12', operator: 'Kamal Hossain' }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    addToast(`Refreshing data for ${moduleTitle}...`, 'info');
    setTimeout(() => {
      setIsRefreshing(false);
      addToast(`${moduleTitle} data synced successfully`, 'success');
    }, 600);
  };

  const handleExport = () => {
    addToast(`Exporting ${moduleTitle} report to CSV...`, 'info');
    setTimeout(() => {
      addToast(`${moduleTitle} CSV downloaded successfully`, 'success');
    }, 800);
  };

  const handleCreate = () => {
    addToast(`New ${moduleTitle} entry modal opened`, 'info');
  };

  const handleRowAction = (action: string, id: string) => {
    addToast(`${action} action triggered for record ${id} in ${moduleTitle}`, 'success');
  };

  return (
    <div className="space-y-5 animate-fade-in text-gray-800">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>Inventory Management</span>
            <span>/</span>
            <span className="font-semibold text-blue-700">{moduleTitle}</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            {moduleTitle}
          </h1>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            Export CSV
          </button>

          <button
            onClick={handleCreate}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add {moduleTitle}
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Total Records</p>
            <p className="text-xl font-bold text-gray-900 mt-1">1,248</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            #
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Active Items</p>
            <p className="text-xl font-bold text-emerald-600 mt-1">1,120</p>
          </div>
          <CheckCircle className="w-9 h-9 text-emerald-500 bg-emerald-50 p-2 rounded-full" />
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Pending Tasks</p>
            <p className="text-xl font-bold text-amber-600 mt-1">84</p>
          </div>
          <Clock className="w-9 h-9 text-amber-500 bg-amber-50 p-2 rounded-full" />
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Locked / Exception</p>
            <p className="text-xl font-bold text-rose-600 mt-1">44</p>
          </div>
          <AlertCircle className="w-9 h-9 text-rose-500 bg-rose-50 p-2 rounded-full" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${moduleTitle} by ID, Name or Code...`}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-2.5 py-1.5 bg-white outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Locked">Locked</option>
          </select>
        </div>
      </div>

      {/* Main Records Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Record ID</th>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Name / Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Operator</th>
                <th className="px-4 py-3">Updated At</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleRecords
                .filter((r) =>
                  (statusFilter === 'All' || r.status === statusFilter) &&
                  (r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    r.id.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3 font-mono font-medium text-blue-700">{record.id}</td>
                    <td className="px-4 py-3 text-gray-600">{record.code}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{record.name}</td>
                    <td className="px-4 py-3 text-gray-600">{record.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          record.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : record.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{record.operator}</td>
                    <td className="px-4 py-3 text-gray-500 font-mono text-[11px]">{record.updatedAt}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => handleRowAction('View Details', record.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium hover:underline cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleRowAction('Edit', record.id)}
                        className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
          <span>Showing 1 to 5 of 1,248 items</span>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-100 disabled:opacity-50">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-2.5 py-1 border border-blue-600 bg-blue-600 text-white rounded font-bold">1</button>
            <button className="px-2.5 py-1 border border-gray-300 bg-white hover:bg-gray-100 rounded">2</button>
            <button className="px-2.5 py-1 border border-gray-300 bg-white hover:bg-gray-100 rounded">3</button>
            <button className="px-2 py-1 border border-gray-300 rounded bg-white hover:bg-gray-100">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
