import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import CRMDashboard from '@/pages/CRMDashboard';
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
import CRMConfigureOffering from '@/pages/crm/CRMConfigureOffering';

export default function App() {
  const isLoggedIn = useCRMStore((state) => state.isLoggedIn);

  return (
    <Router>
      {!isLoggedIn ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <Routes>
          {/* Custom CRM Dashboard page with separate route and layout */}
          <Route path="/crm" element={<CRMDashboard />}>
            <Route index element={<Navigate to="workspace" replace />} />
            <Route path="site-map" element={<CRMSiteMap />} />
            <Route path="workspace" element={<CRMWorkspace />} />
            <Route path="receive-resource" element={<CRMReceiveResource />} />
            <Route path="resource-inventory" element={<CRMResourceInventory />} />
            <Route path="query-package" element={<CRMQueryPackage />} />
            <Route path="pack" element={<CRMPack />} />
            <Route path="batch-customer-operation" element={<CRMBatchCustomerOperation />} />
            <Route path="configure-offering" element={<CRMConfigureOffering />} />
            <Route path="inventory-module/:moduleSlug" element={<CRMInventoryModule />} />
            <Route path="inventory/:moduleSlug" element={<CRMInventoryModule />} />
            <Route path="customer-search" element={<CRMCustomerSearch />} />
            <Route path="customer-details/:customerId" element={<CRMCustomerDetails />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/crm/workspace" replace />} />
        </Routes>
      )}
    </Router>
  );
}
