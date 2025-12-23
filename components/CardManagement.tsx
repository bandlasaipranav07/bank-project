
import React, { useState } from 'react';
import { CreditCard, Shield, Lock, Unlock, Settings, Sliders } from 'lucide-react';

interface CardProps {
  userName: string;
}

const CardManagement: React.FC<CardProps> = ({ userName }) => {
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Card Services</h2>
        <p className="text-slate-500 text-sm">Manage your debit and credit cards with full control.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl h-64 flex flex-col justify-between">
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-10 h-6 bg-amber-400 rounded-sm"></div>
              <span className="text-xs font-bold tracking-widest opacity-80 uppercase">Platinum Debit</span>
            </div>
            <span className="text-lg font-bold">VISA</span>
          </div>
          <div className="relative z-10">
            <p className="text-xl tracking-[0.2em] font-mono mb-4">**** **** **** 8821</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase opacity-60">Card Holder</p>
                <p className="text-sm font-bold uppercase">{userName}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase opacity-60">Expires</p>
                <p className="text-sm font-bold">08/29</p>
              </div>
            </div>
          </div>
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm space-y-6">
          <h3 className="font-bold flex items-center gap-2">
            <Settings size={20} className="text-blue-600" /> Controls & Security
          </h3>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isBlocked ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {isBlocked ? <Lock size={18} /> : <Unlock size={18} />}
              </div>
              <div>
                <p className="text-sm font-bold">Card Blocking</p>
                <p className="text-xs text-slate-500">{isBlocked ? 'Card is currently inactive' : 'Card is active'}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsBlocked(!isBlocked)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                isBlocked ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}
            >
              {isBlocked ? 'Unblock Card' : 'Block Card'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold">Spending Limit</span>
              <span className="text-sm font-bold text-blue-600">₹ 50,000</span>
            </div>
            <input type="range" className="w-full accent-blue-600" min="5000" max="200000" />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Min: ₹5k</span>
              <span>Max: ₹2L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardManagement;
