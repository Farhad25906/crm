import { Link, useLocation } from 'react-router-dom';
import { useToastStore } from '@/store/useToastStore';
import { 
  LayoutDashboard, 
  Users, 
  Box, 
  Smartphone, 
  CreditCard, 
  Package, 
  Package2, 
  Phone, 
  ArrowRightLeft, 
  AlertCircle, 
  Wifi, 
  History 
} from 'lucide-react';

const menuItems = [
  { path: '/crm', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/customer-management', name: 'Customer Management', icon: Users },
  { path: '/product-management', name: 'Product Management', icon: Box },
  { path: '/sim-management', name: 'SIM Management', icon: Smartphone },
  { path: '/billing-balance', name: 'Billing & Balance', icon: CreditCard },
  { path: '/order-management', name: 'Order Management', icon: Package },
  { path: '/inventory-management', name: 'Inventory Management', icon: Package2 },
  { path: '/number-management', name: 'Number Management', icon: Phone },
  { path: '/mnp-management', name: 'MNP Management', icon: ArrowRightLeft },
  { path: '/complaint-management', name: 'Complaint Management', icon: AlertCircle },
  { path: '/network-services', name: 'Network Services', icon: Wifi },
  { path: '/customer-activity', name: 'Customer Activity History', icon: History }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">CRM Demo Portal</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                useToastStore.getState().addToast(`Opening ${item.name}...`, 'info');
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-cyan-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
