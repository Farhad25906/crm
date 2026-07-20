import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Login from '@/pages/Login';
import CRMDashboard from '@/pages/CRMDashboard';
import CustomerManagement from '@/pages/CustomerManagement';
import ProductManagement from '@/pages/ProductManagement';
import SIMManagement from '@/pages/SIMManagement';
import BillingBalance from '@/pages/BillingBalance';
import OrderManagement from '@/pages/OrderManagement';
import InventoryManagement from '@/pages/InventoryManagement';
import NumberManagement from '@/pages/NumberManagement';
import MNPManagement from '@/pages/MNPManagement';
import ComplaintManagement from '@/pages/ComplaintManagement';
import NetworkServices from '@/pages/NetworkServices';
import CustomerActivityHistory from '@/pages/CustomerActivityHistory';
import { useCRMStore } from '@/store/useCRMStore';

export default function App() {
  const isLoggedIn = useCRMStore((state) => state.isLoggedIn);

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <Login />;
  }

  // If logged in, show CRM system
  return (
    <Router>
      <Routes>
        {/* Custom CRM Dashboard page with separate route and layout */}
        <Route path="/crm" element={<CRMDashboard />} />
        
        {/* Default CRM routes wrapped with Sidebar */}
        <Route
          path="/*"
          element={
            <div className="flex min-h-screen bg-slate-50">
              <Sidebar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Navigate to="/crm" replace />} />
                  <Route path="/customer-management" element={<CustomerManagement />} />
                  <Route path="/product-management" element={<ProductManagement />} />
                  <Route path="/sim-management" element={<SIMManagement />} />
                  <Route path="/billing-balance" element={<BillingBalance />} />
                  <Route path="/order-management" element={<OrderManagement />} />
                  <Route path="/inventory-management" element={<InventoryManagement />} />
                  <Route path="/number-management" element={<NumberManagement />} />
                  <Route path="/mnp-management" element={<MNPManagement />} />
                  <Route path="/complaint-management" element={<ComplaintManagement />} />
                  <Route path="/network-services" element={<NetworkServices />} />
                  <Route path="/customer-activity" element={<CustomerActivityHistory />} />
                  <Route path="*" element={<Navigate to="/crm" replace />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
