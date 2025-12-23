
import React from 'react';
import { UserRole, LoanApplication } from '../types';
import { Check, X, FileText, UserCheck, ShieldAlert } from 'lucide-react';

interface VerificationProps {
  role: UserRole;
  applications: LoanApplication[];
  onAction: (id: string, status: 'APPROVED' | 'REJECTED') => void;
}

const VerificationQueue: React.FC<VerificationProps> = ({ role, applications, onAction }) => {
  const pendingRequests = applications.filter(a => a.status === 'PENDING');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Employee Workspace</h2>
          <p className="text-slate-500 text-sm">Review and approve customer verification and loan requests.</p>
        </div>
        <div className="flex gap-2">
          <div className="px-4 py-2 bg-violet-50 text-violet-700 rounded-xl text-xs font-bold border border-violet-100">
            Active: {pendingRequests.length} Requests
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-violet-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-violet-50 flex justify-between items-center bg-violet-50/20">
          <h3 className="font-bold flex items-center gap-2 text-black">
            <UserCheck size={20} className="text-violet-600" /> Pending Requests Queue
          </h3>
          <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">SLA: 24 Hours</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-violet-400 uppercase tracking-widest border-b border-violet-100">
                <th className="px-8 py-4">Request ID</th>
                <th className="px-8 py-4">Customer</th>
                <th className="px-8 py-4">Type</th>
                <th className="px-8 py-4">Submitted</th>
                <th className="px-8 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-50">
              {pendingRequests.length > 0 ? pendingRequests.map((req) => (
                <tr key={req.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="px-8 py-5 text-sm font-mono text-violet-400">{req.id}</td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-black">{req.applicantName}</p>
                    <p className="text-[10px] font-bold text-violet-300 uppercase">KYC: {req.kycStatus}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-[10px] font-bold uppercase">
                      <FileText size={10} /> {req.loanType}
                    </span>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">Amount: ₹{req.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500">{req.dateApplied}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => onAction(req.id, 'APPROVED')}
                        className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                        title="Approve"
                      >
                        <Check size={18} />
                      </button>
                      <button 
                        onClick={() => onAction(req.id, 'REJECTED')}
                        className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                        title="Reject"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-medium">
                    Queue is empty. Great job!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-violet-100 rounded-3xl flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-black">Flagged Activity</h4>
            <p className="text-2xl font-black text-rose-500">03</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationQueue;
