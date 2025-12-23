
import React, { useState, useEffect } from 'react';
import { UserRole, Transaction, LoanApplication, Deposit, BalanceSnapshot } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Loans from './components/Loans';
import Transfers from './components/Transfers';
import BlockchainExplorer from './components/BlockchainExplorer';
import Chatbot from './components/Chatbot';
import BillsPayments from './components/BillsPayments';
import CardManagement from './components/CardManagement';
import VerificationQueue from './components/VerificationQueue';
import AdminDashboard from './components/AdminDashboard';
import Scholarships from './components/Scholarships';
import Deposits from './components/Deposits';
import BalanceHistory from './components/BalanceHistory';
import Login from './components/Login';
import { MOCK_TRANSACTIONS } from './constants';
import { FileDown, Search, Filter, ShieldCheck, History, ExternalLink, Copy } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [userName, setUserName] = useState('');
  const [accountNumber, setAccountNumber] = useState('100234458821');
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [balance, setBalance] = useState(50000.00);
  
  // Real-time Data State
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS as Transaction[]);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [balanceHistory, setBalanceHistory] = useState<BalanceSnapshot[]>([
    { date: '2024-05-15', balance: 45000, changeReason: 'Initial Account State' },
    { date: '2024-05-16', balance: 50000, changeReason: 'System Transfer Reward' }
  ]);
  
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([
    { id: 'APP101', applicantName: 'Sneha Rao', loanType: 'Student Loan', amount: 500000, status: 'PENDING', dateApplied: '2024-05-20', kycStatus: 'VERIFIED' },
    { id: 'APP102', applicantName: 'Rahul V.', loanType: 'Home Loan', amount: 2500000, status: 'PENDING', dateApplied: '2024-05-21', kycStatus: 'PENDING' }
  ]);
  const [kycStatus, setKycStatus] = useState<'VERIFIED' | 'PENDING' | 'FAILED'>('VERIFIED');
  const [scholarshipApps, setScholarshipApps] = useState<any[]>([]);
  
  // Admin-specific state
  const [users, setUsers] = useState([
    { id: 'U1', name: 'Arjun Sharma', role: UserRole.CUSTOMER, status: 'Active' },
    { id: 'U2', name: 'Sneha Rao', role: UserRole.STUDENT, status: 'Active' },
    { id: 'U3', name: 'Employee One', role: UserRole.EMPLOYEE, status: 'Active' },
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      if (role === UserRole.EMPLOYEE) setCurrentView('verification');
      else if (role === UserRole.ADMIN) setCurrentView('admin-dash');
      else if (role === UserRole.STUDENT) setCurrentView('dashboard');
      else setCurrentView('dashboard');
    }
  }, [role, isAuthenticated]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const recordBalanceSnapshot = (newBalance: number, reason: string) => {
    const snap: BalanceSnapshot = {
      date: new Date().toISOString().split('T')[0],
      balance: newBalance,
      changeReason: reason
    };
    setBalanceHistory(prev => [...prev, snap]);
  };

  const handleLogin = (selectedRole: UserRole, name: string, accNo: string) => {
    setRole(selectedRole);
    setUserName(name || 'User');
    setAccountNumber(accNo || '100234458821');
    setIsAuthenticated(true);
    if (!users.find(u => u.name === name)) {
      setUsers(prev => [...prev, { id: `U${prev.length + 1}`, name, role: selectedRole, status: 'Active' }]);
    }
  };

  const addTransaction = (description: string, amount: number, type: 'DEBIT' | 'CREDIT') => {
    const newTxn: Transaction = {
      id: `TXN${Math.floor(Math.random() * 9000) + 1000}`,
      date: new Date().toISOString().split('T')[0],
      description,
      amount,
      type,
      status: 'VERIFIED_ON_BLOCKCHAIN',
      hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`
    };
    setTransactions(prev => [newTxn, ...prev]);
    
    let newBal = balance;
    if (type === 'DEBIT') newBal -= amount;
    else newBal += amount;
    
    setBalance(newBal);
    recordBalanceSnapshot(newBal, description);
  };

  const createDeposit = (type: 'FIXED' | 'RECURRING', amount: number) => {
    const newDeposit: Deposit = {
      id: `DEP${Math.floor(Math.random() * 9000) + 1000}`,
      type,
      principal: amount,
      interestRate: type === 'FIXED' ? 7.5 : 7.2,
      maturityDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'ACTIVE'
    };
    setDeposits(prev => [...prev, newDeposit]);
    addTransaction(`Opened ${type} Deposit`, amount, 'DEBIT');
  };

  const applyForLoan = (loanType: string, amount: number) => {
    const newApp: LoanApplication = {
      id: `APP${Math.floor(Math.random() * 900) + 100}`,
      applicantName: userName,
      loanType,
      amount,
      status: 'PENDING',
      dateApplied: new Date().toISOString().split('T')[0],
      kycStatus: kycStatus
    };
    setLoanApplications(prev => [newApp, ...prev]);
  };

  const updateLoanStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setLoanApplications(prev => prev.map(app => {
       if (app.id === id) {
         if (status === 'APPROVED' && app.applicantName === userName) {
            addTransaction(`Loan Payout: ${app.loanType}`, app.amount, 'CREDIT');
         }
         return { ...app, status };
       }
       return app;
    }));
  };

  const applyForScholarship = (title: string) => {
    setScholarshipApps(prev => [...prev, { title, date: new Date().toLocaleDateString(), status: 'REVIEW' }]);
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': 
        return (
          <Dashboard 
            role={role} 
            balance={balance} 
            userName={userName} 
            accountNumber={accountNumber} 
            transactions={transactions} 
            onNavigate={setCurrentView}
            onApplyLoan={applyForLoan}
          />
        );
      case 'deposits':
        return <Deposits balance={balance} deposits={deposits} onCreateDeposit={createDeposit} />;
      case 'balance-history':
        return <BalanceHistory history={balanceHistory} />;
      case 'loans': 
      case 'approvals':
        return <Loans role={role} onApply={applyForLoan} applications={loanApplications.filter(a => a.applicantName === userName || role === UserRole.EMPLOYEE || role === UserRole.ADMIN)} />;
      case 'transfers': 
        return <Transfers balance={balance} onTransfer={(amt, desc) => addTransaction(`Transfer: ${desc}`, amt, 'DEBIT')} />;
      case 'blockchain': 
        return <BlockchainExplorer transactions={transactions} />;
      case 'bills':
        return <BillsPayments balance={balance} onPay={(amt, name) => addTransaction(`Bill Pay: ${name}`, amt, 'DEBIT')} />;
      case 'cards':
        return <CardManagement userName={userName} />;
      case 'scholarships':
        return <Scholarships onApply={applyForScholarship} applications={scholarshipApps} />;
      case 'verification':
        return <VerificationQueue role={role} applications={loanApplications} onAction={updateLoanStatus} />;
      case 'admin-dash':
      case 'users':
      case 'config':
        return <AdminDashboard transactions={transactions} loans={loanApplications} users={users} onDeleteUser={deleteUser} activeView={currentView} />;
      case 'statements':
      case 'transactions':
      case 'audit':
      case 'support':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="bg-white rounded-[2.5rem] p-8 border border-violet-100 shadow-sm overflow-hidden">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                      <History className="text-violet-600" size={24} />
                      {currentView === 'statements' ? 'Account Statement' : 
                       currentView === 'transactions' ? 'Transaction Monitoring' : 
                       currentView === 'audit' ? 'System Audit Ledger' : 'Support Audit Trail'}
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {role === UserRole.ADMIN ? 'Complete immutable records of system activity' : 'Your recent financial activity and verified logs'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-violet-400 w-full md:w-48" />
                    </div>
                    <button className="p-2 bg-violet-50 text-violet-600 rounded-xl border border-violet-100 hover:bg-violet-100 transition-all">
                      <Filter size={18} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all shadow-md">
                      <FileDown size={14} /> Export
                    </button>
                  </div>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead className="bg-violet-50/30 border-b border-violet-100">
                     <tr>
                       <th className="px-6 py-4 text-[10px] font-black text-violet-400 uppercase tracking-widest">Transaction Details</th>
                       <th className="px-6 py-4 text-[10px] font-black text-violet-400 uppercase tracking-widest text-center">Status</th>
                       <th className="px-6 py-4 text-[10px] font-black text-violet-400 uppercase tracking-widest">Blockchain Hash</th>
                       <th className="px-6 py-4 text-[10px] font-black text-violet-400 uppercase tracking-widest text-right">Amount (₹)</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-violet-50">
                     {transactions.length > 0 ? transactions.map(t => (
                       <tr key={t.id} className="hover:bg-violet-50/20 transition-all group">
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${t.type === 'DEBIT' ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                {t.type === 'DEBIT' ? <History size={18} /> : <ShieldCheck size={18} />}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-900">{t.description}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.date}</span>
                                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                  <span className="text-[10px] text-violet-500 font-black tracking-widest">{t.id}</span>
                                </div>
                              </div>
                            </div>
                         </td>
                         <td className="px-6 py-5 text-center">
                            <span className={`px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest border ${
                              t.status === 'VERIFIED_ON_BLOCKCHAIN' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                              t.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-500 border-slate-200'
                            }`}>
                              {t.status.replace(/_/g, ' ')}
                            </span>
                         </td>
                         <td className="px-6 py-5">
                           {t.hash ? (
                             <div className="flex items-center gap-2 group/hash">
                               <span className="text-[10px] font-mono font-bold text-violet-400 bg-violet-50 px-2 py-1 rounded-md truncate max-w-[120px]" title={t.hash}>
                                 {t.hash}
                               </span>
                               <button className="p-1 opacity-0 group-hover/hash:opacity-100 transition-opacity text-violet-400 hover:text-violet-600">
                                 <Copy size={12} />
                               </button>
                               <button className="p-1 opacity-0 group-hover/hash:opacity-100 transition-opacity text-violet-400 hover:text-violet-600">
                                 <ExternalLink size={12} />
                               </button>
                             </div>
                           ) : (
                             <span className="text-[10px] text-slate-300 font-bold italic">N/A</span>
                           )}
                         </td>
                         <td className="px-6 py-5 text-right">
                            <p className={`font-black text-sm ${t.type === 'DEBIT' ? 'text-slate-900' : 'text-emerald-600'}`}>
                              {t.type === 'DEBIT' ? '-' : '+'} {t.amount.toLocaleString()}
                            </p>
                         </td>
                       </tr>
                     )) : (
                       <tr>
                         <td colSpan={4} className="text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                           <History className="mx-auto text-slate-300 mb-2" size={48} />
                           <p className="text-slate-400 font-medium italic">No activity recorded for this period.</p>
                         </td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
             </div>
          </div>
        );
      default: 
        return <Dashboard role={role} balance={balance} userName={userName} accountNumber={accountNumber} transactions={transactions} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f3f0ff] text-slate-900 overflow-hidden">
      {isSidebarOpen && (
        <Sidebar 
          role={role} 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          role={role} 
          userName={userName}
          accountNumber={accountNumber}
          onRoleChange={setRole} 
          onLogout={() => setIsAuthenticated(false)}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="h-1 bg-gradient-to-r from-violet-600 via-amber-400 to-violet-600 rounded-full mb-6 opacity-30"></div>
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      <Chatbot role={role} />
    </div>
  );
};

export default App;
