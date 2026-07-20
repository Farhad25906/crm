import { Phone, Search } from 'lucide-react';
import { useState } from 'react';

const numbers = [
  { number: '01712345678', status: 'Active', customer: 'John Doe' },
  { number: '01812345678', status: 'Active', customer: 'Jane Smith' },
  { number: '01912345678', status: 'Available', customer: '-' },
  { number: '01612345678', status: 'Reserved', customer: '-' }
];

export default function NumberManagement() {
  const [search, setSearch] = useState('');

  const filteredNumbers = numbers.filter(n => 
    n.number.includes(search)
  );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Number Management</h2>
      
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Number List */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Number</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Customer</th>
            </tr>
          </thead>
          <tbody>
            {filteredNumbers.map((item, index) => (
              <tr key={index} className="border-b border-slate-100">
                <td className="py-3 px-4 text-sm text-slate-800 font-mono flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  {item.number}
                </td>
                <td className="py-3 px-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : item.status === 'Available' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-800">{item.customer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
