
import React from 'react';
import { Transaction } from '../types';
import { ShieldCheck, Link as LinkIcon, Cpu, Database, ExternalLink, Box, Activity } from 'lucide-react';

interface ExplorerProps {
  transactions: Transaction[];
}

const BlockchainExplorer: React.FC<ExplorerProps> = ({ transactions }) => {
  const verifiedTxns = transactions.filter(t => t.status === 'VERIFIED_ON_BLOCKCHAIN');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <ShieldCheck className="text-emerald-600" /> Immutable Audit Ledger
          </h2>
          <p className="text-slate-500 text-sm">Powered by Ethereum Mainnet for Tirumala Bank Transaction Integrity.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100 shadow-sm">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
          Chain Status: Operational
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-violet-100 rounded-3xl p-6 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl">
            <Box size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Latest Block</p>
            <h4 className="text-xl font-black text-black">#19824{Math.floor(Math.random() * 9)}</h4>
          </div>
        </div>
        <div className="bg-white border border-violet-100 rounded-3xl p-6 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Network Hashrate</p>
            <h4 className="text-xl font-black text-black">1.2 PetaHash</h4>
          </div>
        </div>
        <div className="bg-white border border-violet-100 rounded-3xl p-6 flex items-center gap-4 shadow-sm">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Database size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Total Verified TXs</p>
            <h4 className="text-xl font-black text-black">{verifiedTxns.length}</h4>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-violet-100 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-violet-50 flex justify-between items-center bg-violet-50/20">
          <h3 className="font-bold flex items-center gap-2 text-black">
            <LinkIcon size={20} className="text-violet-600" /> Transaction Verification Log
          </h3>
          <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">ETHEREUM MAINNET SYNC</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-violet-400 uppercase tracking-widest border-b border-violet-100">
                <th className="px-8 py-4">TX Hash</th>
                <th className="px-8 py-4">Block ID</th>
                <th className="px-8 py-4">Tirumala TX ID</th>
                <th className="px-8 py-4">Timestamp</th>
                <th className="px-8 py-4 text-center">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-violet-50">
              {verifiedTxns.length > 0 ? verifiedTxns.map((txn) => (
                <tr key={txn.id} className="hover:bg-violet-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs font-mono text-violet-600 font-bold">{txn.hash || `0x${Math.random().toString(16).slice(2, 10)}...`}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-xs font-mono text-slate-400">#19824{Math.floor(Math.random() * 9)}</td>
                  <td className="px-8 py-5 text-sm font-bold text-black">{txn.id}</td>
                  <td className="px-8 py-5 text-xs text-slate-500 font-medium">{txn.date}</td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-violet-600 hover:text-white transition-all">
                        <ExternalLink size={12} /> Etherscan
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-medium italic">
                    No verified blockchain records found in current session.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-8 bg-violet-900 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-md">
          <ShieldCheck size={48} className="text-emerald-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold mb-2">Transparency & Trust</h4>
          <p className="text-violet-200 text-sm leading-relaxed max-w-2xl">
            Tirumala Bank uses decentralized ledger technology to ensure your financial records are tamper-proof. Every major transaction generates a unique cryptographic hash that is stored both in our secure database and on the Ethereum blockchain for multi-layer auditability.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlockchainExplorer;
