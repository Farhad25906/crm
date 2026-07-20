import { useState } from 'react';
import { Search, User } from 'lucide-react';
import { useCRMStore } from '@/store/useCRMStore';

export default function CustomerManagement() {
  const [mobileNumber, setMobileNumber] = useState('');
  const searchCustomer = useCRMStore(state => state.searchCustomerByMobile);
  const setCurrentCustomer = useCRMStore(state => state.setCurrentCustomer);
  const currentCustomer = useCRMStore(state => state.currentCustomer);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = searchCustomer(mobileNumber);
    if (customer) {
      setCurrentCustomer(customer);
    } else {
      alert('Customer not found! Try 01712345678 or 01812345678');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Customer Management</h2>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 mb-8">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Search by Mobile Number
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter mobile number (e.g. 01712345678)"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="self-end bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Customer Profile */}
      {currentCustomer && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-cyan-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">{currentCustomer.name}</h3>
              <p className="text-slate-500">{currentCustomer.mobile}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">Customer Type</p>
              <p className="font-semibold text-slate-800">{currentCustomer.type}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Account Status</p>
              <p className="font-semibold text-green-600">{currentCustomer.accountStatus}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">SIM Status</p>
              <p className="font-semibold text-green-600">{currentCustomer.simStatus}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">ICCID</p>
              <p className="font-semibold text-slate-800 font-mono">{currentCustomer.iccid}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
