
import React from 'react';
import { UserRole } from '../types';
import { Bell, Search, UserCircle, Globe, LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  role: UserRole;
  userName: string;
  accountNumber: string;
  onRoleChange: (role: UserRole) => void;
  onLogout: () => void;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ role, userName, accountNumber, onRoleChange, onLogout, onMenuToggle }) => {
  return (
    <header className="h-20 bg-white border-b border-violet-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 text-violet-500 hover:bg-violet-50 rounded-xl transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="flex-1 max-w-md hidden md:flex items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-400" size={18} />
            <input 
              type="text" 
              placeholder="Search services..." 
              className="w-full pl-10 pr-4 py-2 bg-violet-50/30 border border-violet-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 font-medium"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <div className="hidden lg:flex items-center bg-violet-50/50 rounded-lg p-1 border border-violet-100">
          {Object.values(UserRole).map((r) => (
            <button
              key={r}
              onClick={() => onRoleChange(r)}
              className={`px-3 py-1.5 text-[10px] font-bold rounded-md uppercase tracking-wider transition-all ${
                role === r 
                ? 'bg-white text-violet-600 shadow-sm' 
                : 'text-violet-400 hover:text-violet-800'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="hidden sm:block p-2 text-violet-400 hover:bg-violet-50 rounded-full transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-violet-100 mx-1 hidden sm:block"></div>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-black leading-tight">{userName || 'Arjun Sharma'}</p>
              <p className="text-[10px] text-violet-500 font-bold tracking-wider uppercase">A/C: {accountNumber}</p>
            </div>
            
            <div className="group relative">
              <button className="w-10 h-10 bg-violet-50 rounded-full flex items-center justify-center text-violet-600 border border-violet-100 hover:bg-violet-100 transition-all">
                <UserCircle size={24} />
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-violet-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-50">
                <div className="px-4 py-2 sm:hidden border-b border-violet-50 mb-1">
                  <p className="text-xs font-bold text-black truncate">{userName}</p>
                  <p className="text-[9px] font-bold text-violet-500 truncate">{accountNumber}</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;