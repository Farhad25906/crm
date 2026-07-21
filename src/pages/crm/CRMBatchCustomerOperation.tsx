import { useEffect } from 'react';
import { useTabStore } from '@/store/useTabStore';
import { Play, RotateCcw } from 'lucide-react';

export default function CRMBatchCustomerOperation() {
  const addTab = useTabStore((state) => state.addTab);

  useEffect(() => {
    addTab({
      id: 'batch-customer-operation',
      name: 'Batch for Customer Operation',
      path: '/crm/batch-customer-operation',
      isClosable: true
    });
  }, [addTab]);

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <div className="text-[11px] text-gray-500 font-medium">
        Home &gt; Customer &gt; Batch Operations
      </div>

      <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
        <div className="bg-[#e9ecef] border-b border-[#cfd2d7] px-4 py-1.5 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-2xs inline-block"></span>
          <span className="text-xs font-bold text-gray-800">Batch Operation Tasks</span>
        </div>

        <div className="p-6 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 border border-cyan-100 mx-auto">
            ⚙️
          </div>
          <h3 className="text-sm font-bold text-gray-800">Batch for Customer Operation</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Execute mass profile adjustments, billing plan updates, or bulk resource provisioning for groups of customers. Upload a standard operation CSV template below to run in the background.
          </p>

          <div className="border border-dashed border-gray-300 rounded p-6 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer text-xs">
            <span className="text-blue-600 font-semibold hover:underline">Click to upload csv file</span>
            <span className="text-gray-400 block mt-1">Maximum file size: 10MB</span>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => alert('Batch operation triggered')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-xs px-4 py-1 text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Execute Batch</span>
            </button>
            <button
              onClick={() => alert('Form reset')}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-xs px-4 py-1 text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
