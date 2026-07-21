export interface RechargeRecord {
  serviceNo: string;
  batchNo: string;
  serialNo: string;
  paymentMode: string;
  rechargeDate: string;
  balanceBefore: string;
  balanceAfter: string;
  rechargeFee: string;
}

export interface CustomerRecord {
  id: string;
  serviceNo: string;
  fullName: string;
  idNumber: string;
  accountNo: string;
  paymentFlag: 'Prepaid' | 'Postpaid';
  status: 'Active' | 'Locked' | 'Suspended';
  primaryOffering: string;
  coreBalance: string;
  promoBalance: string;
  unbilledAmount: string;
  outstandingBill: string;
  freeBytesLimit: string;
  freeBytesUsed: string;
  freeBytesLeft: string;
  paymentDueDate: string;
  availableFreeMinutes: string;
  residualVolume: string;
  ppsCoreBalance: string;
  billingGroup: string;
  effectivePaymentMethod: string;
  residualSmsVolume: string;
  validTime: string;
  ppsCoreBalanceValidTime: string;
  rechargeLogs: RechargeRecord[];
}

export const CUSTOMER_DATASET: CustomerRecord[] = [
  {
    id: 'cust-1',
    serviceNo: '1575851306',
    fullName: 'NESHAD AHMED SUPTO',
    idNumber: '1995827391024',
    accountNo: '15322618',
    paymentFlag: 'Prepaid',
    status: 'Active',
    primaryOffering: 'Gen-Z',
    coreBalance: '৳150.00',
    promoBalance: '৳25.00',
    unbilledAmount: '৳0.00',
    outstandingBill: '৳0.00',
    freeBytesLimit: '10,240 MB',
    freeBytesUsed: '3,120 MB',
    freeBytesLeft: '7,120 MB',
    paymentDueDate: 'N/A',
    availableFreeMinutes: '120 Mins',
    residualVolume: '7,120 MB',
    ppsCoreBalance: '৳150.00',
    billingGroup: 'Rajonigandha',
    effectivePaymentMethod: 'Cash',
    residualSmsVolume: '50 SMS',
    validTime: '2026-12-31 23:59:59',
    ppsCoreBalanceValidTime: '20370101000000',
    rechargeLogs: [
      {
        serviceNo: '1575851306',
        batchNo: 'BAT-90812',
        serialNo: 'SN-00192837',
        paymentMode: 'bKash Online',
        rechargeDate: '2026-07-19 11:20:00',
        balanceBefore: '৳50.00',
        balanceAfter: '৳150.00',
        rechargeFee: '৳0.00'
      },
      {
        serviceNo: '1575851306',
        batchNo: 'BAT-88210',
        serialNo: 'SN-00183921',
        paymentMode: 'Scratch Card',
        rechargeDate: '2026-07-09 14:15:30',
        balanceBefore: '৳10.00',
        balanceAfter: '৳50.00',
        rechargeFee: '৳0.00'
      }
    ]
  },
  {
    id: 'cust-2',
    serviceNo: '01552123456',
    fullName: 'TABTILA ISLAM',
    idNumber: '1998273849102',
    accountNo: '18492011',
    paymentFlag: 'Postpaid',
    status: 'Active',
    primaryOffering: 'Teletalk Prime',
    coreBalance: '৳450.50',
    promoBalance: '৳100.00',
    unbilledAmount: '৳120.00',
    outstandingBill: '৳0.00',
    freeBytesLimit: '25,600 MB',
    freeBytesUsed: '12,400 MB',
    freeBytesLeft: '13,200 MB',
    paymentDueDate: '2026-08-10',
    availableFreeMinutes: '500 Mins',
    residualVolume: '13,200 MB',
    ppsCoreBalance: '৳450.50',
    billingGroup: 'Aparajita',
    effectivePaymentMethod: 'Nagad Online',
    residualSmsVolume: '200 SMS',
    validTime: '2027-01-01 00:00:00',
    ppsCoreBalanceValidTime: '20370101000000',
    rechargeLogs: [
      {
        serviceNo: '01552123456',
        batchNo: 'BAT-91023',
        serialNo: 'SN-00201938',
        paymentMode: 'Nagad Online',
        rechargeDate: '2026-07-15 16:45:10',
        balanceBefore: '৳200.00',
        balanceAfter: '৳450.50',
        rechargeFee: '৳0.00'
      }
    ]
  },
  {
    id: 'cust-3',
    serviceNo: '01552987654',
    fullName: 'ZAHID HASAN',
    idNumber: '1992748392018',
    accountNo: '16283940',
    paymentFlag: 'Prepaid',
    status: 'Active',
    primaryOffering: 'Bornona 4G',
    coreBalance: '৳85.00',
    promoBalance: '৳10.00',
    unbilledAmount: '৳0.00',
    outstandingBill: '৳0.00',
    freeBytesLimit: '5,120 MB',
    freeBytesUsed: '2,100 MB',
    freeBytesLeft: '3,020 MB',
    paymentDueDate: 'N/A',
    availableFreeMinutes: '50 Mins',
    residualVolume: '3,020 MB',
    ppsCoreBalance: '৳85.00',
    billingGroup: 'Shadhin',
    effectivePaymentMethod: 'Cash',
    residualSmsVolume: '30 SMS',
    validTime: '2026-11-15 23:59:59',
    ppsCoreBalanceValidTime: '20370101000000',
    rechargeLogs: [
      {
        serviceNo: '01552987654',
        batchNo: 'BAT-77281',
        serialNo: 'SN-00129384',
        paymentMode: 'Retailer Flexi',
        rechargeDate: '2026-07-10 10:05:00',
        balanceBefore: '৳35.00',
        balanceAfter: '৳85.00',
        rechargeFee: '৳0.00'
      }
    ]
  },
  {
    id: 'cust-4',
    serviceNo: '01511223344',
    fullName: 'RAFIQUL ISLAM',
    idNumber: '1989472849103',
    accountNo: '12948201',
    paymentFlag: 'Prepaid',
    status: 'Active',
    primaryOffering: 'Shotoi 4G',
    coreBalance: '৳320.00',
    promoBalance: '৳50.00',
    unbilledAmount: '৳0.00',
    outstandingBill: '৳0.00',
    freeBytesLimit: '15,360 MB',
    freeBytesUsed: '4,500 MB',
    freeBytesLeft: '10,860 MB',
    paymentDueDate: 'N/A',
    availableFreeMinutes: '300 Mins',
    residualVolume: '10,860 MB',
    ppsCoreBalance: '৳320.00',
    billingGroup: 'Bijoy',
    effectivePaymentMethod: 'Rocket Online',
    residualSmsVolume: '100 SMS',
    validTime: '2026-12-15 23:59:59',
    ppsCoreBalanceValidTime: '20370101000000',
    rechargeLogs: []
  },
  {
    id: 'cust-5',
    serviceNo: '01522334455',
    fullName: 'NASIR UDDIN',
    idNumber: '1985392049182',
    accountNo: '17392049',
    paymentFlag: 'Postpaid',
    status: 'Active',
    primaryOffering: 'Corporate Unlimited',
    coreBalance: '৳1250.00',
    promoBalance: '৳200.00',
    unbilledAmount: '৳450.00',
    outstandingBill: '৳0.00',
    freeBytesLimit: '51,200 MB',
    freeBytesUsed: '18,900 MB',
    freeBytesLeft: '32,300 MB',
    paymentDueDate: '2026-08-05',
    availableFreeMinutes: '1000 Mins',
    residualVolume: '32,300 MB',
    ppsCoreBalance: '৳1250.00',
    billingGroup: 'Corporate HQ',
    effectivePaymentMethod: 'Bank Transfer',
    residualSmsVolume: '500 SMS',
    validTime: '2027-06-30 23:59:59',
    ppsCoreBalanceValidTime: '20370101000000',
    rechargeLogs: []
  },
  {
    id: 'cust-6',
    serviceNo: '01533445566',
    fullName: 'KAMAL HOSSAIN',
    idNumber: '1990482910482',
    accountNo: '19402849',
    paymentFlag: 'Prepaid',
    status: 'Active',
    primaryOffering: 'Gen-Z Youth',
    coreBalance: '৳45.00',
    promoBalance: '৳0.00',
    unbilledAmount: '৳0.00',
    outstandingBill: '৳0.00',
    freeBytesLimit: '2,048 MB',
    freeBytesUsed: '1,800 MB',
    freeBytesLeft: '248 MB',
    paymentDueDate: 'N/A',
    availableFreeMinutes: '15 Mins',
    residualVolume: '248 MB',
    ppsCoreBalance: '৳45.00',
    billingGroup: 'Rajonigandha',
    effectivePaymentMethod: 'Cash',
    residualSmsVolume: '10 SMS',
    validTime: '2026-09-01 23:59:59',
    ppsCoreBalanceValidTime: '20370101000000',
    rechargeLogs: []
  },
  {
    id: 'cust-7',
    serviceNo: '01544556677',
    fullName: 'FARHAD HOSSEN',
    idNumber: '1994829104829',
    accountNo: '11948203',
    paymentFlag: 'Postpaid',
    status: 'Active',
    primaryOffering: 'Executive Ultra',
    coreBalance: '৳890.00',
    promoBalance: '৳150.00',
    unbilledAmount: '৳210.00',
    outstandingBill: '৳0.00',
    freeBytesLimit: '30,720 MB',
    freeBytesUsed: '11,200 MB',
    freeBytesLeft: '19,520 MB',
    paymentDueDate: '2026-08-15',
    availableFreeMinutes: '800 Mins',
    residualVolume: '19,520 MB',
    ppsCoreBalance: '৳890.00',
    billingGroup: 'VIP Club',
    effectivePaymentMethod: 'Credit Card',
    residualSmsVolume: '300 SMS',
    validTime: '2027-12-31 23:59:59',
    ppsCoreBalanceValidTime: '20370101000000',
    rechargeLogs: []
  },
  {
    id: 'cust-8',
    serviceNo: '01555667788',
    fullName: 'SULTANA RAZIA',
    idNumber: '1997482910482',
    accountNo: '14920183',
    paymentFlag: 'Prepaid',
    status: 'Active',
    primaryOffering: 'Aparajita Voice',
    coreBalance: '৳210.00',
    promoBalance: '৳30.00',
    unbilledAmount: '৳0.00',
    outstandingBill: '৳0.00',
    freeBytesLimit: '8,192 MB',
    freeBytesUsed: '3,400 MB',
    freeBytesLeft: '4,792 MB',
    paymentDueDate: 'N/A',
    availableFreeMinutes: '250 Mins',
    residualVolume: '4,792 MB',
    ppsCoreBalance: '৳210.00',
    billingGroup: 'Aparajita',
    effectivePaymentMethod: 'bKash Online',
    residualSmsVolume: '80 SMS',
    validTime: '2026-10-20 23:59:59',
    ppsCoreBalanceValidTime: '20370101000000',
    rechargeLogs: []
  },
  {
    id: 'cust-9',
    serviceNo: '01566778899',
    fullName: 'TANVIR AHMED',
    idNumber: '1993482910482',
    accountNo: '15839201',
    paymentFlag: 'Prepaid',
    status: 'Locked',
    primaryOffering: 'Student Combo',
    coreBalance: '৳12.50',
    promoBalance: '৳0.00',
    unbilledAmount: '৳0.00',
    outstandingBill: '৳0.00',
    freeBytesLimit: '1,024 MB',
    freeBytesUsed: '1,024 MB',
    freeBytesLeft: '0 MB',
    paymentDueDate: 'N/A',
    availableFreeMinutes: '0 Mins',
    residualVolume: '0 MB',
    ppsCoreBalance: '৳12.50',
    billingGroup: 'Campus',
    effectivePaymentMethod: 'Cash',
    residualSmsVolume: '0 SMS',
    validTime: '2026-07-31 23:59:59',
    ppsCoreBalanceValidTime: '20370101000000',
    rechargeLogs: []
  },
  {
    id: 'cust-10',
    serviceNo: '01577889900',
    fullName: 'MEHEDI HASAN',
    idNumber: '1996482910482',
    accountNo: '13948204',
    paymentFlag: 'Postpaid',
    status: 'Active',
    primaryOffering: 'Freedom Special',
    coreBalance: '৳670.00',
    promoBalance: '৳50.00',
    unbilledAmount: '৳85.00',
    outstandingBill: '৳0.00',
    freeBytesLimit: '20,480 MB',
    freeBytesUsed: '8,900 MB',
    freeBytesLeft: '11,580 MB',
    paymentDueDate: '2026-08-20',
    availableFreeMinutes: '600 Mins',
    residualVolume: '11,580 MB',
    ppsCoreBalance: '৳670.00',
    billingGroup: 'Shadhin',
    effectivePaymentMethod: 'Nagad Online',
    residualSmsVolume: '150 SMS',
    validTime: '2027-03-31 23:59:59',
    ppsCoreBalanceValidTime: '20370101000000',
    rechargeLogs: []
  }
];

export function searchCustomerRecords(serviceNo: string, fullName: string, idNumber: string): CustomerRecord[] {
  const cleanSvc = serviceNo.trim().toLowerCase();
  const cleanName = fullName.trim().toLowerCase();
  const cleanId = idNumber.trim().toLowerCase();

  if (!cleanSvc && !cleanName && !cleanId) {
    return CUSTOMER_DATASET;
  }

  return CUSTOMER_DATASET.filter((customer) => {
    const svcMatch = cleanSvc ? customer.serviceNo.toLowerCase().includes(cleanSvc) : true;
    const nameMatch = cleanName ? customer.fullName.toLowerCase().includes(cleanName) : true;
    const idMatch = cleanId ? customer.idNumber.toLowerCase().includes(cleanId) : true;
    return svcMatch && nameMatch && idMatch;
  });
}

export function getCustomerById(id: string): CustomerRecord | undefined {
  return CUSTOMER_DATASET.find((c) => c.id === id);
}
