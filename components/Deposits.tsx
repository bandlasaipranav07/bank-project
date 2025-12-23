
import React, { useState } from 'react';
import { PiggyBank, Plus, ArrowRight, ShieldCheck, Calendar, TrendingUp, Info, History, FileText, CheckCircle2 } from 'lucide-react';
import { Deposit } from '../types';

interface DepositsProps {
  balance: number;
  deposits: Deposit[];
  onCreateDeposit: (type: 'FIXED' | 'RECURRING', amount: number) => void;
}

const Deposits: React.FC<DepositsProps> = ({ balance, deposits, onCreateDeposit }) => {
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'HISTORY'>('ACTIVE');
  const [showForm, setShowForm] = useState<'FIXED' | 'RECURRING' | null>(null);
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('12');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (amt > 0 && amt <= balance && showForm) {
      onCreateDeposit(showForm, amt);
      setAmount('');
      setShowForm(null);
    } else {
      alert("Invalid amount or insufficient balance.");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <PiggyBank className="text-amber-500" /> Deposit Services
          </h2>
          <p className="text-slate-500 text-sm">Grow your wealth with Tirumala's high-yield savings plans.</p>
        </div>
        <div className="flex bg-white rounded-2xl p-1 border border-violet-100 shadow-sm">
          <button
            onClick={() => setActiveTab('ACTIVE')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'ACTIVE' ? 'bg-violet-600 text-white shadow-md' : 'text-violet-400 hover:text-violet-600'
            }`}
          >
            Active Deposits
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'HISTORY' ? 'bg-violet-600 text-white shadow-md' : 'text-violet-400 hover:text-violet-600'
            }`}
          >
            Deposit History
          </button>
        </div>
      </div>

      {activeTab === 'ACTIVE' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-6 border border-violet-100 shadow-sm">
              <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">Total FD Value</p>
              <h4 className="text-2xl font-black text-black mt-1">
                ₹ {deposits.filter(d => d.type === 'FIXED').reduce((acc, curr) => acc + curr.principal, 0).toLocaleString()}
              </h4>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-violet-100 shadow-sm">
              <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">Total RD Monthly</p>
              <h4 className="text-2xl font-black text-black mt-1">
                ₹ {deposits.filter(d => d.type === 'RECURRING').reduce((acc, curr) => acc + curr.principal, 0).toLocaleString()}
              </h4>
            </div>
            <div className="bg-white rounded-3xl p-6 border border-violet-100 shadow-sm col-span-1 md:col-span-2 flex items-center justify-center gap-4">
               <button 
                onClick={() => setShowForm('FIXED')}
                className="flex-1 py-3 bg-violet-600 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-violet-700 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Open FD
              </button>
              <button 
                onClick={() => setShowForm('RECURRING')}
                className="flex-1 py-3 bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Open RD
              </button>
            </div>
          </div>

          {showForm && (
            <div className="bg-white rounded-[2rem] p-8 border-2 border-violet-100 shadow-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-black">New {showForm === 'FIXED' ? 'Fixed' : 'Recurring'} Deposit</h3>
                <button onClick={() => setShowForm(null)} className="text-slate-400 hover:text-rose-500">
                  Cancel
                </button>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Principal Amount (₹)</label>
                  <input 
                    type="number" 
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 50000"
                    className="w-full px-4 py-3 bg-violet-50/50 border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-black font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tenure (Months)</label>
                  <select 
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="w-full px-4 py-3 bg-violet-50/50 border border-violet-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-black font-bold"
                  >
                    <option value="6">6 Months (6.5% P.A.)</option>
                    <option value="12">12 Months (7.2% P.A.)</option>
                    <option value="24">24 Months (7.5% P.A.)</option>
                    <option value="36">36 Months (7.8% P.A.)</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Create Deposit <ArrowRight size={18} />
                </button>
              </form>
              <div className="mt-6 flex items-center gap-2 text-[10px] text-violet-400 font-bold uppercase tracking-widest bg-violet-50 p-3 rounded-xl border border-violet-100">
                <Info size={14} /> Amount will be instantly locked from your primary savings account.
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deposits.length > 0 ? deposits.map(dep => (
              <div key={dep.id} className="bg-white rounded-[2.5rem] p-6 border border-violet-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${dep.type === 'FIXED' ? 'bg-violet-50 text-violet-600' : 'bg-amber-50 text-amber-600'}`}>
                    <PiggyBank size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    dep.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {dep.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900">{dep.type === 'FIXED' ? 'Fixed' : 'Recurring'} Deposit</h4>
                <p className="text-3xl font-black text-black mt-1">₹{dep.principal.toLocaleString()}</p>
                
                <div className="mt-6 space-y-3 pt-4 border-t border-violet-50">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 uppercase tracking-widest">Interest Rate</span>
                    <span className="text-amber-500">{dep.interestRate}% P.A.</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 uppercase tracking-widest">Maturity Date</span>
                    <span className="text-slate-900">{dep.maturityDate}</span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-violet-400 italic">
                  <ShieldCheck size={14} className="text-emerald-500" /> Blockchain-protected instrument
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center bg-violet-50/20 border-2 border-dashed border-violet-100 rounded-[2.5rem]">
                <PiggyBank className="mx-auto text-violet-200 mb-4" size={64} />
                <h3 className="font-bold text-slate-400">No active deposits found.</h3>
                <p className="text-xs text-slate-400 mt-1 italic">Start saving today to secure your future.</p>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'HISTORY' && (
        <div className="bg-white rounded-[2.5rem] border border-violet-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-violet-50 flex justify-between items-center bg-violet-50/20">
            <h3 className="font-bold flex items-center gap-2 text-black">
              <History size={20} className="text-violet-600" /> Comprehensive Deposit Ledger
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-violet-100 text-violet-600 text-[10px] font-bold uppercase rounded-xl hover:bg-violet-50 transition-all">
              <FileText size={14} /> Export Certificates
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-violet-50/10 border-b border-violet-100">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black text-violet-400 uppercase tracking-widest">Certificate ID</th>
                  <th className="px-8 py-4 text-[10px] font-black text-violet-400 uppercase tracking-widest">Scheme Type</th>
                  <th className="px-8 py-4 text-[10px] font-black text-violet-400 uppercase tracking-widest">Principal Amount</th>
                  <th className="px-8 py-4 text-[10px] font-black text-violet-400 uppercase tracking-widest">Rate (%)</th>
                  <th className="px-8 py-4 text-[10px] font-black text-violet-400 uppercase tracking-widest">Maturity</th>
                  <th className="px-8 py-4 text-[10px] font-black text-violet-400 uppercase tracking-widest text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-50">
                {deposits.length > 0 ? deposits.map((dep) => (
                  <tr key={dep.id} className="hover:bg-violet-50/30 transition-colors">
                    <td className="px-8 py-5 text-xs font-mono font-bold text-violet-500 uppercase tracking-tighter">{dep.id}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${dep.type === 'FIXED' ? 'bg-violet-400' : 'bg-amber-400'}`}></div>
                        <span className="text-sm font-bold text-slate-900">{dep.type === 'FIXED' ? 'Fixed Deposit' : 'Recurring Deposit'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-black">₹{dep.principal.toLocaleString()}</td>
                    <td className="px-8 py-5 text-sm font-bold text-amber-500">{dep.interestRate}%</td>
                    <td className="px-8 py-5 text-xs text-slate-500 font-medium">{dep.maturityDate}</td>
                    <td className="px-8 py-5">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border flex items-center gap-1 ${
                          dep.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                        }`}>
                          {dep.status === 'ACTIVE' && <CheckCircle2 size={10} />}
                          {dep.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center text-slate-400 font-medium italic">
                      No historical deposit records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-violet-600/10 to-transparent"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-amber-400 text-slate-900 rounded-3xl flex items-center justify-center shadow-lg shadow-amber-400/20">
            <TrendingUp size={32} />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold">Power Up Your Savings</h4>
            <p className="text-slate-400 text-sm mt-1 max-w-md">Our Fixed Deposits offer up to 8.2% interest for senior citizens and 7.5% for general public.</p>
          </div>
        </div>
        <button className="relative z-10 px-8 py-4 bg-white text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all flex items-center gap-2">
          Compare All Schemes <Calendar size={18} />
        </button>
      </div>
    </div>
  );
};

export default Deposits;
