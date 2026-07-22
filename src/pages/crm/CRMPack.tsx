import { useEffect, useState, useRef } from 'react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';
import { FolderOpen, Trash2, MessageSquare } from 'lucide-react';

export default function CRMPack() {
  const addTab = useTabStore((state) => state.addTab);
  const addToast = useToastStore((state) => state.addToast);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form States
  const [packageType, setPackageType] = useState('StartPack');
  const [itemCode, setItemCode] = useState('DataPack');
  const [pool, setPool] = useState('Trading');
  const [paymentMode, setPaymentMode] = useState('Prepaid');
  const [area, setArea] = useState('STANDARD');
  const [areaCode, setAreaCode] = useState('ZTE HLR');
  const [telecomType, setTelecomType] = useState('4G');
  const [dept, setDept] = useState('3.1 CACTeletalk');
  const [packingTag, setPackingTag] = useState('157010053gggddfff');
  const [packingMode, setPackingMode] = useState<'Auto' | 'Manual' | 'File'>('File');
  const [filePath, setFilePath] = useState('C:\\fakepath\\new_num_only_20260619.txt');

  useEffect(() => {
    addTab({
      id: 'pack',
      name: 'Pack',
      path: '/crm/pack',
      isClosable: true
    });
  }, [addTab]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const newPath = `C:\\fakepath\\${selectedFile.name}`;
      setFilePath(newPath);
      addToast(`Pack file uploaded: ${selectedFile.name}`, 'success');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Package packed successfully! Tag: ${packingTag}`, 'success');
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <div className="text-[11px] text-gray-500 font-medium">
        Home &gt; Inventory &gt; Package &gt; Pack
      </div>

      {/* Main Container */}
      <div className="border border-[#cfd2d7] rounded-sm bg-white shadow-xs overflow-hidden">
        
        {/* Title bar */}
        <div className="bg-[#e9ecef] border-b border-[#cfd2d7] px-4 py-1.5 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-red-600 rounded-2xs inline-block"></span>
          <span className="text-xs font-bold text-gray-800">Package</span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 max-w-4xl space-y-3.5">
          
          {/* Package Type */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Package Type
            </label>
            <div className="col-span-9">
              <select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="StartPack">StartPack</option>
                <option value="OptionPack">OptionPack</option>
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
                <option value="DataPack">DataPack</option>
                <option value="VoicePack">VoicePack</option>
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

          {/* Payment Mode */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Payment Mode
            </label>
            <div className="col-span-9">
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="Prepaid">Prepaid</option>
                <option value="Postpaid">Postpaid</option>
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

          {/* Telecom Type */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Telecom Type
            </label>
            <div className="col-span-9">
              <select
                value={telecomType}
                onChange={(e) => setTelecomType(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="4G">4G</option>
                <option value="3G">3G</option>
                <option value="5G">5G</option>
              </select>
            </div>
          </div>

          {/* Dept. */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              Dept.
            </label>
            <div className="col-span-9">
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-white px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500"
              >
                <option value="3.1 CACTeletalk">3.1 CACTeletalk</option>
                <option value="2.1 Resource Readiness(Warehouse HQ)">2.1 Resource Readiness(Warehouse HQ)</option>
              </select>
            </div>
          </div>

          {/* Packing Tag */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              <span className="text-red-600 mr-1">*</span>Packing Tag
            </label>
            <div className="col-span-9">
              <input
                type="text"
                value={packingTag}
                onChange={(e) => setPackingTag(e.target.value)}
                className="w-full max-w-xl border border-gray-300 rounded-sm bg-[#fffdf0] px-2 py-0.5 text-xs h-6 outline-none focus:border-cyan-500 font-semibold"
              />
            </div>
          </div>

          {/* Packing Mode */}
          <div className="grid grid-cols-12 items-center gap-3">
            <label className="col-span-3 text-xs font-medium text-gray-700 text-left flex items-center">
              Packing Mode
            </label>
            <div className="col-span-9 flex items-center gap-6 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="packingMode"
                  checked={packingMode === 'Auto'}
                  onChange={() => setPackingMode('Auto')}
                  className="accent-blue-600 cursor-pointer"
                />
                <span>Auto</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="packingMode"
                  checked={packingMode === 'Manual'}
                  onChange={() => setPackingMode('Manual')}
                  className="accent-blue-600 cursor-pointer"
                />
                <span>Manual</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="packingMode"
                  checked={packingMode === 'File'}
                  onChange={() => setPackingMode('File')}
                  className="accent-blue-600 cursor-pointer"
                />
                <span>File</span>
              </label>
            </div>
          </div>

          {/* File Upload Input */}
          {packingMode === 'File' && (
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
                  onClick={() => addToast('Displaying packing instruction rules...', 'info')}
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
                className="bg-gradient-to-b from-[#ffffff] to-[#e6e6e6] hover:from-[#f3f3f3] hover:to-[#dbdbdb] active:from-[#dcdcdc] border border-[#adadad] rounded-sm text-gray-800 px-6 py-1 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              >
                Package
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
