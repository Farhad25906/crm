import { AlertCircle } from 'lucide-react';
import { useCRMStore } from '@/store/useCRMStore';

export default function ComplaintManagement() {
  const currentCustomer = useCRMStore(state => state.currentCustomer);
  const complaints = useCRMStore(state => state.complaints);

  const customerComplaints = currentCustomer 
    ? complaints.filter(c => c.customerId === currentCustomer.id) 
    : [];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Complaint Management</h2>
      
      {!currentCustomer ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center border border-slate-100">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Please search for a customer first in Customer Management</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Complaints for {currentCustomer.name}
          </h3>
          {customerComplaints.length === 0 ? (
            <p className="text-slate-500">No complaints found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Complaint ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customerComplaints.map(complaint => (
                    <tr key={complaint.id} className="border-b border-slate-100">
                      <td className="py-3 px-4 text-sm text-slate-800 font-mono">{complaint.id}</td>
                      <td className="py-3 px-4 text-sm text-slate-800">{complaint.category}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          complaint.status === 'Resolved' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {complaint.status}
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
