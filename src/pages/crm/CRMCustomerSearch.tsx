import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';
import { CUSTOMER_DATASET, searchCustomerRecords, CustomerRecord } from '@/data/customerDataset';
import { Search, RotateCcw, ChevronRight, User, Phone, CreditCard, ChevronDown } from 'lucide-react';

export default function CRMCustomerSearch() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);
  const addToast = useToastStore((state) => state.addToast);

  const [serviceNo, setServiceNo] = useState('');
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [searchResults, setSearchResults] = useState<CustomerRecord[]>(CUSTOMER_DATASET);

  useEffect(() => {
    addTab({
      id: 'customer-search',
      name: 'Customer Search',
      path: '/crm/customer-search',
      isClosable: true
    });
  }, [addTab]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const results = searchCustomerRecords(serviceNo, fullName, idNumber);
    setSearchResults(results);

    if (results.length === 1) {
      const cust = results[0];
      addToast(`Found customer: ${cust.fullName}`, 'success');
      openCustomerTab(cust);
    } else if (results.length > 1) {
      addToast(`Found ${results.length} matching customers`, 'info');
    } else {
      addToast('No matching customer found. Showing all records.', 'warning');
      setSearchResults(CUSTOMER_DATASET);
    }
  };

  const handleReset = () => {
    setServiceNo('');
    setFullName('');
    setIdNumber('');
    setSearchResults(CUSTOMER_DATASET);
    addToast('Search conditions reset', 'info');
  };

  const openCustomerTab = (customer: CustomerRecord) => {
    const tabId = `cust-${customer.id}`;
    const path = `/crm/customer-details/${customer.id}`;

    addTab({
      id: tabId,
      name: customer.fullName, // Tab name is Customer's Full Name!
      path,
      isClosable: true
    });

    navigate(path);
  };

  return (
    <div className="space-y-4 animate-fade-in text-gray-800 font-sans select-none">
      
      {/* 1ST PICTURE UI: Basic Search Condition - Customer */}
      <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
        
        {/* Section Title Header */}
        <div className="bg-[#e9ecef] px-4 py-2 text-xs font-bold text-gray-800 border-b border-[#cfd2d7] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 font-bold">•</span>
            <span>Basic Search Condition - Customer</span>
          </div>
        </div>

        {/* Form Fields & Search Button Bar */}
        <form onSubmit={handleSearch} className="p-4 bg-[#f8f9fa] border-b border-[#cfd2d7]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            
            {/* Service No. */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-700 font-semibold flex items-center gap-1">
                <span className="text-red-600 font-bold">*</span>
                Service No.
              </label>
              <input
                type="text"
                value={serviceNo}
                onChange={(e) => setServiceNo(e.target.value)}
                placeholder="e.g. 1575851306"
                className="px-3 py-1.5 text-xs bg-[#ffffd0]/30 border border-gray-300 rounded-sm outline-none focus:border-blue-500 focus:bg-white font-mono"
              />
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-700 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. NESHAD AHMED SUPTO"
                className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* ID Number */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-700 font-semibold">
                ID Number
              </label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="e.g. 1995827391024"
                className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-sm outline-none focus:border-blue-500 font-mono"
              />
            </div>

            {/* Action Buttons: Reset & Search */}
            <div className="flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-1.5 text-xs font-semibold text-gray-700 bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border border-gray-400 rounded-sm shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3 text-gray-600" />
                Reset
              </button>

              <button
                type="submit"
                className="px-5 py-1.5 text-xs font-bold text-white bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 border border-blue-800 rounded-sm shadow-xs transition-colors cursor-pointer flex items-center gap-1"
              >
                <Search className="w-3 h-3 text-white" />
                Search
              </button>
            </div>

          </div>

          {/* Expandable Details toggle button */}
          <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-2 text-[11px]">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-700 hover:text-blue-900 font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Details... &gt;&gt;</span>
            </button>
            <span className="text-gray-400">Teletalk Telecom CRM System v4.5</span>
          </div>

          {/* Details expanded options */}
          {showDetails && (
            <div className="mt-3 p-3 bg-white border border-gray-200 rounded-sm text-xs grid grid-cols-1 sm:grid-cols-3 gap-3 animate-slide-in-down">
              <div>
                <span className="font-semibold text-gray-600">Account Type:</span> All Prepaid & Postpaid
              </div>
              <div>
                <span className="font-semibold text-gray-600">Operator Region:</span> Dhaka HQ / Central
              </div>
              <div>
                <span className="font-semibold text-gray-600">Search Scope:</span> Active Subscribers DB
              </div>
            </div>
          )}
        </form>

        {/* Results List / 10 Dummy Dataset Quick Pick Grid */}
        <div className="p-4 bg-white">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" />
              Customer Search Results ({searchResults.length} Records)
            </h3>
            <span className="text-[11px] text-gray-500">Click any customer row to open their profile tab</span>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="px-3 py-2.5">Service No.</th>
                  <th className="px-3 py-2.5">Full Name</th>
                  <th className="px-3 py-2.5">NID / ID Number</th>
                  <th className="px-3 py-2.5">Account ID</th>
                  <th className="px-3 py-2.5">Payment Flag</th>
                  <th className="px-3 py-2.5">Primary Offering</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {searchResults.map((cust) => (
                  <tr
                    key={cust.id}
                    onClick={() => openCustomerTab(cust)}
                    className="hover:bg-blue-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="px-3 py-2.5 font-mono font-bold text-blue-700 group-hover:underline">
                      {cust.serviceNo}
                    </td>
                    <td className="px-3 py-2.5 font-bold text-gray-900">
                      {cust.fullName}
                    </td>
                    <td className="px-3 py-2.5 font-mono text-gray-600">{cust.idNumber}</td>
                    <td className="px-3 py-2.5 font-mono text-gray-700">{cust.accountNo}</td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        cust.paymentFlag === 'Prepaid' ? 'bg-[#e8f5e9] text-[#2e7d32]' : 'bg-[#e3f2fd] text-[#1565c0]'
                      }`}>
                        {cust.paymentFlag}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-medium text-gray-800">{cust.primaryOffering}</td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        cust.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {cust.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openCustomerTab(cust);
                        }}
                        className="px-3 py-1 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-sm shadow-2xs transition-colors cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        Open Tab
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-[11px] text-gray-500 flex items-center justify-between">
            <span>Total Records: {searchResults.length}</span>
            <span>Teletalk Bangladesh Limited • Customer Care System</span>
          </div>

        </div>

      </div>

    </div>
  );
}
