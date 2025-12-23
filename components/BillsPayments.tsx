
import React, { useState } from 'react';
import { Zap, Droplets, Smartphone, Tv, ShieldCheck, Loader2, CheckCircle } from 'lucide-react';

interface BillsProps {
  balance: number;
  onPay: (amount: number, name: string) => void;
}

const BillsPayments: React.FC<BillsProps> = ({ balance, onPay }) => {
  const [payingId, setPayingId] = useState<number | null>(null);
  const [paidIds, setPaidIds] = useState<number[]>([]);

  const categories = [
    { name: 'Electricity', icon: <Zap size={24} />, color: 'bg-amber-100 text-amber-600' },
    { name: 'Water', icon: <Droplets size={24} />, color: 'bg-blue-100 text-blue-600' },
    { name: 'Mobile', icon: <Smartphone size={24} />, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'DTH', icon: <Tv size={24} />, color: 'bg-rose-100 text-rose-600' },
    { name: 'Insurance', icon: <ShieldCheck size={24} />, color: 'bg-indigo-100 text-indigo-600' },
  ];

  const recentBills = [
    { id: 1, name: 'BESCOM Electricity', amount: 1240, date: 'Due in 5 days' },
    { id: 2, name: 'Airtel Postpaid', amount: 799, date: 'Due in 2 days' },
    { id: 3, name: 'LIC Policy', amount: 12500, date: 'Due in 15 days' }
  ];

  const handlePay = (id: number, amt: number, name: string) => {
    if (amt > balance) {
      alert("Insufficient balance");
      return;
    }
    setPayingId(id);
    setTimeout(() => {
      onPay(amt, name);
      setPayingId(null);
      setPaidIds(prev => [...prev, id]);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Bill Payments</h2>
        <p className="text-slate-500 text-sm">Pay your utilities instantly and securely. Current Balance: <b className="text-violet-600">₹{balance.toLocaleString()}</b></p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <button key={cat.name} className="bg-white p-6 rounded-[2rem] border border-violet-100 shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center">
            <div className={`p-4 rounded-2xl mb-4 transition-transform group-hover:scale-110 ${cat.color}`}>
              {cat.icon}
            </div>
            <span className="font-bold text-slate-900">{cat.name}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 border border-violet-100 shadow-sm">
        <h3 className="font-bold mb-6 text-black">Upcoming & Recent Bills</h3>
        <div className="space-y-4">
          {recentBills.map(bill => {
            const isPaid = paidIds.includes(bill.id);
            const isPaying = payingId === bill.id;

            return (
              <div key={bill.id} className="flex flex-col sm:flex-row items-center justify-between p-5 bg-violet-50/30 rounded-2xl border border-violet-100 gap-4">
                <div className="text-center sm:text-left">
                  <p className="font-bold text-black">{bill.name}</p>
                  <p className={`text-xs ${isPaid ? 'text-emerald-500 font-bold' : 'text-violet-400'}`}>
                    {isPaid ? 'Payment Successful' : bill.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-black text-black">₹{bill.amount.toLocaleString()}</span>
                  {!isPaid ? (
                    <button 
                      onClick={() => handlePay(bill.id, bill.amount, bill.name)}
                      disabled={isPaying}
                      className="px-6 py-2.5 bg-violet-600 text-white text-xs font-bold rounded-xl hover:bg-violet-700 transition-all flex items-center gap-2 min-w-[110px] justify-center"
                    >
                      {isPaying ? <Loader2 size={14} className="animate-spin" /> : 'Pay Now'}
                    </button>
                  ) : (
                    <div className="px-6 py-2.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-xl flex items-center gap-2">
                      <CheckCircle size={14} /> Paid
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BillsPayments;
