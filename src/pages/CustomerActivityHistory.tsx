import { History, DollarSign, Package, AlertCircle } from 'lucide-react';
import { useCRMStore } from '@/store/useCRMStore';

export default function CustomerActivityHistory() {
  const currentCustomer = useCRMStore(state => state.currentCustomer);
  const rechargeHistory = useCRMStore(state => state.rechargeHistory);
  const orders = useCRMStore(state => state.orders);
  const complaints = useCRMStore(state => state.complaints);

  // Combine all activities
  const activities = [
    ...rechargeHistory.map(h => ({
      id: h.id,
      type: 'Recharge',
      date: h.date,
      details: `$${h.amount.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    })),
    ...orders.map(o => ({
      id: o.id,
      type: 'Order',
      date: '2026-07-20',
      details: o.type,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    })),
    ...complaints.map(c => ({
      id: c.id,
      type: 'Complaint',
      date: '2026-07-20',
      details: c.category,
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Customer Activity History</h2>
      
      {!currentCustomer ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center border border-slate-100">
          <History className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Please search for a customer first in Customer Management</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Activity for {currentCustomer.name}
          </h3>
          {activities.length === 0 ? (
            <p className="text-slate-500">No activity found</p>
          ) : (
            <div className="space-y-4">
              {activities.map(activity => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg">
                    <div className={`${activity.bgColor} p-2 rounded-lg`}>
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{activity.type}</p>
                      <p className="text-sm text-slate-500">{activity.details}</p>
                    </div>
                    <p className="text-xs text-slate-400">{activity.date}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
