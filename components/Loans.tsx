
import React, { useState } from 'react';
import { UserRole, LoanApplication } from '../types';
import { MOCK_LOANS } from '../constants';
import { GraduationCap, Home, Calculator, FileCheck, HelpCircle, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

interface LoansProps {
  role: UserRole;
  onApply: (type: string, amount: number) => void;
  applications: LoanApplication[];
}

const Loans: React.FC<LoansProps> = ({ role, onApply, applications }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [applyingFor, setApplyingFor] = useState<string | null>(null);
  
  const filteredLoans = selectedCategory === 'ALL' 
    ? MOCK_LOANS 
    : MOCK_LOANS.filter(l => l.category === selectedCategory);

  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.4);
  const [tenure, setTenure] = useState(20);

  const calculateEMI = () => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (r === 0) return Math.round(principal / n);
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const handleApply = (name: string) => {
    setApplyingFor(name);
    setTimeout(() => {
      onApply(name, principal);
      setApplyingFor(null);
      alert(`${name} application submitted successfully! Our agents will contact you shortly.`);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="relative bg-gradient-to-r from-violet-700 to-indigo-800 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <GraduationCap size={14} /> Bright Future Initiative
          </span>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">Invest in your dreams with Tirumala.</h2>
          <p className="text-blue-100 text-lg mb-8 opacity-90">Education loans with special moratorium periods and competitive rates to power the next generation.</p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => handleApply('Bright Future Student Loan')}
              className="px-8 py-4 bg-white text-violet-800 font-bold rounded-2xl hover:bg-violet-50 transition-all shadow-lg flex items-center gap-2"
            >
              Apply for Student Loan <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="absolute right-[-5%] top-[-10%] w-[50%] h-[120%] bg-white/5 blur-3xl rounded-full rotate-12"></div>
      </div>

      {applications.length > 0 && (
        <div className="bg-white rounded-[2.5rem] p-8 border border-violet-100 shadow-sm">
          <h3 className="font-bold mb-6 text-black">Your Loan Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications.map(app => (
              <div key={app.id} className="p-5 bg-violet-50/30 rounded-2xl border border-violet-100 flex justify-between items-center">
                <div>
                  <p className="font-bold text-black">{app.loanType}</p>
                  <p className="text-xs text-violet-400">ID: {app.id} • {app.dateApplied}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  app.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 
                  app.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {app.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {['ALL', 'EDUCATION', 'HOME', 'CAR', 'PERSONAL'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat 
                  ? 'bg-violet-600 text-white border-violet-600 shadow-md' 
                  : 'bg-white text-violet-400 border-violet-100 hover:bg-violet-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLoans.map((loan) => (
              <div key={loan.id} className="bg-white p-6 rounded-3xl border border-violet-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${
                    loan.category === 'EDUCATION' ? 'bg-amber-50 text-amber-600' : 'bg-violet-50 text-violet-600'
                  }`}>
                    {loan.category === 'EDUCATION' ? <GraduationCap size={24} /> : <Home size={24} />}
                  </div>
                  <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">{loan.interestRate}% P.A.</span>
                </div>
                <h4 className="text-lg font-bold text-black mb-2">{loan.name}</h4>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{loan.description}</p>
                <div className="space-y-3 mb-8">
                  {loan.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      {feat}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => handleApply(loan.name)}
                  disabled={applyingFor === loan.name}
                  className="w-full py-4 bg-violet-50 text-violet-900 text-xs font-bold rounded-2xl group-hover:bg-violet-600 group-hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  {applyingFor === loan.name ? <Loader2 className="animate-spin" size={14} /> : 'Apply Now'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-violet-100 shadow-sm space-y-8 h-fit">
          <div>
            <div className="flex items-center gap-3 text-violet-600 mb-4">
              <Calculator size={24} />
              <h4 className="text-xl font-bold">EMI Calculator</h4>
            </div>
            <p className="text-sm text-slate-500">Plan your finances by calculating your estimated monthly installment.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <label className="text-black">Loan Amount</label>
                <span className="text-violet-600 font-bold">₹ {principal.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="100000" max="50000000" step="100000" 
                value={principal} onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full h-2 bg-violet-50 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <label className="text-black">Interest Rate</label>
                <span className="text-violet-600 font-bold">{rate}%</span>
              </div>
              <input 
                type="range" min="5" max="18" step="0.1" 
                value={rate} onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-violet-50 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <label className="text-black">Tenure (Years)</label>
                <span className="text-violet-600 font-bold">{tenure} Yrs</span>
              </div>
              <input 
                type="range" min="1" max="30" step="1" 
                value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-violet-50 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl text-white text-center">
            <p className="text-xs font-medium text-violet-400 mb-1">Estimated Monthly EMI</p>
            <h3 className="text-3xl font-bold">₹ {calculateEMI().toLocaleString()}</h3>
          </div>

          <div className="space-y-4 pt-4 border-t border-violet-100">
            <div className="flex items-center gap-3 text-slate-600 text-xs font-medium">
              <FileCheck size={18} className="text-emerald-500" /> Instant online approval
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-xs font-medium">
              <HelpCircle size={18} className="text-amber-500" /> Need help? Talk to an expert
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
