import { ArrowRightLeft } from 'lucide-react';

const mnpRequests = [
  { id: 'MNP001', number: '01712345678', type: 'Port In', status: 'Pending' },
  { id: 'MNP002', number: '01812345678', type: 'Port Out', status: 'Completed' }
];

export default function MNPManagement() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">MNP Management</h2>
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Request ID</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Number</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Type</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {mnpRequests.map((req) => (
              <tr key={req.id} className="border-b border-slate-100">
                <td className="py-3 px-4 text-sm text-slate-800 font-mono">{req.id}</td>
                <td className="py-3 px-4 text-sm text-slate-800">{req.number}</td>
                <td className="py-3 px-4 text-sm text-slate-800">
                  <span className="flex items-center gap-1">
                    <ArrowRightLeft className="w-4 h-4" />
                    {req.type}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    req.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
