import { useEffect, useState, useRef } from 'react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';
import { Calendar, FolderOpen, Trash2, MessageSquare } from 'lucide-react';

export default function CRMReceiveResource() {
  const addTab = useTabStore((state) => state.addTab);
  const addToast = useToastStore((state) => state.addToast);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form States
  const [resourceType, setResourceType] = useState('MSISDN');
  const [itemCode, setItemCode] = useState('MSISDN');
  const [area, setArea] = useState('STANDARD');
  const [areaCode, setAreaCode] = useState('ZTE HLR');
  const [pool, setPool] = useState('Trading');
  const [warehouse, setWarehouse] = useState('2.1 Resource Readiness(Warehouse HQ)');
  const [telecomType, setTelecomType] = useState('4G');
  const [prefix, setPrefix] = useState('157');
  const [paymentMode, setPaymentMode] = useState('Prepaid');
  const [mode, setMode] = useState<'File' | 'Range'>('File');
  const [filePath, setFilePath] = useState('C:\\fakepath\\new_num_only_20260619.txt');

  useEffect(() => {
    addTab({
      id: 'receive-resource',
      name: 'Receive Resource',
      path: '/crm/receive-resource',
      isClosable: true
    });
  }, [addTab]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const newPath = `C:\\fakepath\\${selectedFile.name}`;
      setFilePath(newPath);
      addToast(`File uploaded: ${selectedFile.name}`, 'success');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Resource collection received successfully! Warehouse: ${warehouse}`, 'success');
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb path */}
      <div className="text-[11px] text-gray-500 font-medium">
        Home &gt; Inventory &gt; Stock &gt; Receive Resource
      </div>

      {/* Main Container */}
      <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
        
        {/* Title bar */}
        <div className="bg-[#e9ecef] border-b border-[#cfd2d7] px-4 py-1.5 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-2xs inline-block"></span>
          <span className="text-xs font-bold text-gray-800">Receive Resource</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 max-w-4xl space-y-3.5">
          
          {/* Resource Type */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Resource Type
            </label>
            <div className="col-span-9">
              <select
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="MSISDN">MSISDN</option>
                <option value="RUIM">RUIM</option>
              </select>
            </div>
          </div>

          {/* Item Code */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Item Code
            </label>
            <div className="col-span-9">
              <select
                value={itemCode}
                onChange={(e) => setItemCode(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="MSISDN">MSISDN</option>
                <option value="SIM">SIM card 64K</option>
              </select>
            </div>
          </div>

          {/* Area */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Area
            </label>
            <div className="col-span-9">
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="STANDARD">STANDARD</option>
                <option value="PREMIUM">PREMIUM</option>
              </select>
            </div>
          </div>

          {/* Area Code */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Area Code
            </label>
            <div className="col-span-9">
              <select
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="ZTE HLR">ZTE HLR</option>
                <option value="HUAWEI HLR">HUAWEI HLR</option>
              </select>
            </div>
          </div>

          {/* Pool */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Pool
            </label>
            <div className="col-span-9">
              <select
                value={pool}
                onChange={(e) => setPool(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="Trading">Trading</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
          </div>

          {/* Warehouse */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Warehouse
            </label>
            <div className="col-span-9">
              <select
                value={warehouse}
                onChange={(e) => setWarehouse(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="2.1 Resource Readiness(Warehouse HQ)">2.1 Resource Readiness(Warehouse HQ)</option>
                <option value="2.2 Region Warehouse">2.2 Region Warehouse</option>
              </select>
            </div>
          </div>

          {/* Telecom Type */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              Telecom Type
            </label>
            <div className="col-span-9">
              <select
                value={telecomType}
                onChange={(e) => setTelecomType(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="4G">4G</option>
                <option value="3G">3G</option>
                <option value="5G">5G</option>
              </select>
            </div>
          </div>

          {/* Prefix */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Prefix
            </label>
            <div className="col-span-9 flex items-center gap-2">
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full max-w-md border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="157">157</option>
                <option value="158">158</option>
                <option value="159">159</option>
              </select>
              <button 
                type="button"
                className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-600 rounded-sm px-3.5 py-0.5 text-xs font-semibold shadow-2xs h-6 cursor-pointer"
                onClick={() => addToast(`Prefix details loaded for prefix: ${prefix}`, 'info')}
              >
                Details
              </button>
            </div>
          </div>

          {/* Payment Mode */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              Payment Mode
            </label>
            <div className="col-span-9">
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="Prepaid">Prepaid</option>
                <option value="Postpaid">Postpaid</option>
              </select>
            </div>
          </div>

          {/* Receive Resource Date */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              Receive Resource Date
            </label>
            <div className="col-span-9 flex items-center max-w-xl border border-gray-300 rounded-sm bg-gray-100 px-2 py-0.5 h-6 text-xs select-none">
              <span className="flex-1 text-gray-500">2026-07-19 14:20:14</span>
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {/* Mode */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              Mode
            </label>
            <div className="col-span-9 flex items-center gap-6 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === 'File'}
                  onChange={() => setMode('File')}
                  className="accent-blue-600 cursor-pointer"
                />
                <span>File</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === 'Range'}
                  onChange={() => setMode('Range')}
                  className="accent-blue-600 cursor-pointer"
                />
                <span>Range</span>
              </label>
            </div>
          </div>

          {/* File Upload Input */}
          {mode === 'File' && (
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
                <span className="text-red-600 mr-1">*</span>File
              </label>
              <div className="col-span-9 flex items-center gap-1.5 w-full max-w-xl">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <input
                  type="text"
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
                  placeholder="No file chosen"
                  className="flex-1 border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload File"
                  className="w-6 h-6 border border-gray-300 rounded-sm bg-gray-50 flex items-center justify-center hover:bg-gray-100 cursor-pointer shrink-0"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-cyan-600" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilePath('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                    addToast('File path cleared', 'info');
                  }}
                  title="Clear File"
                  className="w-6 h-6 border border-gray-300 rounded-sm bg-gray-50 flex items-center justify-center hover:bg-gray-100 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                </button>
                <button
                  type="button"
                  onClick={() => addToast('Displaying resource file instructions...', 'info')}
                  title="Instructions"
                  className="w-6 h-6 border border-gray-300 rounded-sm bg-gray-50 flex items-center justify-center hover:bg-gray-100 cursor-pointer shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="pt-4 grid grid-cols-12 gap-3">
            <div className="col-span-3"></div>
            <div className="col-span-9">
              <button
                type="submit"
                className="bg-gradient-to-b from-[#ffffff] to-[#e6e6e6] hover:from-[#f3f3f3] hover:to-[#dbdbdb] active:from-[#dcdcdc] border border-[#adadad] rounded-sm text-gray-800 px-4 py-1 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              >
                Receive Resource
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
