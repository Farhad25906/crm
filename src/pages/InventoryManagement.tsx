import { Package2, Smartphone } from 'lucide-react';

const inventory = [
  { item: 'SIM Cards', count: 500, status: 'In Stock' },
  { item: 'Choice Numbers', count: 150, status: 'In Stock' }
];

export default function InventoryManagement() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Inventory Management</h2>
      <div className="grid gap-6">
        {inventory.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="bg-cyan-100 p-3 rounded-lg">
                {index === 0 ? <Package2 className="w-6 h-6 text-cyan-600" /> : <Smartphone className="w-6 h-6 text-cyan-600" />}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800">{item.item}</h3>
                <p className="text-slate-500">Count: {item.count}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
