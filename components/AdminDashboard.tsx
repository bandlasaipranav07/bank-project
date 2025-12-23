
import React, { useState, useEffect } from 'react';
import { Transaction, LoanApplication, UserRole } from '../types';
import { Settings, Users as UsersIcon, Database, ShieldCheck, Activity, TrendingUp, Trash2, Edit3, Save } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const adminData = [
  { name: 'Mon', logins: 2400 },
  { name: 'Tue', logins: 1398 },
  { name: 'Wed', logins: 9800 },
  { name: 'Thu', logins: 3908 },
  { name: 'Fri', logins: 4800 },
  { name: 'Sat', logins: 3800 },
  { name: 'Sun', logins: 4300 },
];

interface AdminProps {
  transactions: Transaction[];
  loans: LoanApplication[];
  users: any[];
  onDeleteUser: (id: string) => void;
  activeView?: string;
}

const AdminDashboard: React.FC<AdminProps> = ({ transactions, loans, users, onDeleteUser, activeView }) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'USERS' | 'CONFIG'>('OVERVIEW');
  const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);

  // Sync tab with external view navigation
  useEffect(() => {
    if (activeView === 'users') setActiveTab('USERS');
    else if (activeView === 'config') setActiveTab('CONFIG');
    else if (activeView === 'admin-dash') setActiveTab('OVERVIEW');
  }, [activeView]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Admin Control Center</h2>
          <p className="text-slate-500 text-sm">System-wide monitoring and configurations.</p>
        </div>
        <div className="flex bg-white rounded-2xl p-1 border border-violet-100 shadow-sm">
          {(['OVERVIEW', 'USERS', 'CONFIG'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === tab ? 'bg-violet-600 text-white shadow-md' : 'text-violet-400 hover:text-violet-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'OVERVIEW' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Users', value: users.length.toString(), icon: <UsersIcon />, color: 'text-violet-600', bg: 'bg-violet-50' },
              { label: 'TX Volume', value: `₹${(totalVolume / 1000).toFixed(1)}K`, icon: <TrendingUp />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Open Loans', value: loans.filter(l => l.status === 'PENDING').length.toString(), icon: <Database />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Security Score', value: 'A+', icon: <ShieldCheck />, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-violet-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">{stat.label}</p>
                <h4 className="text-2xl font-black text-black mt-1">{stat.value}</h4>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-violet-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-bold text-black">Traffic & Logins</h4>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <TrendingUp size={14} /> +24% this week
                </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={adminData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f3ff" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#a78bfa', fontWeight: 700}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#a78bfa', fontWeight: 700}} />
                    <Tooltip cursor={{fill: '#f5f3ff'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.1)' }} />
                    <Bar dataKey="logins" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
              <h4 className="font-bold mb-6 flex items-center gap-2">
                <Activity size={18} className="text-violet-400" /> System Audit Logs
              </h4>
              <div className="space-y-4">
                {[
                  { log: 'Policy Updated', user: 'Admin01', time: '10m ago' },
                  { log: 'New Loan Scheme Added', user: 'System', time: '1h ago' },
                  { log: 'Failed Login Attempt', user: 'IP: 192.x', time: '2h ago' },
                  { log: 'KYC Batch Processed', user: 'Emp_Rahul', time: '4h ago' }
                ].map((log, i) => (
                  <div key={i} className="flex flex-col gap-1 p-3 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                    <p className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">{log.log}</p>
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      <span>By: {log.user}</span>
                      <span>{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-4 bg-violet-600 text-white text-xs font-bold rounded-2xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-900/40">
                Download Full Audit
              </button>
            </div>
          </div>
        </>
      )}

      {activeTab === 'USERS' && (
        <div className="bg-white rounded-[2.5rem] border border-violet-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-violet-50 bg-violet-50/20">
             <h3 className="font-bold text-black flex items-center gap-2">
               <UsersIcon size={20} className="text-violet-600" /> User Directory
             </h3>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead className="bg-violet-50/10 border-b border-violet-100">
                 <tr>
                   <th className="px-8 py-4 text-xs font-bold text-violet-400 uppercase">Name</th>
                   <th className="px-8 py-4 text-xs font-bold text-violet-400 uppercase">Role</th>
                   <th className="px-8 py-4 text-xs font-bold text-violet-400 uppercase">Status</th>
                   <th className="px-8 py-4 text-xs font-bold text-violet-400 uppercase text-center">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-violet-50">
                 {users.map(user => (
                   <tr key={user.id} className="hover:bg-violet-50/30 transition-colors">
                     <td className="px-8 py-5 text-sm font-bold text-slate-900">{user.name}</td>
                     <td className="px-8 py-5">
                       <span className="px-3 py-1 bg-violet-50 text-violet-600 text-[10px] font-bold rounded-full uppercase">
                         {user.role}
                       </span>
                     </td>
                     <td className="px-8 py-5">
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> {user.status}
                        </span>
                     </td>
                     <td className="px-8 py-5">
                       <div className="flex justify-center gap-2">
                         <button className="p-2 text-violet-400 hover:text-violet-600 bg-violet-50 rounded-lg transition-colors">
                           <Edit3 size={16} />
                         </button>
                         <button 
                            onClick={() => onDeleteUser(user.id)}
                            className="p-2 text-rose-400 hover:text-rose-600 bg-rose-50 rounded-lg transition-colors"
                          >
                           <Trash2 size={16} />
                         </button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
      )}

      {activeTab === 'CONFIG' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-violet-100 shadow-sm space-y-6">
              <h3 className="font-bold text-black flex items-center gap-2">
                <Settings size={20} className="text-violet-600" /> Global Banking Parameters
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center p-4 bg-violet-50/30 rounded-2xl border border-violet-100">
                    <span className="text-sm font-medium text-slate-700">Base Interest Rate</span>
                    <input type="text" defaultValue="6.5%" className="w-20 bg-white border border-violet-200 rounded-lg px-2 py-1 text-xs font-bold text-right" />
                 </div>
                 <div className="flex justify-between items-center p-4 bg-violet-50/30 rounded-2xl border border-violet-100">
                    <span className="text-sm font-medium text-slate-700">System Maintenance</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                    </label>
                 </div>
              </div>
              <button className="w-full py-4 bg-violet-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
                <Save size={18} /> Save Configurations
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
