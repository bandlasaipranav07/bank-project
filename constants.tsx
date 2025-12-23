
import React from 'react';
import { 
  LayoutDashboard, 
  Send, 
  Receipt, 
  GraduationCap, 
  ShieldCheck, 
  CreditCard, 
  FileText, 
  Settings, 
  Users, 
  Database,
  Link as LinkIcon,
  PiggyBank,
  LineChart
} from 'lucide-react';
import { UserRole } from './types';

export const SIDEBAR_ITEMS = {
  [UserRole.CUSTOMER]: [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: 'dashboard' },
    { label: 'Transfers', icon: <Send size={20} />, path: 'transfers' },
    { label: 'Deposits', icon: <PiggyBank size={20} />, path: 'deposits' },
    { label: 'Bill Payments', icon: <Receipt size={20} />, path: 'bills' },
    { label: 'Loans', icon: <GraduationCap size={20} />, path: 'loans' },
    { label: 'Cards', icon: <CreditCard size={20} />, path: 'cards' },
    { label: 'Balance History', icon: <LineChart size={20} />, path: 'balance-history' },
    { label: 'Blockchain Explorer', icon: <LinkIcon size={20} />, path: 'blockchain' },
    { label: 'Statements', icon: <FileText size={20} />, path: 'statements' },
  ],
  [UserRole.STUDENT]: [
    { label: 'Bright Future Dashboard', icon: <LayoutDashboard size={20} />, path: 'dashboard' },
    { label: 'Deposits', icon: <PiggyBank size={20} />, path: 'deposits' },
    { label: 'Education Loans', icon: <GraduationCap size={20} />, path: 'loans' },
    { label: 'Scholarships', icon: <ShieldCheck size={20} />, path: 'scholarships' },
    { label: 'Transfers', icon: <Send size={20} />, path: 'transfers' },
    { label: 'Balance History', icon: <LineChart size={20} />, path: 'balance-history' },
    { label: 'Blockchain Logs', icon: <LinkIcon size={20} />, path: 'blockchain' },
  ],
  [UserRole.EMPLOYEE]: [
    { label: 'Verification Queue', icon: <Users size={20} />, path: 'verification' },
    { label: 'Loan Approvals', icon: <GraduationCap size={20} />, path: 'approvals' },
    { label: 'Transactions', icon: <Database size={20} />, path: 'transactions' },
    { label: 'Support Tickets', icon: <Settings size={20} />, path: 'support' },
  ],
  [UserRole.ADMIN]: [
    { label: 'System Overview', icon: <LayoutDashboard size={20} />, path: 'admin-dash' },
    { label: 'User Management', icon: <Users size={20} />, path: 'users' },
    { label: 'Configurations', icon: <Settings size={20} />, path: 'config' },
    { label: 'Audit Logs', icon: <FileText size={20} />, path: 'audit' },
  ]
};

export const MOCK_TRANSACTIONS = [
  { id: 'TXN1023', date: '2024-05-20', description: 'Grocery Mart - UPI', amount: 1250.00, type: 'DEBIT', status: 'VERIFIED_ON_BLOCKCHAIN', hash: '0x7a...f3e1' },
  { id: 'TXN1024', date: '2024-05-19', description: 'Salary Credit - TCS', amount: 85000.00, type: 'CREDIT', status: 'COMPLETED' },
  { id: 'TXN1025', date: '2024-05-18', description: 'Amazon.in - IMPS', amount: 4500.00, type: 'DEBIT', status: 'VERIFIED_ON_BLOCKCHAIN', hash: '0x3c...a9b2' },
  { id: 'TXN1026', date: '2024-05-17', description: 'Electricity Bill', amount: 3200.00, type: 'DEBIT', status: 'PENDING' },
];

export const MOCK_LOANS = [
  { 
    id: 'L1', 
    name: 'Bright Future Student Loan', 
    interestRate: 6.5, 
    maxTenure: 15, 
    category: 'EDUCATION',
    description: 'Special low-interest loans for higher education with a moratorium period during study.',
    features: ['Zero processing fees', 'Moratorium up to 4 years', '80C Tax benefits']
  },
  { 
    id: 'L2', 
    name: 'Tirumala Home Loan', 
    interestRate: 8.4, 
    maxTenure: 30, 
    category: 'HOME',
    description: 'Own your dream home with flexible repayment and easy processing.',
    features: ['Low EMI options', 'No prepayment penalty', 'Top-up loan facility']
  }
];
