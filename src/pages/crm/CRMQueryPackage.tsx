import { useEffect, useState } from 'react';
import { useTabStore } from '@/store/useTabStore';
import { Search } from 'lucide-react';

export default function CRMQueryPackage() {
  const addTab = useTabStore((state) => state.addTab);
  
  const [packageType, setPackageType] = useState('All');
  const [packingTag, setPackingTag] = useState('');
  const [hasQueried, setHasQueried] = useState(true);

  useEffect(() => {
    addTab({
      id: 'query-package',
      name: 'Query Package',
      path: '/crm/query-package',
      isClosable: true
    });
  }, [addTab]);

  const mockPackages = [
    {
      be: 'MVNE',
      tag: '157010053gggddfff',
      type: 'StartPack',
      itemCode: 'DataPack',
      pool: 'Trading',
      paymentMode: 'Prepaid',
      telecomType: '4G',
      dept: '3.1 CACTeletalk',
      status: 'Normal'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <div className="text-[11px] text-gray-500 font-medium">
        Home &gt; Inventory &gt; Query &gt; Query Package
      </div>

      {/* SEARCH PANEL */}
      <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
        <div className="bg-[#e9ecef] border-b border-[#cfd2d7] px-4 py-1.5 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-2xs inline-block"></span>
          <span className="text-xs font-bold text-gray-800">Query Package Conditions</span>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setHasQueried(true); }} className="p-4 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-700 whitespace-nowrap">Package Type</label>
              <select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none min-w-[150px]"
              >
                <option value="All">All</option>
                <option value="StartPack">StartPack</option>
                <option value="OptionPack">OptionPack</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-medium text-gray-700 whitespace-nowrap">Packing Tag</label>
              <input
                type="text"
                value={packingTag}
                onChange={(e) => setPackingTag(e.target.value)}
                className="border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none min-w-[200px]"
                placeholder="Enter Packing Tag"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-b from-[#ffffff] to-[#e6e6e6] hover:from-[#f3f3f3] hover:to-[#dbdbdb] border border-[#adadad] rounded-sm text-gray-800 px-6 py-0.5 text-xs font-semibold shadow-2xs h-6 cursor-pointer"
          >
            Query
          </button>
        </form>
      </div>

      {/* RESULTS TABLE */}
      {hasQueried && (
        <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#f0f2f5] text-gray-700 font-bold border-b border-[#cfd2d7] divide-x divide-gray-300">
                  <th className="px-3 py-2 font-semibold">BE</th>
                  <th className="px-3 py-2 font-semibold">Packing Tag</th>
                  <th className="px-3 py-2 font-semibold">Package Type</th>
                  <th className="px-3 py-2 font-semibold">Item Code</th>
                  <th className="px-3 py-2 font-semibold">Pool</th>
                  <th className="px-3 py-2 font-semibold">Payment Mode</th>
                  <th className="px-3 py-2 font-semibold">Telecom Type</th>
                  <th className="px-3 py-2 font-semibold">Dept</th>
                  <th className="px-3 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockPackages.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 divide-x divide-gray-200 text-gray-700">
                    <td className="px-3 py-2.5">{row.be}</td>
                    <td className="px-3 py-2.5 font-medium">{row.tag}</td>
                    <td className="px-3 py-2.5">{row.type}</td>
                    <td className="px-3 py-2.5">{row.itemCode}</td>
                    <td className="px-3 py-2.5">{row.pool}</td>
                    <td className="px-3 py-2.5">{row.paymentMode}</td>
                    <td className="px-3 py-2.5">{row.telecomType}</td>
                    <td className="px-3 py-2.5 text-gray-600">{row.dept}</td>
                    <td className="px-3 py-2.5">
                      <span className="text-gray-900 font-semibold">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#eef1f5] border-t border-[#cfd2d7] px-4 py-2 flex items-center justify-between text-xs text-gray-700">
            <div>Total Records: {mockPackages.length}</div>
            <div className="text-gray-500">Page 1 of 1</div>
          </div>
        </div>
      )}
    </div>
  );
}
