import { useNavigate } from 'react-router-dom';
import { useTabStore } from '@/store/useTabStore';
import { Package2, Smartphone, Settings } from 'lucide-react';

const inventory = [
  { item: 'SIM Cards', count: 500, status: 'In Stock' },
  { item: 'Choice Numbers', count: 150, status: 'In Stock' }
];

export default function InventoryManagement() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);

  const handleOpenConfigureOffering = () => {
    addTab({
      id: 'configure-offering',
      name: 'Configure Offering',
      path: '/crm/configure-offering',
      isClosable: true
    });
    navigate('/crm/configure-offering');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Inventory Management</h2>
        <button
          onClick={handleOpenConfigureOffering}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow transition-colors cursor-pointer"
        >
          <Settings className="w-4 h-4" />
          <span>Configure Offering</span>
        </button>
      </div>

      <div className="grid gap-4">
        {/* Configure Offering Highlight Card */}
        <div 
          onClick={handleOpenConfigureOffering}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-blue-900">Configure Offering</h3>
              <p className="text-xs text-blue-700">Manage product offerings, basic information, subscription policies, and pricing plans.</p>
            </div>
          </div>
          <span className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md shadow-xs">
            Open Config
          </span>
        </div>

        {inventory.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5 border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="bg-cyan-100 p-3 rounded-lg">
                {index === 0 ? <Package2 className="w-6 h-6 text-cyan-600" /> : <Smartphone className="w-6 h-6 text-cyan-600" />}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800">{item.item}</h3>
                <p className="text-xs text-slate-500">Count: {item.count}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
