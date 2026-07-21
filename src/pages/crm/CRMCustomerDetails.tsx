import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCustomerById, CUSTOMER_DATASET } from '@/data/customerDataset';
import { useToastStore } from '@/store/useToastStore';
import { 
  User, 
  CreditCard, 
  Calendar, 
  Search, 
  RefreshCw, 
  DollarSign, 
  Layers, 
  CheckCircle,
  FileText,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function CRMCustomerDetails() {
  const { customerId } = useParams<{ customerId: string }>();
  const addToast = useToastStore((state) => state.addToast);

  const customer = getCustomerById(customerId || '') || CUSTOMER_DATASET[0];
  const [selectedAccount, setSelectedAccount] = useState(customer.accountNo);
  const [startTime, setStartTime] = useState('2026-07-09');
  const [endTime, setEndTime] = useState('2026-07-19');
  const [activeBottomTab, setActiveBottomTab] = useState<'recharge' | 'balance'>('recharge');
  const [isSearchingRecharge, setIsSearchingRecharge] = useState(false);

  useEffect(() => {
    setSelectedAccount(customer.accountNo);
  }, [customer]);

  const handleRechargeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchingRecharge(true);
    addToast(`Searching recharge logs from ${startTime} to ${endTime}...`, 'info');
    setTimeout(() => {
      setIsSearchingRecharge(false);
      addToast(`Recharge log updated for ${customer.fullName}`, 'success');
    }, 400);
  };

  return (
    <div className="space-y-4 animate-fade-in text-gray-800 font-sans select-none pb-8">

      {/* Subscriber Header Card */}
      <div className="bg-white p-3.5 rounded-sm border border-[#cfd2d7] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            {customer.fullName.substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-gray-900">{customer.fullName}</h1>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                customer.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {customer.status}
              </span>
              <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                {customer.paymentFlag}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Service No: <span className="font-bold text-blue-700">{customer.serviceNo}</span> • NID: {customer.idNumber} • Account: {customer.accountNo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-[#e9ecef] border border-gray-300 px-3 py-1 rounded-sm font-semibold text-gray-700">
            Offering: <span className="text-blue-800">{customer.primaryOffering}</span>
          </span>
        </div>
      </div>

      {/* 2ND PICTURE UI SECTION 1: Account List */}
      <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
        
        {/* Section Header */}
        <div className="bg-[#e9ecef] px-4 py-1.5 text-xs font-bold text-gray-800 border-b border-[#cfd2d7] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 font-bold">•</span>
            <span>Account List</span>
          </div>
        </div>

        {/* Account Selector Bar */}
        <div className="p-3 bg-[#f8f9fa] border-b border-[#cfd2d7] flex items-center gap-2 text-xs">
          <span className="font-semibold text-gray-700">Account</span>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="border border-gray-300 rounded-sm px-3 py-1 bg-white outline-none focus:border-blue-500 font-mono text-xs"
          >
            <option value={customer.accountNo}>{customer.accountNo}</option>
          </select>
        </div>

        {/* Account Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1f3f5] text-gray-700 font-semibold border-b border-[#cfd2d7]">
              <tr>
                <th className="px-4 py-2 border-r border-gray-200">Service No. ^</th>
                <th className="px-4 py-2 border-r border-gray-200">Payment Flag ^</th>
                <th className="px-4 py-2 border-r border-gray-200">Status ^</th>
                <th className="px-4 py-2">Primary Offering ^</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-50/80">
                <td className="px-4 py-2.5 font-mono text-blue-700 font-bold border-r border-gray-200">
                  {customer.serviceNo}
                </td>
                <td className="px-4 py-2.5 text-gray-700 border-r border-gray-200">
                  {customer.paymentFlag}
                </td>
                <td className="px-4 py-2.5 border-r border-gray-200">
                  <span className="text-emerald-700 font-semibold">{customer.status}</span>
                </td>
                <td className="px-4 py-2.5 text-gray-900 font-medium">
                  {customer.primaryOffering}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination Controls */}
        <div className="bg-[#e9ecef] px-4 py-2 border-t border-[#cfd2d7] flex items-center justify-between text-xs text-gray-700">
          <span>Total Records: 1</span>
          <div className="flex items-center gap-2">
            <select className="border border-gray-300 rounded bg-white px-2 py-0.5 text-xs">
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <span>Records</span>
            <div className="flex items-center gap-1 font-mono text-xs">
              <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded hover:bg-gray-100 disabled:opacity-50">|&lt;</button>
              <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded hover:bg-gray-100 disabled:opacity-50">&lt;</button>
              <span className="px-2 py-0.5 border border-blue-500 bg-white text-blue-700 font-bold rounded">1</span>
              <span>/1</span>
              <button className="px-2 py-0.5 border border-gray-300 bg-white rounded hover:bg-gray-100 text-xs">Go</button>
              <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded hover:bg-gray-100">&gt;</button>
              <button className="px-1.5 py-0.5 border border-gray-300 bg-white rounded hover:bg-gray-100">&gt;|</button>
            </div>
          </div>
        </div>

      </div>

      {/* 2ND PICTURE UI SECTION 2: Account Summary */}
      <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
        
        {/* Section Header */}
        <div className="bg-[#e9ecef] px-4 py-1.5 text-xs font-bold text-gray-800 border-b border-[#cfd2d7] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 font-bold">•</span>
            <span>Account Summary</span>
          </div>
        </div>

        {/* 2-Column Key Value Summary Grid */}
        <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs">
          
          {/* Left Column Stats */}
          <div className="space-y-2 divide-y divide-gray-100">
            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Core Balance</span>
              <span className="font-bold font-mono text-gray-900">{customer.coreBalance}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Promo Balance</span>
              <span className="font-bold font-mono text-gray-900">{customer.promoBalance}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Free Bytes Limit</span>
              <span className="font-semibold text-gray-800">{customer.freeBytesLimit}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Free Bytes Used</span>
              <span className="font-semibold text-gray-800">{customer.freeBytesUsed}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Payment Due Date</span>
              <span className="font-semibold text-gray-800">{customer.paymentDueDate}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Available Free Minutes(Second)</span>
              <span className="font-semibold text-gray-800">{customer.availableFreeMinutes}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Residual Volume(Byte)</span>
              <span className="font-semibold text-gray-800">{customer.residualVolume}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">PPS Core Balance</span>
              <span className="font-bold font-mono text-gray-900">{customer.ppsCoreBalance}</span>
            </div>
          </div>

          {/* Right Column Stats */}
          <div className="space-y-2 divide-y divide-gray-100">
            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">UnBilled Amount</span>
              <span className="font-bold font-mono text-gray-900">{customer.unbilledAmount}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Outstanding Bill</span>
              <span className="font-bold font-mono text-gray-900">{customer.outstandingBill}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Free Bytes Left</span>
              <span className="font-semibold text-emerald-700">{customer.freeBytesLeft}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Billing Group</span>
              <span className="font-bold text-blue-800">{customer.billingGroup}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Effective Payment Method</span>
              <span className="font-semibold text-gray-800">{customer.effectivePaymentMethod}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Residual SMS Volume(Item)</span>
              <span className="font-semibold text-gray-800">{customer.residualSmsVolume}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">Valid Time</span>
              <span className="font-mono text-xs text-gray-700">{customer.validTime}</span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600 font-medium">PPS Core Balance Valid Time</span>
              <span className="font-mono text-xs text-gray-700">{customer.ppsCoreBalanceValidTime}</span>
            </div>
          </div>

        </div>

      </div>

      {/* 2ND PICTURE UI SECTION 3: Recharge Log / Balance Info */}
      <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
        
        {/* Section Header with Tabs */}
        <div className="bg-[#e9ecef] px-3 pt-1 border-b border-[#cfd2d7] flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => setActiveBottomTab('recharge')}
              className={`px-3 py-1 font-bold rounded-t border-t border-x transition-colors cursor-pointer ${
                activeBottomTab === 'recharge'
                  ? 'bg-white border-[#cfd2d7] text-blue-800 border-b-white -mb-[1px]'
                  : 'bg-gray-200 border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              • Recharge Log
            </button>

            <button
              onClick={() => setActiveBottomTab('balance')}
              className={`px-3 py-1 font-bold rounded-t border-t border-x transition-colors cursor-pointer ${
                activeBottomTab === 'balance'
                  ? 'bg-white border-[#cfd2d7] text-blue-800 border-b-white -mb-[1px]'
                  : 'bg-gray-200 border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Balance Info
            </button>
          </div>
        </div>

        {/* Date Filter Bar */}
        <form onSubmit={handleRechargeSearch} className="p-3 bg-[#f8f9fa] border-b border-[#cfd2d7] flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-red-600 font-bold">*</span>
            <span className="font-semibold text-gray-700">Start Time</span>
            <input
              type="date"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-sm bg-white text-xs outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-red-600 font-bold">*</span>
            <span className="font-semibold text-gray-700">End Time</span>
            <input
              type="date"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-sm bg-white text-xs outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isSearchingRecharge}
            className="px-4 py-1 font-semibold text-xs text-gray-800 bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border border-gray-400 rounded-sm shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
          >
            <Search className="w-3 h-3 text-gray-600" />
            {isSearchingRecharge ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Recharge Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f1f3f5] text-gray-700 font-semibold border-b border-[#cfd2d7]">
              <tr>
                <th className="px-3 py-2 border-r border-gray-200">Service No.</th>
                <th className="px-3 py-2 border-r border-gray-200">Batch No.</th>
                <th className="px-3 py-2 border-r border-gray-200">Seria No.</th>
                <th className="px-3 py-2 border-r border-gray-200">Payment Mode</th>
                <th className="px-3 py-2 border-r border-gray-200">Recharge Date</th>
                <th className="px-3 py-2 border-r border-gray-200">Balance Before</th>
                <th className="px-3 py-2 border-r border-gray-200">Balance After</th>
                <th className="px-3 py-2">Recharge Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customer.rechargeLogs.length > 0 ? (
                customer.rechargeLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80">
                    <td className="px-3 py-2 font-mono text-blue-700 border-r border-gray-200">{log.serviceNo}</td>
                    <td className="px-3 py-2 font-mono text-gray-600 border-r border-gray-200">{log.batchNo}</td>
                    <td className="px-3 py-2 font-mono text-gray-600 border-r border-gray-200">{log.serialNo}</td>
                    <td className="px-3 py-2 text-gray-800 font-medium border-r border-gray-200">{log.paymentMode}</td>
                    <td className="px-3 py-2 font-mono text-gray-600 text-[11px] border-r border-gray-200">{log.rechargeDate}</td>
                    <td className="px-3 py-2 font-mono text-gray-700 border-r border-gray-200">{log.balanceBefore}</td>
                    <td className="px-3 py-2 font-mono text-emerald-700 font-bold border-r border-gray-200">{log.balanceAfter}</td>
                    <td className="px-3 py-2 font-mono text-gray-600">{log.rechargeFee}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-400 italic">
                    No recharge transactions found for period {startTime} to {endTime}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
