interface InitializePaymentType {
  userEmail?: string;
  amount: number;
  phoneNumber: string;
  description?: string;
  redirectUrl: string;
  transactionId: string;
  cardAuth?: string;
}
interface ValidateElectricity {
  name: string;
  address: string;
  outstandingAmount?: number;
}
interface AirtimeLookup {
  phoneNumber: string;
  countryCode: string;
}
interface TransactionType {
  amount: number;
  phoneNumber: string;
  description: string;
  redirectUrl: string;
}
interface DataLookup {
  network: string;
  phoneNumber: string;
  countryCode: string;
}
interface InternetLookup {
  phoneNumber: string;
  customerAccountId: string;
  amount?: number;
  type?: string;
  description?: string;
  typeCode?: string;
  cardAuth?: string;
}
interface ValidateInternetLookup {
  phoneNumber: string;
  customerAccountId: string;
}
interface CableTvLookup {
  cableType: string;
  // customerNumber?: number;
  // phoneNumber?: number;
  // countryCode?: string;
  // email?: string;
}
interface validateCableLookup {
  cableType: string;
  customerNumber: number;
  phoneNumber: number;
  countryCode: string;
  email: string;
  source?: string;
}
interface validateStartimesLookup {
  smartCardNumber: number;
  phoneNumber: number;
}
interface Plan {
  phoneNumber: string;
  planId: string;
  name: string;
  price: number;
  validity: number;
  userEmail?: string;
  cardAuth?: string;
}
interface WaecQty {
  // amount: number;
  count: number;
  phoneNumber: string;
}
interface CablePlan {
  name: string;
  price: number;
  type?: string;
  subscriptionPeriod?: number;
  id: string;
}

interface InternetPlan {
  amount: number;
  description: string;
  typeCode: number;
}

interface SpectranetPin {
  phoneNumber: number;
}

interface SpectranetPlan {
  amount: number;
  count: number;
}

interface Electricity {
  disco: string;
  code: string;
  params: string;
  amount: string;
  isActive?: boolean;
}

type InputSearchArgs = { onChange: (e) => void; value: string };

declare module "*.woff";
declare module "*.woff2";
declare module "*.ttf";
declare module "*.otf";
declare module "styled-components";
declare module "aos";
declare module "@react-pdf/styled-components";
// declare module "react-hook-form";
