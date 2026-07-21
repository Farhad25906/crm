import { useEffect, useState } from 'react';
import { useTabStore } from '@/store/useTabStore';
import { ChevronDown } from 'lucide-react';

export default function CRMResourceInventory() {
  const addTab = useTabStore((state) => state.addTab);
  
  // Search Conditions
  const [resourceType, setResourceType] = useState<'RUIM' | 'MSISDN'>('RUIM');
  const [iccid, setIccid] = useState('89880040925405599993');
  const [mdn, setMdn] = useState('1575895803');
  const [special, setSpecial] = useState(true);
  
  // Query Result State
  const [activeQueryType, setActiveQueryType] = useState<'RUIM' | 'MSISDN'>('RUIM');
  const [hasQueried, setHasQueried] = useState(true);

  useEffect(() => {
    addTab({
      id: 'resource-inventory',
      name: 'Resource Inventory',
      path: '/crm/resource-inventory',
      isClosable: true
    });
  }, [addTab]);

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQueryType(resourceType);
    setHasQueried(true);
  };

  // Mock data matching screenshots
  const ruimData = [
    {
      be: 'MVNE',
      iccid: '89880040925405599993',
      itemCodeName: 'Sim card 64K',
      pool: 'Trading',
      dept: '2.1 Resource Readiness(Warehouse HQ)',
      status: 'Normal',
      imsi: '470046040559999',
      puk2: '*********',
      pin2: '****',
      puk1: '*********',
      pin1: '****',
      area: 'STANDARD',
      areaCode: 'ZTE HLR',
      vendor: 'GEMPLUS'
    }
  ];

  const msisdnData = [
    {
      be: 'MVNE',
      mdn: '1575895803',
      itemCodeName: 'MSISDN',
      level: 'test',
      pool: 'Trading',
      dept: '2.1 Resource Readiness(Warehouse HQ)',
      status: 'Normal',
      mnpStatus: 'Normal',
      area: 'STANDARD',
      areaCode: 'ZTE HLR'
    }
  ];

  const handleExport = () => {
    alert('Data exported successfully to CSV format!');
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <div className="text-[11px] text-gray-500 font-medium">
        Home &gt; Inventory &gt; Query &gt; Resource Inventory
      </div>

      {/* SEARCH CONDITIONS PANEL */}
      <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
        
        {/* Title Bar */}
        <div className="bg-[#e9ecef] border-b border-[#cfd2d7] px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-2xs inline-block"></span>
            <span className="text-xs font-bold text-gray-800">Search Condition</span>
          </div>
          <label className="flex items-center gap-1 text-xs font-semibold text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={special}
              onChange={(e) => setSpecial(e.target.checked)}
              className="accent-blue-600 cursor-pointer"
            />
            <span>Special</span>
          </label>
        </div>

        {/* Form Body */}
        <form onSubmit={handleQuery} className="p-4 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          
          <div className="flex flex-wrap items-center gap-6">
            {/* Resource Type */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-700 whitespace-nowrap flex items-center">
                <span className="text-red-600 mr-1">*</span>Resource Type
              </label>
              <select
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value as 'RUIM' | 'MSISDN')}
                className="border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500 min-w-[150px]"
              >
                <option value="RUIM">RUIM</option>
                <option value="MSISDN">MSISDN</option>
              </select>
            </div>

            {/* Dynamic input field */}
            {resourceType === 'RUIM' ? (
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-700 whitespace-nowrap flex items-center">
                  <span className="text-red-600 mr-1">*</span>ICCID
                </label>
                <input
                  type="text"
                  value={iccid}
                  onChange={(e) => setIccid(e.target.value)}
                  className="border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500 min-w-[200px]"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-gray-700 whitespace-nowrap flex items-center">
                  <span className="text-red-600 mr-1">*</span>MDN
                </label>
                <input
                  type="text"
                  value={mdn}
                  onChange={(e) => setMdn(e.target.value)}
                  className="border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500 min-w-[200px]"
                />
              </div>
            )}
          </div>

          {/* Action button */}
          <button
            type="submit"
            className="bg-gradient-to-b from-[#ffffff] to-[#e6e6e6] hover:from-[#f3f3f3] hover:to-[#dbdbdb] active:from-[#dcdcdc] border border-[#adadad] rounded-sm text-gray-800 px-6 py-0.5 text-xs font-semibold shadow-2xs h-6 cursor-pointer self-end md:self-center"
          >
            Query
          </button>
        </form>
      </div>

      {/* EXPORT AND RESULTS TABLE */}
      {hasQueried && (
        <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
          
          {/* Table Header Action Bar */}
          <div className="bg-[#f0f2f5] border-b border-[#cfd2d7] px-3 py-1 flex items-center justify-between">
            <button
              onClick={handleExport}
              className="bg-gradient-to-b from-white to-[#f0f0f0] border border-[#ccc] hover:bg-[#e6e6e6] rounded-xs px-2.5 py-0.5 text-xs text-gray-700 flex items-center gap-1 shadow-3xs cursor-pointer font-medium"
            >
              <span>Export</span>
              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>
          </div>

          {/* Scrollable Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f0f2f5] text-gray-700 font-bold border-b border-[#cfd2d7] divide-x divide-gray-300">
                  {activeQueryType === 'RUIM' ? (
                    <>
                      <th className="px-3 py-2 font-semibold">BE^</th>
                      <th className="px-3 py-2 font-semibold">ICCID^</th>
                      <th className="px-3 py-2 font-semibold">Item Code Name^</th>
                      <th className="px-3 py-2 font-semibold">Pool^</th>
                      <th className="px-3 py-2 font-semibold">Dept.^</th>
                      <th className="px-3 py-2 font-semibold">Status^</th>
                      <th className="px-3 py-2 font-semibold">IMSI^</th>
                      <th className="px-3 py-2 font-semibold">PUK2^</th>
                      <th className="px-3 py-2 font-semibold">PIN2^</th>
                      <th className="px-3 py-2 font-semibold">PUK1^</th>
                      <th className="px-3 py-2 font-semibold">PIN1^</th>
                      <th className="px-3 py-2 font-semibold">Area^</th>
                      <th className="px-3 py-2 font-semibold">Area Code^</th>
                      <th className="px-3 py-2 font-semibold font-bold">Vendor^</th>
                    </>
                  ) : (
                    <>
                      <th className="px-3 py-2 font-semibold">BE^</th>
                      <th className="px-3 py-2 font-semibold">MDN^</th>
                      <th className="px-3 py-2 font-semibold">Item Code Name^</th>
                      <th className="px-3 py-2 font-semibold">Level^</th>
                      <th className="px-3 py-2 font-semibold font-bold">Pool^</th>
                      <th className="px-3 py-2 font-semibold">Dept.^</th>
                      <th className="px-3 py-2 font-semibold">Status^</th>
                      <th className="px-3 py-2 font-semibold font-bold">MNP Status^</th>
                      <th className="px-3 py-2 font-semibold">Area^</th>
                      <th className="px-3 py-2 font-semibold">Area Code^</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activeQueryType === 'RUIM' ? (
                  ruimData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 divide-x divide-gray-200 text-gray-700">
                      <td className="px-3 py-2.5">{row.be}</td>
                      <td className="px-3 py-2.5 font-medium">{row.iccid}</td>
                      <td className="px-3 py-2.5">{row.itemCodeName}</td>
                      <td className="px-3 py-2.5">{row.pool}</td>
                      <td className="px-3 py-2.5 text-gray-600">{row.dept}</td>
                      <td className="px-3 py-2.5">
                        <span className="text-gray-900 font-semibold">{row.status}</span>
                      </td>
                      <td className="px-3 py-2.5">{row.imsi}</td>
                      <td className="px-3 py-2.5 font-mono text-gray-400">{row.puk2}</td>
                      <td className="px-3 py-2.5 font-mono text-gray-400">{row.pin2}</td>
                      <td className="px-3 py-2.5 font-mono text-gray-400">{row.puk1}</td>
                      <td className="px-3 py-2.5 font-mono text-gray-400">{row.pin1}</td>
                      <td className="px-3 py-2.5">{row.area}</td>
                      <td className="px-3 py-2.5 font-medium text-blue-700">{row.areaCode}</td>
                      <td className="px-3 py-2.5 font-semibold text-gray-800">{row.vendor}</td>
                    </tr>
                  ))
                ) : (
                  msisdnData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 divide-x divide-gray-200 text-gray-700">
                      <td className="px-3 py-2.5">{row.be}</td>
                      <td className="px-3 py-2.5 font-medium">{row.mdn}</td>
                      <td className="px-3 py-2.5">{row.itemCodeName}</td>
                      <td className="px-3 py-2.5 text-gray-600">{row.level}</td>
                      <td className="px-3 py-2.5">{row.pool}</td>
                      <td className="px-3 py-2.5 text-gray-600">{row.dept}</td>
                      <td className="px-3 py-2.5">
                        <span className="text-gray-900 font-semibold">{row.status}</span>
                      </td>
                      <td className="px-3 py-2.5">{row.mnpStatus}</td>
                      <td className="px-3 py-2.5">{row.area}</td>
                      <td className="px-3 py-2.5 font-medium text-blue-700">{row.areaCode}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="bg-[#eef1f5] border-t border-[#cfd2d7] px-4 py-2 flex items-center justify-between text-xs text-gray-700 select-none">
            <div>
              Total Records: {activeQueryType === 'RUIM' ? ruimData.length : msisdnData.length}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <select className="border border-gray-300 rounded-sm bg-white px-1 py-0.5 text-xs outline-none">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
                <span>Records</span>
              </div>

              <div className="flex items-center border border-gray-300 rounded-sm bg-white divide-x divide-gray-300">
                <button type="button" className="px-2 py-0.5 hover:bg-gray-100 font-bold cursor-pointer" disabled>|&lt;</button>
                <button type="button" className="px-2 py-0.5 hover:bg-gray-100 font-bold cursor-pointer" disabled>&lt;</button>
                <div className="px-3 py-0.5 bg-gray-50 flex items-center gap-1">
                  <input type="text" defaultValue="1" className="w-5 text-center border border-gray-300 rounded-sm text-xs bg-white py-0.5" />
                  <span>/ 1</span>
                  <button type="button" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xs px-2 py-0.5 text-xs font-semibold">Go</button>
                </div>
                <button type="button" className="px-2 py-0.5 hover:bg-gray-100 font-bold cursor-pointer" disabled>&gt;</button>
                <button type="button" className="px-2 py-0.5 hover:bg-gray-100 font-bold cursor-pointer" disabled>&gt;|</button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
