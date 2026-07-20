import { Wifi, Smartphone } from 'lucide-react';

const networkStatus = [
  { service: '2G', status: 'Active' },
  { service: '3G', status: 'Active' },
  { service: '4G LTE', status: 'Active' },
  { service: '5G', status: 'Available' },
  { service: 'VoLTE', status: 'Active' },
  { service: 'Roaming', status: 'Inactive' }
];

export default function NetworkServices() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Network Services</h2>
      <div className="grid gap-4">
        {networkStatus.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="bg-cyan-100 p-3 rounded-lg">
                {index < 5 ? <Wifi className="w-6 h-6 text-cyan-600" /> : <Smartphone className="w-6 h-6 text-cyan-600" />}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{item.service}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                item.status === 'Active' 
                  ? 'bg-green-100 text-green-700' 
                  : item.status === 'Available' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
