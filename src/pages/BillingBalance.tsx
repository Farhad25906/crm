import { CreditCard, DollarSign } from 'lucide-react';
import { useCRMStore } from '@/store/useCRMStore';

export default function BillingBalance() {
  const currentCustomer = useCRMStore(state => state.currentCustomer);
  const balances = useCRMStore(state => state.balances);
  const rechargeHistory = useCRMStore(state => state.rechargeHistory);

  const customerBalance = currentCustomer 
    ? balances.find(b => b.customerId === currentCustomer.id) 
    : null;
  
  const customerHistory = currentCustomer 
    ? rechargeHistory.filter(h => h.customerId === currentCustomer.id) 
    : [];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Billing & Balance</h2>
      
      {!currentCustomer ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center border border-slate-100">
          <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Please search for a customer first in Customer Management</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {/* Balance Info */}
          {customerBalance && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Account Balance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 bg-green-50 p-4 rounded-lg">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600">Main Balance</p>
                    <p className="text-2xl font-bold text-green-700">${customerBalance.mainBalance.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-lg">
                  <DollarSign className="w-8 h-8 text-amber-600" />
                  <div>
                    <p className="text-sm text-amber-600">Bonus Balance</p>
                    <p className="text-2xl font-bold text-amber-700">${customerBalance.bonusBalance.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recharge History */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Recharge History</h3>
            {customerHistory.length === 0 ? (
              <p className="text-slate-500">No recharge history found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerHistory.map(item => (
                      <tr key={item.id} className="border-b border-slate-100">
                        <td className="py-3 px-4 text-sm text-slate-800">{item.date}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-green-600">${item.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
