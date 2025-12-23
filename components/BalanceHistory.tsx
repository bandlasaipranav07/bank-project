
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, History, ArrowUpRight, ArrowDownLeft, Calendar, FileText, Search, Filter } from 'lucide-react';
import { BalanceSnapshot } from '../types';

interface HistoryProps {
  history: BalanceSnapshot[];
}

const BalanceHistory: React.FC<HistoryProps> = ({ history }) => {
  const chartData = history.slice(-10).map(s => ({
    name: s.date,
    balance: s.balance
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <LineChart className="text-violet-600" /> Balance History Ledger
          </h2>
          <p className="text-slate-500 text-sm font-medium">Verified historical records of your account milestones.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-violet-100 text-violet-600 text-xs font-bold rounded-xl hover:bg-violet-50 transition-all">
            <FileText size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 border border-violet-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h4 className="font-bold text-black">Financial Growth Trend</h4>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
               <ArrowUpRight size={14} /> +₹12,400 Total
             </div>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f3ff" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#a78bfa', fontWeight: 700}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#a78bfa', fontWeight: 700}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.1)' }}
                cursor={{ stroke: '#8b5cf6', strokeWidth: 2 }}
              />
              <Area type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#balanceGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-violet-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-violet-50 bg-violet-50/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold flex items-center gap-2 text-black">
            <History size={20} className="text-violet-600" /> Milestone Records
          </h3>
          <div className="flex items-center gap-2">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Filter reason..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-violet-400 w-full" />
             </div>
             <button className="p-2 bg-violet-50 text-violet-600 rounded-xl border border-violet-100">
                <Filter size={18} />
             </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-violet-50/30">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-violet-400 uppercase tracking-widest">Date & Time</th>
                <th className="px-8 py-4 text-xs font-bold text-violet-400 uppercase tracking-widest">Balance State</th>
                <th className="px-8 py-4 text-xs font-bold text-violet-400 uppercase tracking-widest">Trigger Event</th>
                <th className="px-8 py-4 text-xs font-bold text-violet-400 uppercase tracking-widest text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-50">
              {history.slice().reverse().map((snap, i) => {
                const prevSnap = history[history.indexOf(snap) - 1];
                const diff = prevSnap ? snap.balance - prevSnap.balance : 0;
                
                return (
                  <tr key={i} className="hover:bg-violet-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <Calendar size={14} className="text-violet-400" />
                        <span className="text-xs font-bold text-slate-900">{snap.date}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <span className="text-sm font-black text-black">₹{snap.balance.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-5">
                       <span className="text-xs font-medium text-slate-500">{snap.changeReason}</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
                         diff >= 0 ? 'text-emerald-600' : 'text-rose-500'
                       }`}>
                         {diff !== 0 && (diff > 0 ? <ArrowUpRight size={12} /> : <ArrowDownLeft size={12} />)}
                         {diff === 0 ? 'STABLE' : `₹${Math.abs(diff).toLocaleString()}`}
                       </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BalanceHistory;
