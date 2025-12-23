
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  STUDENT = 'STUDENT',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'ADMIN'
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'DEBIT' | 'CREDIT';
  status: 'COMPLETED' | 'PENDING' | 'VERIFIED_ON_BLOCKCHAIN';
  hash?: string;
}

export interface Deposit {
  id: string;
  type: 'FIXED' | 'RECURRING';
  principal: number;
  interestRate: number;
  maturityDate: string;
  status: 'ACTIVE' | 'MATURED';
}

export interface BalanceSnapshot {
  date: string;
  balance: number;
  changeReason: string;
}

export interface Account {
  accountNumber: string;
  balance: number;
  type: string;
  ifsc: string;
}

export interface LoanScheme {
  id: string;
  name: string;
  interestRate: number;
  maxTenure: number;
  description: string;
  category: 'EDUCATION' | 'HOME' | 'CAR' | 'PERSONAL';
  features: string[];
}

export interface LoanApplication {
  id: string;
  applicantName: string;
  loanType: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  dateApplied: string;
  kycStatus: 'VERIFIED' | 'PENDING' | 'FAILED';
}
