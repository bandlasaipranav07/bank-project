
import React, { useState } from 'react';
import { Award, GraduationCap, Calendar, Users, CheckCircle, Loader2 } from 'lucide-react';

interface ScholarshipsProps {
  onApply: (title: string) => void;
  applications: any[];
}

const Scholarships: React.FC<ScholarshipsProps> = ({ onApply, applications }) => {
  const [applying, setApplying] = useState<string | null>(null);

  const schemes = [
    {
      title: 'Tirumala Merit Grant',
      amount: '₹50,000 / Semester',
      eligibility: '9.0 CGPA + Engineering',
      deadline: 'July 30, 2024'
    },
    {
      title: 'Bright Future Research Fund',
      amount: '₹2,00,000 One-time',
      eligibility: 'Post-graduate Students',
      deadline: 'Aug 15, 2024'
    },
    {
      title: 'STEM Excellence Scholarship',
      amount: 'Full Tuition Fee',
      eligibility: 'Female STEM Applicants',
      deadline: 'June 30, 2024'
    }
  ];

  const handleApply = (title: string) => {
    setApplying(title);
    setTimeout(() => {
      onApply(title);
      setApplying(null);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-amber-200">
        <h2 className="text-3xl font-bold mb-2">Merit Scholarships</h2>
        <p className="opacity-90">Rewarding excellence in education through the Bright Future Initiative.</p>
      </div>

      {applications.length > 0 && (
        <div className="bg-white p-8 rounded-[2.5rem] border border-amber-100 shadow-sm">
          <h3 className="font-bold text-black mb-6">Your Applications</h3>
          <div className="space-y-3">
            {applications.map((app, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-amber-50/30 rounded-2xl border border-amber-100">
                <div>
                  <p className="font-bold text-slate-900">{app.title}</p>
                  <p className="text-xs text-amber-600 font-medium">Applied on: {app.date}</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((s, i) => {
          const isApplied = applications.some(app => app.title === s.title);
          return (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-amber-200 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <Award className="text-amber-500 group-hover:scale-110 transition-transform" size={32} />
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded-md">Open</span>
              </div>
              <h4 className="font-bold text-slate-900 mb-2">{s.title}</h4>
              <p className="text-2xl font-black text-amber-600 mb-4">{s.amount}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Users size={14} className="text-amber-400" /> {s.eligibility}
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Calendar size={14} className="text-amber-400" /> Deadline: {s.deadline}
                </div>
              </div>

              {isApplied ? (
                <div className="w-full py-3 bg-emerald-50 text-emerald-700 font-bold rounded-2xl flex items-center justify-center gap-2">
                  <CheckCircle size={18} /> Application Sent
                </div>
              ) : (
                <button 
                  onClick={() => handleApply(s.title)}
                  disabled={applying === s.title}
                  className="w-full py-3 bg-amber-50 text-amber-700 font-bold rounded-2xl hover:bg-amber-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  {applying === s.title ? <Loader2 size={18} className="animate-spin" /> : 'Apply Now'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Scholarships;
