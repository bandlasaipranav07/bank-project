
import React, { useState } from 'react';
import { UserRole, Transaction } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  Loader2,
  PiggyBank
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', value: 35000 },
  { name: 'Feb', value: 42000 },
  { name: 'Mar', value: 38000 },
  { name: 'Apr', value: 45000 },
  { name: 'May', value: 50000 },
];

interface DashboardProps {
  role: UserRole;
  balance: number;
  userName: string;
  accountNumber: string;
  transactions: Transaction[];
  onNavigate?: (view: string) => void;
  onApplyLoan?: (type: string, amount: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, balance, userName, accountNumber, transactions, onNavigate, onApplyLoan }) => {
  const [applying, setApplying] = useState(false);
  const firstName = userName ? userName.split(' ')[0] : 'User';
  const recentTransactions = transactions.slice(0, 4);

  const handleQuickApply = () => {
    if (!onApplyLoan) return;
    setApplying(true);
    setTimeout(() => {
      onApplyLoan('Bright Future Student Loan', 500000);
      setApplying(false);
      if (onNavigate) onNavigate('loans');
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-black flex items-center gap-2">
            Namaste, {firstName} <Sparkles className="text-amber-500" size={24} />
          </h2>
          <p className="text-violet-500 text-sm font-bold mt-1 uppercase tracking-wider">Your {role.toLowerCase()} account is secured and active.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate?.('deposits')}
            className="px-5 py-2.5 bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-amber-600 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <PiggyBank size={16} /> Quick Deposit
          </button>
          <button 
            onClick={() => onNavigate?.('transfers')}
            className="px-5 py-2.5 bg-violet-600 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-violet-700 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <ArrowUpRight size={16} /> Quick Transfer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 rounded-[2rem] p-6 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-violet-600/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-violet-400 mb-1">Available Savings</p>
          <h3 className="text-3xl font-black mb-4">₹ {balance.toLocaleString()}</h3>
          <div className="flex items-center justify-between">
             <span className="text-[10px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-md border border-amber-500/20">Active Account</span>
             <span className="text-[10px] font-mono text-slate-500 tracking-tighter">{accountNumber}</span>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-violet-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <TrendingUp size={20} />
            </div>
          </div>
          <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">Monthly Earnings</p>
          <h3 className="text-2xl font-bold text-black mt-1">₹ 85,000</h3>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-violet-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
              <TrendingDown size={20} />
            </div>
          </div>
          <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">Spent this month</p>
          <h3 className="text-2xl font-bold text-black mt-1">₹ 14,230</h3>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-violet-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-violet-50 rounded-xl text-violet-600">
              <ShieldCheck size={20} />
            </div>
            <span className="text-[10px] font-bold text-violet-600">VISA</span>
          </div>
          <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">Credit Limit</p>
          <h3 className="text-2xl font-bold text-black mt-1">₹ 2.0L</h3>
        </div>
      </div>

      {(role === UserRole.CUSTOMER || role === UserRole.STUDENT) && (
        <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-[2rem] p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <GraduationCap size={32} />
            </div>
            <div>
              <h4 className="text-xl font-bold">Bright Future Student Loan</h4>
              <p className="text-violet-100 text-sm opacity-90">Instant eligibility check and zero processing fee for students.</p>
            </div>
          </div>
          <button 
            onClick={handleQuickApply}
            disabled={applying}
            className="w-full md:w-auto px-8 py-3 bg-amber-400 text-slate-900 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-amber-300 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {applying ? <Loader2 className="animate-spin" size={16} /> : <>Apply for Student Loan <ArrowRight size={16} /></>}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-violet-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold text-black flex items-center gap-2">
              <TrendingUp size={18} className="text-violet-600" /> Financial Overview
            </h4>
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-violet-600 rounded-full"></span>
              <span className="w-2 h-2 bg-violet-100 rounded-full"></span>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f3ff" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#a78bfa'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700, fill: '#a78bfa'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.1)' }} 
                  cursor={{ stroke: '#8b5cf6', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-violet-100 shadow-sm flex flex-col">
          <h4 className="font-bold text-black mb-6">Recent Transactions</h4>
          <div className="space-y-5 flex-1 overflow-y-auto">
            {recentTransactions.length > 0 ? recentTransactions.map((txn) => (
              <div key={txn.id} className="flex items-center gap-4 group">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all group-hover:shadow-md ${
                  txn.type === 'DEBIT' ? 'bg-violet-50/50 border-violet-100 text-violet-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                }`}>
                  {txn.type === 'DEBIT' ? <TrendingDown size={18} /> : <TrendingUp size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-black truncate">{txn.description}</p>
                  <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">{txn.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${txn.type === 'DEBIT' ? 'text-black' : 'text-emerald-600'}`}>
                    {txn.type === 'DEBIT' ? '-' : '+'}₹{txn.amount.toLocaleString()}
                  </p>
                  {txn.status === 'VERIFIED_ON_BLOCKCHAIN' && (
                    <div className="flex items-center justify-end gap-1 text-[8px] font-black text-violet-600 mt-1">
                      <CheckCircle2 size={8} /> BLOCKCHAIN
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="text-center py-10 opacity-50">No transactions yet.</div>
            )}
          </div>
          <button 
            onClick={() => onNavigate?.('statements')}
            className="w-full mt-6 py-4 bg-violet-50/50 text-violet-600 text-xs font-bold rounded-2xl border border-violet-100 hover:bg-violet-100 hover:text-violet-700 hover:border-violet-200 transition-all"
          >
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
