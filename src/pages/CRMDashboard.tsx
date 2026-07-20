import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Settings, 
  Users, 
  ArrowLeft, 
  Info,
  Calendar,
  Grid,
  FileText,
  Briefcase,
  Layers,
  ChevronRight,
  HelpCircle,
  Undo2,
  PackageCheck,
  Search,
  BookOpen
} from 'lucide-react';

// Tabs requested by user: Workspace, Revert Resource, Resource Inventory, Query Package, Pack, Site Map
type HeaderTab = 'Workspace' | 'Revert Resource' | 'Resource Inventory' | 'Query Package' | 'Pack' | 'Site Map';

export default function CRMDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HeaderTab>('Site Map');
  
  // Sidebar items for Site Map tab
  const siteMapSidebarItems = [
    'Unified System Management',
    'Customer Care',
    'Batch Management',
    'Inventory',
    'Order Provisioning Management',
    'Business Platform',
    'Product Catalog',
    'Order Management',
    'Help'
  ];
  
  const [activeSidebarItem, setActiveSidebarItem] = useState<string>('Inventory');
  const [currentTime, setCurrentTime] = useState('');

  // Keep the time updated like a real system
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      // Format: 2026-07-19 14:31:17
      const pad = (n: number) => n.toString().padStart(2, '0');
      const yyyy = date.getFullYear();
      const mm = pad(date.getMonth() + 1);
      const dd = pad(date.getDate());
      const hh = pad(date.getHours());
      const min = pad(date.getMinutes());
      const ss = pad(date.getSeconds());
      setCurrentTime(`${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // When active tab changes, default the sidebar selection
  const handleTabChange = (tab: HeaderTab) => {
    setActiveTab(tab);
    if (tab === 'Site Map') {
      setActiveSidebarItem('Inventory');
    } else {
      setActiveSidebarItem('Home');
    }
  };

  // Inventory Grid Data
  const inventorySections = [
    {
      title: 'Configuration',
      items: [
        ['Number Rule', 'Vendor', 'Department Permission', 'Recycling Rule'],
        ['Item Code', 'Prefix', 'Resource Type', 'Inventory Alarm Rule']
      ]
    },
    {
      title: 'Stock',
      items: [
        ['Receive Resource', 'Distribute Resource', 'Transfer Resource', ''],
        ['Return Resource to Vendor', 'Recall Resource', 'Return Resource', '']
      ]
    },
    {
      title: 'Note',
      items: [
        ['Receive Note', 'Modify Note', 'Query Note', 'Reject Note'],
        ['Cancel Note', 'Pick Note', 'Print Note', '']
      ]
    },
    {
      title: 'Maintenance',
      items: [
        ['Change Payment Mode', 'Lock/Unlock Resource', 'Change Service No. Level', 'Consume/Release Resource'],
        ['Change Resource Status', 'Change Resource DOA Status', 'Change Resource Item', 'Change Area Code'],
        ['Recycle Resource', 'Change Resource Pool', 'Change Tele Type', '']
      ]
    },
    {
      title: 'Package',
      items: [
        ['Pack', 'Modify Package', 'Unpack', 'Query Package']
      ]
    },
    {
      title: 'Query',
      items: [
        ['Single Resource Operation', 'Recycling History', 'Resource Inventory', 'Task Monitor'],
        ['Operation History', 'Number Rule', 'Task', 'Query Stock Account']
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-800 flex flex-col font-sans select-none">
      
      {/* 1. TOP HEADER BRAND BAR */}
      <div className="bg-[#fcfdfd] border-b border-gray-300 px-4 py-2 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {/* Teletalk Brand Logo */}
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Green leaves/waves symbol resembling Teletalk logo */}
              <path d="M10 80 C20 40, 50 30, 80 20 C60 50, 40 70, 10 80 Z" fill="#2e7d32" />
              <path d="M30 90 C50 60, 70 50, 90 40 C80 70, 60 85, 30 90 Z" fill="#4caf50" />
              <circle cx="50" cy="20" r="10" fill="#e53935" />
            </svg>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#2e7d32] leading-none">teletalk</span>
              <span className="text-[9px] text-[#e53935] font-semibold tracking-wider uppercase">দেশের নিজের নেটওয়ার্ক</span>
            </div>
          </div>
          {/* Orange Dropdown Orb */}
          <button className="w-5 h-5 rounded-full bg-[#f0ad4e] hover:bg-[#ec971f] flex items-center justify-center text-white shadow-xs cursor-pointer ml-1">
            <span className="text-[10px]">▼</span>
          </button>
        </div>

        {/* Right Info Controls */}
        <div className="flex items-center gap-6 text-[11px] text-gray-600 font-medium">
          <div className="flex items-center gap-1">
            <span>Project</span>
            <select className="border border-gray-300 px-2 py-0.5 rounded-sm bg-white text-[11px] h-6 outline-none focus:border-cyan-500">
              <option value="teletalk">Teletalk Project</option>
              <option value="mvne">MVNE System</option>
            </select>
          </div>
          
          <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Root (UTC+6, {currentTime || '2026-07-21 00:03:16'})</span>
            <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#f0ad4e] text-white px-2 py-0.5 rounded-sm text-[9px] font-bold tracking-wider">MVNE</span>
            <span className="text-[#c9302c] font-semibold hover:underline cursor-pointer">zahid6635</span>
          </div>

          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-sm border border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Switch System</span>
          </button>
        </div>
      </div>

      {/* 2. TABS ROW (Workspace, Revert Resource, etc.) */}
      <div className="bg-[#e4e6e9] border-b border-gray-300 px-4 pt-1 flex items-end justify-between shadow-inner">
        <div className="flex items-end gap-1 overflow-x-auto">
          {(['Workspace', 'Revert Resource', 'Resource Inventory', 'Query Package', 'Pack', 'Site Map'] as HeaderTab[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`group flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-t-md border-t border-x transition-all duration-150 relative cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#c9302c] border-gray-300 font-bold border-b-white z-10 shadow-xs'
                    : 'bg-[#f4f5f7] hover:bg-white text-gray-700 border-transparent hover:border-gray-200 hover:text-gray-900 border-b-gray-300'
                }`}
              >
                {tab === 'Workspace' && (
                  <span className="text-blue-500">💻</span>
                )}
                <span>{tab}</span>
                {tab === 'Site Map' && (
                  <span className="ml-1 text-[10px] bg-red-100 text-red-600 hover:bg-red-200 rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
                    ×
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Help label */}
        <div className="pb-1 text-xs text-gray-500 flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <span>Quick Help</span>
        </div>
      </div>

      {/* 3. DOUBLE SIDEBAR + MAIN AREA PANEL */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* A. Vertical thin utility icon bar */}
        <div className="w-[45px] bg-[#dfdfdf] border-r border-gray-300 flex flex-col items-center py-4 gap-4">
          <div className="w-8 h-8 rounded-full bg-orange-400 border border-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer hover:scale-105 transition-transform">
            👤
          </div>
          <div className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-white border border-gray-300 flex items-center justify-center text-gray-600 cursor-pointer transition-colors">
            📞
          </div>
          <div className="w-8 h-8 rounded-lg bg-gray-200 hover:bg-white border border-gray-300 flex items-center justify-center text-gray-600 cursor-pointer transition-colors">
            ⚙️
          </div>
        </div>

        {/* B. Main Sidebar Pane (Dynamic based on selected header tab) */}
        <div className="w-64 bg-[#f8f9fa] border-r border-gray-300 flex flex-col justify-between shadow-xs">
          <div className="flex-1 py-3 px-2 overflow-y-auto">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-3 mb-2">
              {activeTab} Menu
            </div>
            
            {activeTab === 'Site Map' ? (
              // Site Map sidebar items
              <div className="space-y-1">
                {siteMapSidebarItems.map((item) => {
                  const isActive = activeSidebarItem === item;
                  return (
                    <button
                      key={item}
                      onClick={() => setActiveSidebarItem(item)}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-white border-gray-300 text-gray-900 shadow-sm font-bold'
                          : 'border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                    >
                      <span>{item}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-red-500" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              // Other tabs show only "Home" button
              <div className="space-y-1">
                <button
                  onClick={() => setActiveSidebarItem('Home')}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md border transition-all duration-150 flex items-center justify-between cursor-pointer ${
                    activeSidebarItem === 'Home'
                      ? 'bg-white border-gray-300 text-gray-900 shadow-sm font-bold'
                      : 'border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    🏠 Home
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Footer of Sidebar */}
          <div className="p-3 border-t border-gray-200 bg-[#f1f3f5] text-[10px] text-gray-500 flex items-center justify-between">
            <span>Version 4.5.12</span>
            <span>Teletalk 2026</span>
          </div>
        </div>

        {/* C. Middle Main Content Area */}
        <div className="flex-1 bg-white p-5 overflow-y-auto">
          {activeTab === 'Site Map' && activeSidebarItem === 'Inventory' ? (
            // 4. MAIN WORKSPACE FOR SITE MAP -> INVENTORY
            <div className="space-y-5">
              
              {/* Grid of Sections */}
              <div className="border border-[#cfd2d7] rounded-sm shadow-xs overflow-hidden">
                {inventorySections.map((section, sIdx) => (
                  <div key={section.title} className="border-b last:border-b-0 border-[#cfd2d7]">
                    
                    {/* Section title header */}
                    <div className="bg-[#e9ecef] px-4 py-1.5 text-xs font-bold text-gray-800 border-b border-[#cfd2d7] flex items-center justify-between">
                      <span>{section.title}</span>
                    </div>

                    {/* Section items in rows, styled as grid table cells */}
                    <div className="divide-y divide-gray-100">
                      {section.items.map((row, rIdx) => (
                        <div key={rIdx} className="grid grid-cols-4 bg-white hover:bg-gray-50/50">
                          {row.map((item, cIdx) => (
                            <div 
                              key={cIdx} 
                              className="px-4 py-2 border-r last:border-r-0 border-gray-200 text-xs flex items-center justify-between"
                            >
                              {item ? (
                                <a 
                                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                                  className="text-blue-700 hover:text-blue-900 hover:underline font-medium cursor-pointer transition-colors"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    alert(`Navigate to: ${item}`);
                                  }}
                                >
                                  {item}
                                </a>
                              ) : (
                                <span className="text-gray-300">-</span>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ) : (
            // 5. COMING SOON VIEW FOR OTHER SELECTIONS
            <div className="h-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200 text-amber-500 mb-4 animate-bounce">
                🚀
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Coming Soon</h3>
              <p className="text-xs text-gray-500 max-w-sm mb-6">
                The section <strong className="text-gray-700">"{activeSidebarItem}"</strong> under tab <strong className="text-gray-700">"{activeTab}"</strong> is currently in development.
              </p>
              <button 
                onClick={() => handleTabChange('Site Map')} 
                className="bg-[#2e7d32] hover:bg-[#388e3c] text-white text-xs font-bold px-4 py-2 rounded shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Go to Site Map</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
