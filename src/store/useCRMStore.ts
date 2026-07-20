import { create } from 'zustand';

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  type: 'Prepaid' | 'Postpaid';
  accountStatus: string;
  simStatus: string;
  iccid: string;
}

export interface Package {
  id: string;
  customerId: string;
  internet: string;
  voice: string;
  sms: string;
  bonusBalance: number;
  expiryDate: string;
}

export interface Balance {
  id: string;
  customerId: string;
  mainBalance: number;
  bonusBalance: number;
}

export interface RechargeHistory {
  id: string;
  customerId: string;
  date: string;
  amount: number;
}

export interface Order {
  id: string;
  customerId: string;
  type: string;
  status: string;
}

export interface Complaint {
  id: string;
  customerId: string;
  category: string;
  status: string;
}

interface CRMStore {
  customers: Customer[];
  packages: Package[];
  balances: Balance[];
  rechargeHistory: RechargeHistory[];
  orders: Order[];
  complaints: Complaint[];
  currentCustomer: Customer | null;
  setCurrentCustomer: (customer: Customer | null) => void;
  searchCustomerByMobile: (mobile: string) => Customer | undefined;
  isLoggedIn: boolean;
  selectedSystem: 'cbs' | 'crm' | null;
  login: () => void;
  selectSystem: (system: 'cbs' | 'crm') => void;
  logout: () => void;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    mobile: '01712345678',
    type: 'Prepaid',
    accountStatus: 'Active',
    simStatus: 'Active',
    iccid: '8988012345678901234'
  },
  {
    id: '2',
    name: 'Jane Smith',
    mobile: '01812345678',
    type: 'Postpaid',
    accountStatus: 'Active',
    simStatus: 'Active',
    iccid: '8988012345678901235'
  }
];

const mockPackages: Package[] = [
  {
    id: '1',
    customerId: '1',
    internet: '10 GB',
    voice: '500 mins',
    sms: '200 SMS',
    bonusBalance: 50,
    expiryDate: '2026-08-20'
  }
];

const mockBalances: Balance[] = [
  {
    id: '1',
    customerId: '1',
    mainBalance: 150.50,
    bonusBalance: 25.75
  }
];

const mockRechargeHistory: RechargeHistory[] = [
  { id: '1', customerId: '1', date: '2026-07-15', amount: 100 },
  { id: '2', customerId: '1', date: '2026-07-05', amount: 50 }
];

const mockOrders: Order[] = [
  { id: 'ORD001', customerId: '1', type: 'SIM Replacement', status: 'Processing' },
  { id: 'ORD002', customerId: '1', type: 'Package Change', status: 'Completed' }
];

const mockComplaints: Complaint[] = [
  { id: 'CMP001', customerId: '1', category: 'Network Issue', status: 'Resolved' },
  { id: 'CMP002', customerId: '1', category: 'Billing Issue', status: 'Pending' }
];

export const useCRMStore = create<CRMStore>((set, get) => ({
  customers: mockCustomers,
  packages: mockPackages,
  balances: mockBalances,
  rechargeHistory: mockRechargeHistory,
  orders: mockOrders,
  complaints: mockComplaints,
  currentCustomer: null,
  isLoggedIn: false,
  selectedSystem: null,
  setCurrentCustomer: (customer) => set({ currentCustomer: customer }),
  searchCustomerByMobile: (mobile) => {
    const { customers } = get();
    return customers.find(c => c.mobile === mobile);
  },
  login: () => set({ isLoggedIn: true }),
  selectSystem: (system) => set({ selectedSystem: system }),
  logout: () => set({ isLoggedIn: false, selectedSystem: null, currentCustomer: null })
}));
