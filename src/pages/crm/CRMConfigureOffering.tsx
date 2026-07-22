import { useState, useEffect } from 'react';
import { useTabStore } from '@/store/useTabStore';
import { useToastStore } from '@/store/useToastStore';
import { 
  FolderOpen, 
  FileText, 
  Search, 
  X, 
  ChevronDown, 
  Clock 
} from 'lucide-react';

// Offer Data Model
export interface OfferingItem {
  id: string;
  name: string;
  shortName: string;
  offeringCode: string;
  primaryOffering: string;
  teleType: string;
  ownerType: string;
  offeringPackage: string;
  sellSingly: string;
  offeringType: string;
  paymentFlag: string;
  status: string;
  category: string;
  subCategory: string;
  initialBalance: string;
  monthlyFee: string;
  groupFlag: string;
  offerValueRule: string;
  description: string;
}

// 5 Offerings Dataset
export const OFFERING_DATASET: OfferingItem[] = [
  {
    id: 'S49023',
    name: 'Eid_Special_Offer',
    shortName: 'Offer59',
    offeringCode: 'S49023',
    primaryOffering: 'No',
    teleType: '4G',
    ownerType: 'Subscriber',
    offeringPackage: 'Simple Offering',
    sellSingly: 'Sell Singly',
    offeringType: 'Individual',
    paymentFlag: 'All',
    status: 'Release',
    category: 'Other',
    subCategory: 'Festival Bonus',
    initialBalance: '৳0.00',
    monthlyFee: '৳0.00',
    groupFlag: 'Not Group',
    offerValueRule: 'RULE_EID_2026',
    description: 'Special Eid promotional data & talktime package for subscribers.'
  },
  {
    id: 'S49024',
    name: 'Unlimited_Data_Pack_30D',
    shortName: 'Data30D',
    offeringCode: 'S49024',
    primaryOffering: 'Yes',
    teleType: '4G/5G',
    ownerType: 'Subscriber',
    offeringPackage: 'Data Plus Offering',
    sellSingly: 'Sell Singly',
    offeringType: 'Individual',
    paymentFlag: 'Prepaid',
    status: 'Release',
    category: 'Data Pack',
    subCategory: 'Monthly Unlimited',
    initialBalance: '৳0.00',
    monthlyFee: '৳499.00',
    groupFlag: 'Not Group',
    offerValueRule: 'RULE_DATA_UNLIMITED',
    description: 'High-speed 4G/5G data pack with 30 days validity.'
  },
  {
    id: 'S49025',
    name: 'Postpaid_Corporate_Bundle',
    shortName: 'CorpBundle',
    offeringCode: 'S49025',
    primaryOffering: 'Yes',
    teleType: '4G',
    ownerType: 'Enterprise',
    offeringPackage: 'Corporate Suite',
    sellSingly: 'Sell Singly',
    offeringType: 'Group/Corporate',
    paymentFlag: 'Postpaid',
    status: 'Release',
    category: 'Corporate',
    subCategory: 'Executive Plan',
    initialBalance: '৳500.00',
    monthlyFee: '৳1200.00',
    groupFlag: 'Group',
    offerValueRule: 'RULE_CORP_DEFAULT',
    description: 'Enterprise corporate postpaid bundle with pool sharing.'
  },
  {
    id: 'S49026',
    name: 'Student_Special_Voice_Pack',
    shortName: 'StudentVoice',
    offeringCode: 'S49026',
    primaryOffering: 'No',
    teleType: '3G/4G',
    ownerType: 'Subscriber',
    offeringPackage: 'Campus Pack',
    sellSingly: 'Sell Singly',
    offeringType: 'Individual',
    paymentFlag: 'Prepaid',
    status: 'Release',
    category: 'Voice Pack',
    subCategory: 'Student Offer',
    initialBalance: '৳10.00',
    monthlyFee: '৳49.00',
    groupFlag: 'Not Group',
    offerValueRule: 'RULE_STUDENT_DISCOUNT',
    description: 'Affordable voice call minute pack for student SIM holders.'
  },
  {
    id: 'S49027',
    name: 'Roam_Global_Pass_7D',
    shortName: 'RoamPass',
    offeringCode: 'S49027',
    primaryOffering: 'No',
    teleType: '5G',
    ownerType: 'Subscriber',
    offeringPackage: 'Roaming Package',
    sellSingly: 'Sell Singly',
    offeringType: 'Individual',
    paymentFlag: 'All',
    status: 'Release',
    category: 'Roaming',
    subCategory: 'International Pass',
    initialBalance: '৳0.00',
    monthlyFee: '৳1500.00',
    groupFlag: 'Not Group',
    offerValueRule: 'RULE_ROAM_GLOBAL',
    description: '7-day international roaming data and voice pass across 45 countries.'
  }
];

// Second Layer Header Tabs
const SECOND_LAYER_TABS = [
  { id: 'summary', label: 'Summary' },
  { id: 'basic-info', label: 'Basic Information' },
  { id: 'effective-expiration', label: 'Effective&Expiration' },
  { id: 'elements', label: 'Elements' },
  { id: 'pricing-plan', label: 'Pricing Plan' },
  { id: 'properties', label: 'Properties' },
  { id: 'dependency', label: 'Dependency' },
  { id: 'qualification', label: 'Qualification' },
  { id: 'contract-term', label: 'Contract Term' },
  { id: 'channels', label: 'Channels' },
  { id: 'subscriber', label: 'Subscriber...' }
];

export default function CRMConfigureOffering() {
  const addTab = useTabStore((state) => state.addTab);
  const addToast = useToastStore((state) => state.addToast);
  const [activeSubTab, setActiveSubTab] = useState('basic-info');

  // Tree & Section accordion state
  const [selectedOfferId, setSelectedOfferId] = useState('S49023');
  const [treeSearch, setTreeSearch] = useState('');
  const [isBasicInfoExpanded, setIsBasicInfoExpanded] = useState(true);
  const [isSubscriptionInfoExpanded, setIsSubscriptionInfoExpanded] = useState(true);

  useEffect(() => {
    addTab({
      id: 'configure-offering',
      name: 'Configure Offering',
      path: '/crm/configure-offering',
      isClosable: true
    });
  }, [addTab]);

  const handleTabChange = (tabId: string, label: string) => {
    setActiveSubTab(tabId);
    if (tabId !== 'basic-info') {
      addToast(`Switched to ${label} tab`, 'info');
    }
  };

  // Currently selected offer object
  const currentOffer = OFFERING_DATASET.find(o => o.id === selectedOfferId) || OFFERING_DATASET[0];

  // Filtered tree offers
  const filteredOffers = OFFERING_DATASET.filter(offer => 
    offer.name.toLowerCase().includes(treeSearch.toLowerCase()) ||
    offer.shortName.toLowerCase().includes(treeSearch.toLowerCase()) ||
    offer.id.toLowerCase().includes(treeSearch.toLowerCase())
  );

  const handleSelectOffer = (offer: OfferingItem) => {
    setSelectedOfferId(offer.id);
    addToast(`Selected offering: ${offer.name}`, 'info');
  };

  return (
    <div className="flex flex-col h-full bg-[#f3f4f6] text-xs text-gray-800 -m-5">
      {/* SECOND LAYER HEADER TABS */}
      <div className="bg-[#e4e6e9] border-b border-[#cfd2d7] px-3 pt-1.5 flex items-center overflow-x-auto select-none gap-1">
        {SECOND_LAYER_TABS.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id, tab.label)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t border-t border-x transition-all duration-150 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-blue-800 border-[#cfd2d7] border-b-white z-10 font-bold shadow-xs'
                  : 'bg-[#f0f2f5] hover:bg-white text-gray-700 border-transparent hover:border-[#cfd2d7]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* MIDDLE MAIN CONTENT SECTION */}
      <div className="flex-1 p-3 overflow-y-auto">
        {activeSubTab === 'basic-info' ? (
          <div className="flex flex-col md:flex-row gap-3 min-h-[500px]">
            {/* LEFT TREE SIDEBAR / CATALOG */}
            <div className="w-full md:w-64 bg-white border border-[#cfd2d7] rounded-sm p-2 flex flex-col shrink-0 shadow-xs">
              {/* Search & Advance link */}
              <div className="flex items-center gap-1 mb-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={treeSearch}
                    onChange={(e) => setTreeSearch(e.target.value)}
                    placeholder="Search Offerings..."
                    className="w-full pl-2 pr-6 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:border-blue-500 bg-white"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 top-1.5" />
                </div>
                <button 
                  type="button"
                  onClick={() => addToast('Advanced search filter opened', 'info')}
                  className="text-blue-600 hover:underline text-xs whitespace-nowrap cursor-pointer font-medium"
                >
                  Advance
                </button>
              </div>

              {/* Tree View Box */}
              <div className="flex-1 border border-gray-200 rounded p-2 overflow-y-auto bg-gray-50/50 space-y-1 font-sans">
                {/* Root: Offer Catalog */}
                <div className="flex items-center gap-1.5 text-gray-700 font-medium cursor-pointer py-0.5">
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  <FolderOpen className="w-4 h-4 text-amber-500" />
                  <span>Offer Catalog ({OFFERING_DATASET.length})</span>
                </div>

                {/* Sub 1: INS Supplementary Offerings */}
                <div className="pl-3 flex items-center gap-1.5 text-gray-700 font-medium cursor-pointer py-0.5">
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  <FolderOpen className="w-4 h-4 text-amber-500" />
                  <span>INS Supplementary Offerings</span>
                </div>

                {/* Sub 2: Common */}
                <div className="pl-6 flex items-center gap-1.5 text-gray-700 font-medium cursor-pointer py-0.5">
                  <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                  <FolderOpen className="w-4 h-4 text-amber-500" />
                  <span>Common Offerings ({filteredOffers.length})</span>
                </div>

                {/* Sub 3: Dynamic Offerings List */}
                <div className="pl-9 space-y-1">
                  {filteredOffers.length === 0 ? (
                    <div className="text-[11px] text-gray-400 italic py-1 px-2">
                      No matching offering found
                    </div>
                  ) : (
                    filteredOffers.map((offer) => {
                      const isSelected = offer.id === selectedOfferId;
                      return (
                        <div
                          key={offer.id}
                          onClick={() => handleSelectOffer(offer)}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded cursor-pointer transition-colors text-xs ${
                            isSelected
                              ? 'bg-blue-100 text-blue-900 font-bold border border-blue-300 shadow-2xs'
                              : 'hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <FileText className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-700' : 'text-gray-500'}`} />
                          <span className="truncate">{offer.name}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT DETAILS CONTAINER */}
            <div className="flex-1 space-y-3">
              {/* SECTION 1: BASIC INFO */}
              <div className="border border-[#cfd2d7] bg-white rounded-sm shadow-xs overflow-hidden">
                {/* Accordion Bar */}
                <button
                  type="button"
                  onClick={() => setIsBasicInfoExpanded(!isBasicInfoExpanded)}
                  className="w-full bg-[#e9ecef] hover:bg-[#deefea]/60 px-3 py-1.5 border-b border-[#cfd2d7] flex items-center justify-between font-bold text-gray-800 text-xs transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-blue-600">♦</span>
                    <span>Basic Info - {currentOffer.name}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isBasicInfoExpanded ? '' : '-rotate-90'
                    }`}
                  />
                </button>

                {isBasicInfoExpanded && (
                  <div className="p-3 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
                      {/* Name */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Name
                        </span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.name}
                          className="flex-1 bg-blue-50/60 border border-blue-200 rounded px-2 py-1 text-xs text-blue-900 font-bold"
                        />
                      </div>

                      {/* ID */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">ID</span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.id}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-mono font-semibold"
                        />
                      </div>

                      {/* Short Name */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Short Name
                        </span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.shortName}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-medium"
                        />
                      </div>

                      {/* Offering Code */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Offering Code
                        </span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.offeringCode}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-mono"
                        />
                      </div>

                      {/* Primary Offering */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Primary Offering
                        </span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.primaryOffering}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Tele Type */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Tele Type
                        </span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.teleType}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-semibold"
                        />
                      </div>

                      {/* Owner Type */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Owner Type
                        </span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.ownerType}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Offering Package */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">Offering Package</span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.offeringPackage}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Sell Singly */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Sell Singly
                        </span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.sellSingly}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Offering Type */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Offering Type
                        </span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.offeringType}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Payment Flag */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Payment Flag
                        </span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.paymentFlag}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-semibold"
                        />
                      </div>

                      {/* Status */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">Status</span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.status}
                          className="flex-1 bg-emerald-50 border border-emerald-300 rounded px-2 py-1 text-xs text-emerald-800 font-bold"
                        />
                      </div>

                      {/* Category */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">Category</span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.category}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-medium"
                        />
                      </div>

                      {/* Offering Subcategory */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">Offering Subcategory</span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.subCategory}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Initial Balance (৳) */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">Initial Balance (৳)</span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.initialBalance}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-mono"
                        />
                      </div>

                      {/* Monthly Fee (৳) */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">Monthly Fee (৳)</span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.monthlyFee}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-mono font-semibold"
                        />
                      </div>

                      {/* Group Flag */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">Group Flag</span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.groupFlag}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Offer Value Rule */}
                      <div className="flex items-center">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">Offer Value Rule</span>
                        <div className="flex-1 relative flex items-center">
                          <input
                            type="text"
                            readOnly
                            value={currentOffer.offerValueRule}
                            className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 pr-10 font-mono"
                          />
                          <div className="absolute right-1 flex items-center gap-1 text-gray-400">
                            <Search className="w-3 h-3 cursor-pointer hover:text-gray-600" />
                            <X className="w-3 h-3 cursor-pointer hover:text-gray-600" />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex items-center sm:col-span-2 lg:col-span-3">
                        <span className="w-32 text-gray-600 text-right pr-2 shrink-0">Description</span>
                        <input
                          type="text"
                          readOnly
                          value={currentOffer.description}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: SUBSCRIPTION INFO */}
              <div className="border border-[#cfd2d7] bg-white rounded-sm shadow-xs overflow-hidden">
                {/* Accordion Bar */}
                <button
                  type="button"
                  onClick={() => setIsSubscriptionInfoExpanded(!isSubscriptionInfoExpanded)}
                  className="w-full bg-[#e9ecef] hover:bg-[#deefea]/60 px-3 py-1.5 border-b border-[#cfd2d7] flex items-center justify-between font-bold text-gray-800 text-xs transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-blue-600">♦</span>
                    <span>Subscription Info</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                      isSubscriptionInfoExpanded ? '' : '-rotate-90'
                    }`}
                  />
                </button>

                {isSubscriptionInfoExpanded && (
                  <div className="p-3 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
                      {/* Allow Repeated Subscription */}
                      <div className="flex items-center">
                        <span className="w-36 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Allow Repeated Subscription
                        </span>
                        <input
                          type="text"
                          readOnly
                          value="Yes"
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Max. Subscription Times */}
                      <div className="flex items-center">
                        <span className="w-36 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Max. Subscription Times
                        </span>
                        <input
                          type="text"
                          readOnly
                          value="50"
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Continue Mode */}
                      <div className="flex items-center">
                        <span className="w-36 text-gray-600 text-right pr-2 shrink-0">
                          <span className="text-red-500 font-bold">* </span>Continue Mode
                        </span>
                        <input
                          type="text"
                          readOnly
                          value="Direct Add Up"
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Period Unit */}
                      <div className="flex items-center">
                        <span className="w-36 text-gray-600 text-right pr-2 shrink-0">Period Unit</span>
                        <input
                          type="text"
                          readOnly
                          value="Days"
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Period Value */}
                      <div className="flex items-center">
                        <span className="w-36 text-gray-600 text-right pr-2 shrink-0">Period Value</span>
                        <input
                          type="text"
                          readOnly
                          value="30"
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Period Subscription Times */}
                      <div className="flex items-center">
                        <span className="w-36 text-gray-600 text-right pr-2 shrink-0">Period Subscription Times</span>
                        <input
                          type="text"
                          readOnly
                          value="10"
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800"
                        />
                      </div>

                      {/* Brand */}
                      <div className="flex items-center">
                        <span className="w-36 text-gray-600 text-right pr-2 shrink-0">Brand</span>
                        <input
                          type="text"
                          readOnly
                          value="Teletalk Mobile"
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-medium"
                        />
                      </div>

                      {/* Sales Catalog */}
                      <div className="flex items-center sm:col-span-2">
                        <span className="w-36 text-gray-600 text-right pr-2 shrink-0">Sales Catalog</span>
                        <input
                          type="text"
                          readOnly
                          value={`Gallery->Sales Catalog->Supplementary Offerings Sale->${currentOffer.category}`}
                          className="flex-1 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* COMING SOON UI FOR OTHER SECOND LAYER HEADER TABS */
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white border border-[#cfd2d7] rounded-sm p-8 text-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 shadow-sm animate-pulse">
              <Clock className="w-8 h-8" />
            </div>
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-wider uppercase mb-2">
              Coming Soon
            </span>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {SECOND_LAYER_TABS.find((t) => t.id === activeSubTab)?.label} Configuration
            </h3>
            <p className="text-gray-500 max-w-md text-xs mb-6">
              This configuration tab is under development. All settings for {SECOND_LAYER_TABS.find((t) => t.id === activeSubTab)?.label} will be enabled in the next release.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveSubTab('basic-info')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Back to Basic Information
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
