import { Smartphone, RefreshCw, AlertTriangle } from 'lucide-react';
import { useCRMStore } from '@/store/useCRMStore';

export default function SIMManagement() {
  const currentCustomer = useCRMStore(state => state.currentCustomer);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">SIM Management</h2>
      
      {!currentCustomer ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center border border-slate-100">
          <Smartphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Please search for a customer first in Customer Management</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {/* SIM Info */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">SIM Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-500 mb-1">ICCID</p>
                <p className="font-semibold text-slate-800 font-mono">{currentCustomer.iccid}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">SIM Status</p>
                <p className="font-semibold text-green-600">{currentCustomer.simStatus}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">SIM Actions</h3>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-colors">
                <RefreshCw className="w-5 h-5" />
                SIM Replacement
              </button>
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors">
                <AlertTriangle className="w-5 h-5" />
                Report Lost SIM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
