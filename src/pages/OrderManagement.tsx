import { Package } from 'lucide-react';
import { useCRMStore } from '@/store/useCRMStore';

export default function OrderManagement() {
  const currentCustomer = useCRMStore(state => state.currentCustomer);
  const orders = useCRMStore(state => state.orders);

  const customerOrders = currentCustomer 
    ? orders.filter(o => o.customerId === currentCustomer.id) 
    : [];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Order Management</h2>
      
      {!currentCustomer ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center border border-slate-100">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Please search for a customer first in Customer Management</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Orders for {currentCustomer.name}
          </h3>
          {customerOrders.length === 0 ? (
            <p className="text-slate-500">No orders found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customerOrders.map(order => (
                    <tr key={order.id} className="border-b border-slate-100">
                      <td className="py-3 px-4 text-sm text-slate-800 font-mono">{order.id}</td>
                      <td className="py-3 px-4 text-sm text-slate-800">{order.type}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'Completed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
