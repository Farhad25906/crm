import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTabStore, Tab } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';
import { getCustomerById } from '@/data/customerDataset';
import ToastContainer from '@/components/ToastContainer';
import TeletalkLogo from '@/components/TeletalkLogo';
import {
  Info,
  ChevronRight,
  HelpCircle,
  ArrowLeft,
  Menu,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  User,
  LogOut,
  Settings,
  Bell,
  ChevronDown,
  Search
} from 'lucide-react';

export default function CRMDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const addToast = useToastStore((state) => state.addToast);

  // Tab Store
  const openTabs = useTabStore((state) => state.openTabs);
  const activeTabId = useTabStore((state) => state.activeTabId);
  const addTab = useTabStore((state) => state.addTab);
  const closeTab = useTabStore((state) => state.closeTab);
  const setActiveTabId = useTabStore((state) => state.setActiveTabId);

  // Time & Sidebar & Loading state
  const [currentTime, setCurrentTime] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isMiddleLoading, setIsMiddleLoading] = useState(false);

  // Trigger middle UI loading state on route changes
  useEffect(() => {
    setIsMiddleLoading(true);
    const timer = setTimeout(() => setIsMiddleLoading(false), 350);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Load current user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    } else {
      // Fallback - redirect to login if no user
      navigate('/');
    }
  }, [navigate]);

  // Sync route path with open tabs in store
  useEffect(() => {
    const path = location.pathname;
    if (path === '/crm' || path === '/crm/' || path.includes('/crm/site-map')) {
      setActiveTabId('site-map');
    } else if (path.includes('/crm/workspace')) {
      setActiveTabId('workspace');
    } else if (path.includes('/crm/customer-search')) {
      addTab({ id: 'customer-search', name: 'Customer Search', path, isClosable: true });
    } else if (path.includes('/crm/customer-details/')) {
      const id = path.split('/').pop() || '';
      const cust = getCustomerById(id);
      const name = cust ? cust.fullName : 'Customer Details';
      addTab({ id: `cust-${id}`, name, path, isClosable: true });
    } else if (path.includes('/crm/receive-resource')) {
      addTab({ id: 'receive-resource', name: 'Receive Resource', path, isClosable: true });
    } else if (path.includes('/crm/resource-inventory')) {
      addTab({ id: 'resource-inventory', name: 'Resource Inventory', path, isClosable: true });
    } else if (path.includes('/crm/query-package')) {
      addTab({ id: 'query-package', name: 'Query Package', path, isClosable: true });
    } else if (path.includes('/crm/pack')) {
      addTab({ id: 'pack', name: 'Pack', path, isClosable: true });
    } else if (path.includes('/crm/batch-customer-operation')) {
      addTab({ id: 'batch-customer-operation', name: 'Batch for Customer Operation', path, isClosable: true });
    } else if (path.includes('/crm/configure-offering')) {
      addTab({ id: 'configure-offering', name: 'Configure Offering', path, isClosable: true });
    } else if (path.includes('/crm/inventory/') || path.includes('/crm/inventory-module/')) {
      const parts = path.split('/');
      const slug = parts[parts.length - 1];
      const name = slug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      addTab({ id: `inv-${slug}`, name, path, isClosable: true });
    }
  }, [location.pathname, setActiveTabId, addTab]);

  // Adjust sidebar defaults: open on site-map/workspace, collapsed on detail forms
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/crm/site-map') || path.includes('/crm/workspace')) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  // Keep clock updated
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Determine active dynamic menu based on path
  const getSidebarConfig = () => {
    const path = location.pathname;

    if (path.includes('/crm/configure-offering')) {
      return {
        title: 'Product Catalog Menu',
        items: [
          { name: 'Configure Offering', path: '/crm/configure-offering', active: true },
          { name: 'Product Configuration', path: '/crm/configure-offering' },
          { name: 'Offer Catalog', path: '/crm/configure-offering' },
          { name: 'Site Map', path: '/crm/site-map' }
        ]
      };
    }

    if (path.includes('/crm/site-map')) {
      return {
        title: 'Site Map Menu',
        items: [
          { name: 'Unified System Management', path: '#' },
          { name: 'Customer Care', path: '/crm/customer-search', active: path.includes('/crm/customer-search') },
          { name: 'Batch Management', path: '#' },
          { name: 'Inventory', path: '/crm/site-map', active: path.includes('/crm/site-map') },
          { name: 'Order Provisioning Management', path: '#' },
          { name: 'Business Platform', path: '#' },
          { name: 'Product Catalog', path: '#' },
          { name: 'Order Management', path: '#' },
          { name: 'Help', path: '#' }
        ]
      };
    }

    if (path.includes('/crm/customer-search') || path.includes('/crm/customer-details')) {
      return {
        title: 'Customer Care Menu',
        items: [
          { name: 'Customer Search', path: '/crm/customer-search', active: path.includes('/crm/customer-search') },
          { name: 'Customer Care Dashboard', path: '/crm/customer-search' },
          { name: 'Batch Customer Operation', path: '/crm/batch-customer-operation' },
          { name: 'Site Map', path: '/crm/site-map' }
        ]
      };
    }

    if (path.includes('/crm/pack') || path.includes('/crm/query-package')) {
      return {
        title: 'Package Section',
        items: [
          { name: 'Pack', path: '/crm/pack', active: path.includes('/crm/pack') },
          { name: 'Modify Package', path: '#' },
          { name: 'Unpack', path: '#' },
          { name: 'Query Package', path: '/crm/query-package', active: path.includes('/crm/query-package') }
        ]
      };
    }

    if (path.includes('/crm/receive-resource')) {
      return {
        title: 'Stock Section',
        items: [
          { name: 'Receive Resource', path: '/crm/receive-resource', active: true },
          { name: 'Distribute Resource', path: '#' },
          { name: 'Transfer Resource', path: '#' },
          { name: 'Return Resource to Vendor', path: '#' },
          { name: 'Recall Resource', path: '#' },
          { name: 'Return Resource', path: '#' }
        ]
      };
    }

    if (path.includes('/crm/resource-inventory')) {
      return {
        title: 'Query Section',
        items: [
          { name: 'Single Resource Operation', path: '#' },
          { name: 'Recycling History', path: '#' },
          { name: 'Resource Inventory', path: '/crm/resource-inventory', active: true },
          { name: 'Task Monitor', path: '#' },
          { name: 'Operation History', path: '#' },
          { name: 'Number Rule', path: '#' },
          { name: 'Task', path: '#' },
          { name: 'Query Stock Account', path: '#' }
        ]
      };
    }

    if (path.includes('/crm/workspace')) {
      return {
        title: 'Workspace Menu',
        items: [
          { name: 'Dashboard', path: '/crm/workspace', active: true },
          { name: 'My Profile', path: '#' },
          { name: 'Inbox Messages', path: '#' },
          { name: 'Settings', path: '#' },
          { name: 'Notifications', path: '#' }
        ]
      };
    }

    if (path.includes('/crm/batch-customer-operation')) {
      return {
        title: 'Batch Customer',
        items: [
          { name: 'Batch Customer Care', path: '#' },
          { name: 'Batch Customer Operation', path: '/crm/batch-customer-operation', active: true },
          { name: 'Batch Order Import', path: '#' },
          { name: 'Job Queue Monitor', path: '#' }
        ]
      };
    }

    return null;
  };

  const sidebarConfig = getSidebarConfig();

  const handleSidebarItemClick = (item: { name: string; path: string }) => {
    let targetPath = item.path;
    if (item.name === 'Customer Care' || item.name === 'Customer Search' || item.name === 'Customer Care Dashboard') {
      targetPath = '/crm/customer-search';
    } else if (targetPath === '#') {
      const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      targetPath = `/crm/inventory/${slug}`;
    }

    addToast(`Navigating to ${item.name}...`, 'info');
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addTab({ id: `side-${slug}`, name: item.name, path: targetPath, isClosable: true });
    navigate(targetPath);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!currentUser) return 'U';
    const name = currentUser.name || 'User';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Check if user is logged in, if not show loading or redirect
  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-gray-800 flex flex-col font-sans select-none">
      <ToastContainer />

      {/* 1. TOP HEADER BRAND BAR */}
      <div className="bg-[#fcfdfd] border-b border-gray-300 px-4 py-1.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          {/* Teletalk Brand Logo Component */}
          <TeletalkLogo />

          {/* Orange Dropdown Orb (Also toggles sidebar) */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title="Toggle Sidebar Menu"
            className="w-5 h-5 rounded-full bg-[#f0ad4e] hover:bg-[#ec971f] flex items-center justify-center text-white shadow-xs cursor-pointer ml-1 transition-transform active:scale-95 border border-[#ec971f]"
          >
            <span className="text-[10px] text-white font-bold">▼</span>
          </button>
        </div>

        {/* Right Info Controls - Updated with User Profile */}
        <div className="flex items-center gap-4 text-[11px] text-gray-600 font-medium">
          <div className="flex items-center gap-1">
            <span>Project</span>
            <select className="border border-gray-300 px-2 py-0.5 rounded-sm bg-white text-[11px] h-6 outline-none focus:border-cyan-500">
              <option value="teletalk">Teletalk Project</option>
              <option value="mvne">MVNE System</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Root (UTC+6, {currentTime || '2026-07-21 22:44:54'})</span>
            <Info className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#f0ad4e] text-white px-2 py-0.5 rounded-sm text-[9px] font-bold tracking-wider">MVNE</span>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-md transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#2e7d32] text-white flex items-center justify-center text-xs font-bold">
                  {getUserInitials()}
                </div>
                <span className="text-[#c9302c] font-semibold">
                  {currentUser?.name || 'User'}
                </span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{currentUser?.name || 'User'}</p>
                    <p className="text-xs text-gray-500">@{currentUser?.username || 'username'}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {currentUser?.role || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate('/crm/workspace');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate('/crm/workspace');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate('/crm/workspace');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    Notifications
                  </button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              handleLogout();
            }}
            className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-sm border border-gray-300 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Switch System</span>
          </button>
        </div>
      </div>

      {/* 2. TABS ROW */}
      <div className="bg-[#e4e6e9] border-b border-gray-300 px-4 pt-1 flex items-end justify-between shadow-inner">
        <div className="flex items-end gap-1 overflow-x-auto select-none">
          {openTabs.map((tab) => {
            const isActive = activeTabId === tab.id;
            return (
              <div
                key={tab.id}
                className={`group flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-t-md border-t border-x transition-all duration-150 relative ${isActive
                  ? 'bg-white text-[#c9302c] border-gray-300 font-bold border-b-white z-10 shadow-xs'
                  : 'bg-[#f4f5f7] hover:bg-white text-gray-700 border-transparent hover:border-gray-200 hover:text-gray-900 border-b-gray-300'
                  }`}
              >
                <button
                  type="button"
                  onClick={() => navigate(tab.path)}
                  className="flex items-center gap-1 cursor-pointer focus:outline-none"
                >
                  {tab.id === 'workspace' && (
                    <span className="text-blue-500">💻</span>
                  )}
                  <span>{tab.name}</span>
                </button>

                {/* Close Button: visible always if closable, except workspace */}
                {tab.isClosable !== false && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id, navigate);
                    }}
                    className="ml-1 text-[10px] text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold transition-colors cursor-pointer focus:outline-none"
                    title="Close Tab"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Help label */}
        <div className="pb-1 text-xs text-gray-500 flex items-center gap-1">
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <span>Quick Help</span>
        </div>
      </div>

      {/* 3. BREADCRUMB TRAIL BAR */}
      <div className="bg-[#f8f9fa] border-b border-[#cfd2d7] px-4 py-1 text-[11px] text-gray-600 font-medium flex items-center gap-1 select-none">
        <span>Home</span>
        <span>&gt;</span>
        {activeTabId === 'configure-offering' ? (
          <>
            <span>Product Catalog</span>
            <span>&gt;</span>
            <span>Product Configuration</span>
            <span>&gt;</span>
            <span className="font-semibold text-gray-800">Configure Offering</span>
          </>
        ) : activeTabId === 'site-map' ? (
          <>
            <span>Inventory</span>
            <span>&gt;</span>
            <span className="font-semibold text-gray-800">Site Map</span>
          </>
        ) : activeTabId === 'workspace' ? (
          <>
            <span>Inventory</span>
            <span>&gt;</span>
            <span className="font-semibold text-gray-800">Workspace</span>
          </>
        ) : (
          <>
            <span>Inventory</span>
            <span>&gt;</span>
            <span>Query</span>
            <span>&gt;</span>
            <span className="font-semibold text-gray-800">
              {openTabs.find((t) => t.id === activeTabId)?.name || 'Resource Inventory'}
            </span>
          </>
        )}
      </div>

      {/* 4. DOUBLE SIDEBAR + MAIN AREA PANEL */}
      <div className="flex-1 flex overflow-hidden">

        {/* A. Vertical thin utility icon bar */}
        <div className="w-[36px] bg-[#dfdfdf] border-r border-[#cfd2d7] flex flex-col items-center py-3 gap-3 shrink-0 select-none">
          {/* Orange User Avatar Orb */}
          <button
            onClick={() => navigate('/crm/workspace')}
            className="w-6 h-6 rounded-full bg-[#f0ad4e] hover:bg-[#ec971f] flex items-center justify-center text-white font-bold text-xs shadow-xs cursor-pointer transition-transform active:scale-95 border border-[#ec971f]"
            title="User Profile"
          >
            <User className="w-3.5 h-3.5 text-white" />
          </button>

          {/* Search Magnifying Glass Icon Button */}
          <button
            onClick={() => navigate('/crm/resource-inventory')}
            className="w-6 h-6 rounded-md bg-transparent hover:bg-gray-300/70 flex items-center justify-center text-amber-700 cursor-pointer transition-colors"
            title="Search Inventory"
          >
            <Search className="w-3.5 h-3.5 text-amber-700" />
          </button>

          {/* Site Map Gear Icon Button */}
          <button
            onClick={() => navigate('/crm/site-map')}
            className="w-6 h-6 rounded-md bg-transparent hover:bg-gray-300/70 flex items-center justify-center text-gray-700 cursor-pointer transition-colors"
            title="Site Map"
          >
            <span className="text-xs">⚙️</span>
          </button>
        </div>

        {/* B. Dynamic Expandable Sidebar */}
        {isSidebarOpen && sidebarConfig && (
          <div className="w-64 bg-[#f8f9fa] border-r border-gray-300 flex flex-col justify-between shadow-xs transition-all duration-300 animate-slide-in-left">
            <div className="flex-1 py-3 px-2 overflow-y-auto">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
                <span>{sidebarConfig.title}</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="hover:bg-gray-200 p-0.5 rounded cursor-pointer text-gray-500"
                  title="Collapse Sidebar"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                {sidebarConfig.items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSidebarItemClick(item)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md border transition-all duration-150 flex items-center justify-between cursor-pointer ${item.active
                      ? 'bg-white border-gray-300 text-gray-900 shadow-sm font-bold'
                      : 'border-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                      }`}
                  >
                    <span>{item.name}</span>
                    {item.active && <ChevronRight className="w-3.5 h-3.5 text-red-500" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 border-t border-gray-200 bg-[#f1f3f5] text-[10px] text-gray-500 flex items-center justify-between">
              <span>Version 4.5.12</span>
              <span>Teletalk 2026</span>
            </div>
          </div>
        )}

        {/* Closed Sidebar Floating Button indicator */}
        {!isSidebarOpen && sidebarConfig && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-[36px] top-[140px] z-50 bg-[#e4e6e9] hover:bg-[#d6d8db] border-y border-r border-gray-300 p-1 rounded-r-md shadow-md cursor-pointer transition-colors"
            title="Expand Sidebar"
          >
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* C. Middle Main Content Area */}
        <div className="flex-1 bg-white p-5 overflow-y-auto relative min-h-[450px]">
          {isMiddleLoading && (
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px] z-40 flex flex-col items-center justify-center transition-all duration-200">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent shadow-md mb-3"></div>
              <p className="text-xs font-semibold text-gray-700 tracking-wide animate-pulse">Loading Module Content...</p>
            </div>
          )}
          <Outlet />
        </div>

      </div>

    </div>
  );
}