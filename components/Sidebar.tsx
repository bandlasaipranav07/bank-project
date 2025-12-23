
import React from 'react';
import { SIDEBAR_ITEMS } from '../constants';
import { UserRole } from '../types';
import { X, Landmark } from 'lucide-react';

interface SidebarProps {
  role: UserRole;
  currentView: string;
  onViewChange: (view: string) => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, currentView, onViewChange, onClose }) => {
  const items = SIDEBAR_ITEMS[role] || [];

  const handleItemClick = (path: string) => {
    onViewChange(path);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 bg-violet-900/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      <aside className="fixed lg:static z-50 h-full w-72 bg-white border-r border-violet-100 flex flex-col shadow-2xl lg:shadow-none transition-all duration-300">
        <div className="p-6 flex items-center justify-between border-b border-violet-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Landmark size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-slate-900 tracking-tight">Tirumala</h1>
              <p className="text-[10px] uppercase tracking-widest text-amber-500 font-black">Digital Bank</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-violet-400 hover:text-violet-600 bg-violet-50 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {items.map((item) => (
            <button
              key={item.path}
              onClick={() => handleItemClick(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                currentView === item.path
                  ? 'bg-violet-600 text-white font-bold shadow-xl shadow-violet-200'
                  : 'text-violet-400 hover:bg-violet-50 hover:text-violet-900 font-medium'
              }`}
            >
              <span className={`${currentView === item.path ? 'text-white' : 'text-violet-400 group-hover:text-violet-600'}`}>
                {item.icon}
              </span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-violet-50">
          <div className="p-4 bg-gradient-to-br from-violet-50 to-indigo-100/50 rounded-2xl border border-violet-100/50">
            <h4 className="text-[10px] font-black text-violet-800 uppercase mb-1 tracking-wider">Bright Future Initiative</h4>
            <p className="text-[11px] text-violet-900 leading-relaxed font-medium">Empowering education with zero-fee processing and merit rewards.</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;