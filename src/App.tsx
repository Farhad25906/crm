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

// Dynamic sub-page imports for route-based CRM Dashboard tabs
import CRMWorkspace from '@/pages/crm/CRMWorkspace';
import CRMSiteMap from '@/pages/crm/CRMSiteMap';
import CRMReceiveResource from '@/pages/crm/CRMReceiveResource';
import CRMResourceInventory from '@/pages/crm/CRMResourceInventory';
import CRMQueryPackage from '@/pages/crm/CRMQueryPackage';
import CRMPack from '@/pages/crm/CRMPack';
import CRMBatchCustomerOperation from '@/pages/crm/CRMBatchCustomerOperation';
import CRMInventoryModule from '@/pages/crm/CRMInventoryModule';
import CRMCustomerSearch from '@/pages/crm/CRMCustomerSearch';
import CRMCustomerDetails from '@/pages/crm/CRMCustomerDetails';

export default function App() {
  const isLoggedIn = useCRMStore((state) => state.isLoggedIn);

  return (
    <Router>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <Routes>
          {/* Custom CRM Dashboard page with separate route and layout */}
          <Route path="/crm" element={<CRMDashboard />}>
            <Route index element={<Navigate to="site-map" replace />} />
            <Route path="site-map" element={<CRMSiteMap />} />
            <Route path="workspace" element={<CRMWorkspace />} />
            <Route path="receive-resource" element={<CRMReceiveResource />} />
            <Route path="resource-inventory" element={<CRMResourceInventory />} />
            <Route path="query-package" element={<CRMQueryPackage />} />
            <Route path="pack" element={<CRMPack />} />
            <Route path="batch-customer-operation" element={<CRMBatchCustomerOperation />} />
            <Route path="inventory-module/:moduleSlug" element={<CRMInventoryModule />} />
            <Route path="inventory/:moduleSlug" element={<CRMInventoryModule />} />
            <Route path="customer-search" element={<CRMCustomerSearch />} />
            <Route path="customer-details/:customerId" element={<CRMCustomerDetails />} />
          </Route>
          
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
      )}
    </Router>
  );
}
