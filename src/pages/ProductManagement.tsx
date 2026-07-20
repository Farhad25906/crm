import { Box } from 'lucide-react';
import { useCRMStore } from '@/store/useCRMStore';

export default function ProductManagement() {
  const currentCustomer = useCRMStore(state => state.currentCustomer);
  const packages = useCRMStore(state => state.packages);

  const customerPackages = currentCustomer 
    ? packages.filter(p => p.customerId === currentCustomer.id) 
    : [];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Product Management</h2>
      
      {!currentCustomer ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center border border-slate-100">
          <Box className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Please search for a customer first in Customer Management</p>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Packages for {currentCustomer.name}
            </h3>
          </div>

          {customerPackages.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 text-center">
              <p className="text-slate-500">No packages found for this customer</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {customerPackages.map(pkg => (
                <div key={pkg.id} className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Internet</p>
                      <p className="font-semibold text-slate-800">{pkg.internet}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Voice</p>
                      <p className="font-semibold text-slate-800">{pkg.voice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">SMS</p>
                      <p className="font-semibold text-slate-800">{pkg.sms}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Bonus Balance</p>
                      <p className="font-semibold text-amber-600">${pkg.bonusBalance.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-1">Expiry Date</p>
                      <p className="font-semibold text-slate-800">{pkg.expiryDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
