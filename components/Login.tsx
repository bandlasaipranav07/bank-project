
import React, { useState } from 'react';
import { Landmark, Mail, ShieldCheck, ArrowRight, Loader2, KeyRound, User, Hash, RefreshCw, ChevronLeft } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLoginSuccess: (role: UserRole, name: string, accNo: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Email, Name, Acc, 2: Role, 3: OTP
  const [isResetFlow, setIsResetFlow] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [accNo, setAccNo] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name && accNo) setStep(2);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(3);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(selectedRole, name, accNo);
    }, 1500);
  };

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResetSent(true);
    }, 1500);
  };

  if (isResetFlow) {
    return (
      <div className="min-h-screen bg-[#f3f0ff] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-violet-900/10 border border-violet-100 overflow-hidden">
          <div className="p-8 pb-4 text-center">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto mb-6">
              <RefreshCw size={32} className={loading ? 'animate-spin' : ''} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Securely recover your Tirumala account.</p>
          </div>

          <div className="p-8 pt-4">
            {!resetSent ? (
              <form onSubmit={handleResetRequest} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Registered Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-violet-50/50 border border-violet-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-black font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Account Number</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 100234458821"
                      value={accNo}
                      onChange={(e) => setAccNo(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-violet-50/50 border border-violet-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-black font-semibold"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-violet-200"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : 'Send Reset Link'}
                </button>

                <button 
                  type="button"
                  onClick={() => setIsResetFlow(false)}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-violet-600 transition-colors"
                >
                  <ChevronLeft size={14} /> Back to Login
                </button>
              </form>
            ) : (
              <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Check your inbox</h3>
                  <p className="text-sm text-slate-500 mt-2">We've sent a password reset link to <br/><span className="font-bold text-black">{email}</span>.</p>
                </div>
                <button 
                  onClick={() => { setIsResetFlow(false); setResetSent(false); }}
                  className="w-full py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all shadow-lg"
                >
                  Return to Login
                </button>
              </div>
            )}
          </div>
          <div className="p-6 bg-violet-50 border-t border-violet-100 flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-emerald-500" />
            <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">Secure Recovery Protocol</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f0ff] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-violet-900/10 border border-violet-100 overflow-hidden">
        <div className="p-8 pb-4 text-center">
          <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto mb-6">
            <Landmark size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Tirumala Digital Bank</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Access your fresh digital account.</p>
        </div>

        <div className="p-8 pt-4">
          {step === 1 && (
            <form onSubmit={handleInitialSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" size={18} />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Arjun Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-violet-50/50 border border-violet-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-black font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Account Number</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" size={18} />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 100234458821"
                    value={accNo}
                    onChange={(e) => setAccNo(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-violet-50/50 border border-violet-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-black font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" size={18} />
                  <input 
                    type="email" 
                    required
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-violet-50/50 border border-violet-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-black font-semibold"
                  />
                </div>
              </div>

              <div className="flex justify-end pr-1">
                <button 
                  type="button" 
                  onClick={() => setIsResetFlow(true)}
                  className="text-xs font-bold text-violet-500 hover:text-violet-700 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              
              <button 
                type="submit"
                className="w-full mt-2 py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-violet-200"
              >
                Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <p className="text-sm text-center text-slate-600">Namaste, <span className="font-bold text-black">{name}</span>. Please select your login profile.</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { r: UserRole.CUSTOMER, label: 'Customer' },
                  { r: UserRole.STUDENT, label: 'Student' },
                  { r: UserRole.EMPLOYEE, label: 'Employee' },
                  { r: UserRole.ADMIN, label: 'Admin' }
                ].map((item) => (
                  <button
                    key={item.r}
                    onClick={() => handleRoleSelect(item.r)}
                    className="p-4 bg-violet-50/50 border border-violet-100 rounded-2xl text-sm font-bold text-slate-700 hover:border-violet-500 hover:bg-violet-100 transition-all text-center"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="w-full text-xs font-bold text-slate-400 hover:text-violet-600 transition-colors">Back to Setup</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyRound size={24} />
                </div>
                <h3 className="font-bold text-slate-900">Verify your identity</h3>
                <p className="text-sm text-slate-500 mt-1">We've sent a 6-digit code to {email}.</p>
              </div>

              <div className="flex justify-between gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-14 bg-violet-50/50 border border-violet-100 rounded-xl text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-black"
                  />
                ))}
              </div>

              <button 
                onClick={handleVerify}
                disabled={loading || otp.some(d => !d)}
                className="w-full py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 disabled:opacity-50 disabled:bg-slate-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-200"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Complete Verification <ShieldCheck size={18} /></>}
              </button>

              <button onClick={() => setStep(2)} className="w-full text-xs font-bold text-slate-400 hover:text-violet-600 transition-colors">Change Profile Role</button>
            </div>
          )}
        </div>

        <div className="p-6 bg-violet-50 border-t border-violet-100 flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-emerald-500" />
          <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">RBI Regulated & Blockchain Secured</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
