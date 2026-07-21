import { useEffect } from 'react';
import { useTabStore } from '@/store/useTabStore';
import { 
  Users, 
  Layers, 
  Smartphone, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';

export default function CRMWorkspace() {
  const addTab = useTabStore((state) => state.addTab);

  useEffect(() => {
    addTab({
      id: 'workspace',
      name: 'Workspace',
      path: '/crm/workspace',
      isClosable: false
    });
  }, [addTab]);

  const stats = [
    { label: 'Active Customers', count: '12,450', change: '+12%', color: 'text-emerald-600', icon: Users },
    { label: 'SIM Resources Available', count: '48,201', change: '-2%', color: 'text-blue-600', icon: Smartphone },
    { label: 'Pending Orders', count: '382', change: '+24%', color: 'text-amber-600', icon: Layers },
  ];

  const activities = [
    { time: '10:45 AM', text: 'Batch upload of new 4G SIM numbers completed', user: 'system', status: 'success' },
    { time: '09:30 AM', text: 'Customer Zahid updated ICCID package configuration', user: 'zahid6635', status: 'info' },
    { time: '08:15 AM', text: 'Low stock alert: Sim card 64K is running below threshold', user: 'system', status: 'warning' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-800">My Workspace</h2>
          <p className="text-xs text-gray-500 mt-0.5">Welcome back, zahid6635. Here is your daily operational summary.</p>
        </div>
        <span className="text-xs font-semibold bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200">
          ● Online & Synced
        </span>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-5 rounded-lg border border-gray-300 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                <h3 className="text-2xl font-extrabold text-gray-800">{stat.count}</h3>
                <span className={`text-[10px] font-bold ${stat.color}`}>{stat.change} since yesterday</span>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
                <Icon className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Middle: Tasks and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Tasks */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-300 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 uppercase">My Action Items</span>
              <span className="text-[10px] text-gray-500">2 pending</span>
            </div>
            
            <div className="divide-y divide-gray-200">
              <div className="p-4 flex items-start gap-3 hover:bg-gray-50/50">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-800">Verify Pending Stock Receipts</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Please check and authorize the newly received MSISDN prefixes for STANDARD area.</p>
                </div>
              </div>

              <div className="p-4 flex items-start gap-3 hover:bg-gray-50/50">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-800">Configure Recycling Rules</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Define new recycling rule limits for active pre-paid resources in ZTE HLR.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-300">
              <span className="text-xs font-bold text-gray-700 uppercase">Recent System Log</span>
            </div>
            <div className="p-4 space-y-4">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <span className="text-gray-400 font-mono shrink-0 w-16">{activity.time}</span>
                  <div className="flex-1">
                    <span className="text-gray-700">{activity.text}</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">by {activity.user}</span>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                    activity.status === 'success' ? 'bg-emerald-500' :
                    activity.status === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Links / Resources */}
        <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-4 space-y-4 self-start">
          <h4 className="text-xs font-bold text-gray-700 uppercase border-b pb-2">System Support</h4>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
              <strong>Need Help?</strong> Check out the documentation under the <strong>Help</strong> tab or contact support at ext. 4410.
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-600 flex justify-between">
                <span>Database Connection</span>
                <span className="text-emerald-600 font-bold">Connected</span>
              </div>
              <div className="text-xs text-gray-600 flex justify-between">
                <span>ZTE HLR Integration</span>
                <span className="text-emerald-600 font-bold">Online</span>
              </div>
              <div className="text-xs text-gray-600 flex justify-between">
                <span>Billing System</span>
                <span className="text-emerald-600 font-bold">Online</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
