import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';

export default function CRMSiteMap() {
  const navigate = useNavigate();
  const addTab = useTabStore((state) => state.addTab);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    addTab({
      id: 'site-map',
      name: 'Site Map',
      path: '/crm/site-map',
      isClosable: true
    });
  }, [addTab]);

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

  // Specific custom route mappings
  const customRouteMap: Record<string, string> = {
    'Receive Resource': '/crm/receive-resource',
    'Resource Inventory': '/crm/resource-inventory',
    'Query Package': '/crm/query-package',
    'Pack': '/crm/pack'
  };

  const handleLinkClick = (item: string) => {
    const slug = item.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const route = customRouteMap[item] || `/crm/inventory/${slug}`;
    const tabId = customRouteMap[item] ? route.split('/').pop() || slug : `inv-${slug}`;

    addToast(`Opening module: ${item}...`, 'info');
    
    addTab({
      id: tabId,
      name: item,
      path: route,
      isClosable: true
    });

    navigate(route);
  };

  return (
    <div className="space-y-4">
      {/* Grid of Sections */}
      <div className="border border-[#cfd2d7] rounded-sm shadow-xs overflow-hidden">
        {inventorySections.map((section) => (
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
                      className="px-4 py-2.5 border-r last:border-r-0 border-gray-200 text-xs flex items-center justify-between min-h-[38px]"
                    >
                      {item ? (
                        <button 
                          onClick={() => handleLinkClick(item)}
                          className="text-blue-700 hover:text-blue-900 hover:underline font-medium text-left transition-colors cursor-pointer"
                        >
                          {item}
                        </button>
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
  );
}
