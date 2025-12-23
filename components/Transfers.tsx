
import React, { useState } from 'react';
import { ArrowRightLeft, ShieldCheck, Landmark, Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface TransfersProps {
  balance: number;
  onTransfer: (amount: number, description: string) => void;
}

const Transfers: React.FC<TransfersProps> = ({ balance, onTransfer }) => {
  const [method, setMethod] = useState<'IMPS' | 'NEFT' | 'RTGS'>('IMPS');
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Form, 2: Loading/Review, 3: Success
  const [amount, setAmount] = useState('');
  const [beneficiary, setBeneficiary] = useState('');

  const handleTransfer = () => {
    const amt = Number(amount);
    if (!amt || amt <= 0 || amt > balance) {
      alert("Invalid amount or insufficient balance");
      return;
    }
    setStep(2);
    setTimeout(() => {
      onTransfer(amt, `${method} to ${beneficiary}`);
      setStep(3);
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-6 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Transfer Successful</h2>
          <p className="text-slate-500 mt-2 font-medium">₹{Number(amount).toLocaleString()} has been sent to <b className="text-black">{beneficiary || 'beneficiary'}</b>.</p>
        </div>
        <div className="p-6 bg-white border border-violet-100 rounded-3xl text-left space-y-3">
          <div className="flex justify-between text-xs font-bold text-violet-400 uppercase tracking-widest">
            <span>Transaction ID</span>
            <span className="text-slate-900 font-mono font-bold">TXN{Math.floor(Math.random() * 100000)}</span>
          </div>
          <div className="flex justify-between text-xs font-bold text-violet-400 uppercase tracking-widest">
            <span>Verified On</span>
            <span className="text-violet-600 font-bold">ETHEREUM BLOCKCHAIN</span>
          </div>
        </div>
        <button 
          onClick={() => { setStep(1); setAmount(''); setBeneficiary(''); }}
          className="w-full py-4 bg-violet-600 text-white font-bold rounded-2xl shadow-lg hover:bg-violet-700 transition-all"
        >
          Make Another Transfer
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Fund Transfers</h2>
        <p className="text-slate-500 text-sm font-medium">Secure and instant money movement with blockchain verification.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] p-8 border border-violet-100 shadow-sm space-y-8 relative">
          {step === 2 && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-[2.5rem]">
              <Loader2 className="animate-spin text-violet-600 mb-4" size={48} />
              <p className="font-bold text-slate-900">Processing Secure Transfer...</p>
              <p className="text-xs text-violet-500 mt-1 font-bold uppercase">Verifying with blockchain nodes</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex items-center gap-2 p-1 bg-violet-50/50 rounded-2xl border border-violet-100">
              {(['IMPS', 'NEFT', 'RTGS'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                    method === m 
                    ? 'bg-white text-violet-600 shadow-sm' 
                    : 'text-violet-400 hover:text-violet-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-violet-400 uppercase tracking-widest ml-1">To Beneficiary</label>
                <div className="relative">
                  <Landmark size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400" />
                  <select 
                    value={beneficiary}
                    onChange={(e) => setBeneficiary(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-violet-50/30 border border-violet-100 rounded-2xl text-sm focus:outline-none focus:border-violet-500 transition-all appearance-none text-black font-semibold"
                  >
                    <option value="">Select Beneficiary</option>
                    <option value="Ramesh Kumar">Ramesh Kumar (SBI - 2234)</option>
                    <option value="Sita Devi">Sita Devi (HDFC - 8812)</option>
                    <option value="Amit Bansal">Amit Bansal (Tirumala - 0091)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-violet-400 uppercase tracking-widest ml-1">Amount (INR)</label>
                  <span className="text-[10px] font-bold text-violet-600 uppercase">Bal: ₹{balance.toLocaleString()}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black font-bold">₹</span>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-violet-50/30 border border-violet-100 rounded-2xl text-sm focus:outline-none focus:border-violet-500 transition-all text-black font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-violet-400 uppercase tracking-widest ml-1">Remark (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Rent Payment"
                  className="w-full px-4 py-4 bg-violet-50/30 border border-violet-100 rounded-2xl text-sm focus:outline-none focus:border-violet-500 transition-all text-black font-semibold"
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleTransfer}
            disabled={!amount || !beneficiary}
            className="w-full py-4 bg-violet-600 text-white font-bold rounded-2xl shadow-lg hover:bg-violet-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            Review Transfer <Send size={18} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-violet-50/50 rounded-[2.5rem] p-8 border border-violet-100">
            <h4 className="font-bold text-violet-900 mb-4 flex items-center gap-2">
              <ShieldCheck size={20} className="text-violet-600" /> Transaction Security
            </h4>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white border border-violet-100 rounded-xl flex items-center justify-center text-violet-600 shrink-0 shadow-sm">
                  <ArrowRightLeft size={18} />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-violet-900">Blockchain Validation</h5>
                  <p className="text-xs text-violet-700/70 mt-1 font-medium italic">This transaction will be hashed and verified on the Ethereum mainnet for immutability.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white border border-violet-100 rounded-xl flex items-center justify-center text-violet-600 shrink-0 shadow-sm">
                  <AlertCircle size={18} />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-violet-900">Fraud Protection</h5>
                  <p className="text-xs text-violet-700/70 mt-1 font-medium italic">AI monitors this transfer for unusual patterns to prevent unauthorized access.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfers;
