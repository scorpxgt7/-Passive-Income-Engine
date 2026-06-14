import React, { useState } from 'react';
import { initialTasks, mockProducts, mockTransactions, projectionData, mockProjects as initialProjects, mockContent } from '../data';
import { Checklist } from './Checklist';
import { TransactionsTable } from './TransactionsTable';
import { AssetsList } from './AssetsList';
import { RevenueChart } from './RevenueChart';
import { RevenueProjections } from './RevenueProjections';
import { YouTubeAutomation } from './YouTubeAutomation';
import { DriveFiles } from './DriveFiles';
import { Target, TrendingUp, Zap, CalendarDays, BarChart3, FileSpreadsheet, Youtube, HardDrive } from 'lucide-react';
import { cn } from '../lib/utils';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'monitor' | 'projections' | 'automation' | 'drive'>('monitor');
  const [projects, setProjects] = useState(initialProjects);
  const [content, setContent] = useState(mockContent);
  const currentWeekRevenue = 1500;
  const targetRevenue = 10000;
  const progressPercent = Math.min(100, Math.round((currentWeekRevenue / targetRevenue) * 100));

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E0E0E0] pb-12 font-sans">
      {/* Header */}
      <header className="border-b border-[#2A2A2E] sticky top-0 z-10 bg-[#0A0A0B]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-xs uppercase tracking-[0.3em] text-[#8E8E93] mb-1 font-semibold">Passive Income Engine</h1>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#22C55E]" />
              <p className="text-2xl font-serif italic text-white tracking-tight">System Architect</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-right">
             <div className="hidden md:flex gap-8 border-r border-[#2A2A2E] pr-8 mr-4">
               <div>
                 <p className="text-[10px] uppercase tracking-widest text-[#8E8E93] mb-0.5">Weekly Target</p>
                 <p className="text-lg font-mono text-white">₱10,000.00</p>
               </div>
               <div>
                 <p className="text-[10px] uppercase tracking-widest text-[#8E8E93] mb-0.5">Projected 6M ROI</p>
                 <p className="text-lg font-mono text-[#22C55E]">+420%</p>
               </div>
             </div>
             
             <div className="bg-[#141417] border border-[#2A2A2E] rounded-md p-1 flex gap-1">
               <button 
                 onClick={() => setActiveTab('monitor')}
                 className={cn(
                   "flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-colors",
                   activeTab === 'monitor' ? "bg-[#2A2A2E] text-white" : "text-[#8E8E93] hover:text-[#E0E0E0]"
                 )}
               >
                 <BarChart3 className="w-4 h-4" />
                 <span className="hidden sm:inline">Monitor</span>
               </button>
               <button 
                 onClick={() => setActiveTab('projections')}
                 className={cn(
                   "flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-colors",
                   activeTab === 'projections' ? "bg-[#2A2A2E] text-white" : "text-[#8E8E93] hover:text-[#E0E0E0]"
                 )}
               >
                 <FileSpreadsheet className="w-4 h-4" />
                 <span className="hidden sm:inline">Projections</span>
               </button>
               <button 
                 onClick={() => setActiveTab('automation')}
                 className={cn(
                   "flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-colors",
                   activeTab === 'automation' ? "bg-[#2A2A2E] text-white" : "text-[#8E8E93] hover:text-[#E0E0E0]"
                 )}
               >
                 <Youtube className="w-4 h-4" />
                 <span className="hidden sm:inline">Automation</span>
               </button>
               <button 
                 onClick={() => setActiveTab('drive')}
                 className={cn(
                   "flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-colors",
                   activeTab === 'drive' ? "bg-[#2A2A2E] text-white" : "text-[#8E8E93] hover:text-[#E0E0E0]"
                 )}
               >
                 <HardDrive className="w-4 h-4" />
                 <span className="hidden sm:inline">Drive</span>
               </button>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {activeTab === 'monitor' ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#141417] p-5 rounded-lg border border-[#2A2A2E]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93]">Weekly Revenue</h3>
                  <div className="p-1.5 bg-[#22C55E15] text-[#22C55E] rounded">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono text-white">₱{currentWeekRevenue.toLocaleString()}</span>
                </div>
                <div className="mt-4 w-full h-1 bg-[#1A1A1F] rounded-full overflow-hidden">
                  <div className="h-full bg-[#22C55E]" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div className="bg-[#141417] p-5 rounded-lg border border-[#2A2A2E]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93]">Active Projects</h3>
                  <div className="p-1.5 bg-[#3B82F615] text-[#3B82F6] rounded">
                    <Target className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono text-white">
                    {projects.filter(p => p.status === 'Ongoing').length}
                  </span>
                  <span className="text-xs text-[#55555A]">Ongoing</span>
                </div>
                <div className="mt-4 w-full h-1 bg-[#1A1A1F] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3B82F6]" style={{ width: '80%' }}></div>
                </div>
              </div>

              <div className="bg-[#141417] p-5 rounded-lg border border-[#2A2A2E] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#EAB30808] rounded-full -mr-12 -mt-12"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93]">Monthly Projection</h3>
                  <div className="p-1.5 bg-[#EAB30815] text-[#EAB308] rounded">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-col gap-2 relative z-10">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-mono text-white">₱45,000</span>
                  </div>
                  <div className="mt-1 w-full h-1 bg-[#1A1A1F] rounded-full overflow-hidden">
                    <div className="h-full bg-[#EAB308] rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts & Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-[#141417] p-5 rounded-lg border border-[#2A2A2E]">
                  <div className="mb-2">
                    <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93] mb-1">Projected Revenue Growth</h3>
                    <p className="text-xs text-[#55555A]">Baseline: 20 sales/week @ ₱500</p>
                  </div>
                  <RevenueChart data={projectionData} />
                </div>
                
                <TransactionsTable transactions={mockTransactions} />
              </div>
              
              <div className="lg:col-span-1 space-y-8">
                <Checklist initialTasks={initialTasks} />
                <AssetsList products={mockProducts} />
              </div>
            </div>
          </>
        ) : activeTab === 'projections' ? (
          <RevenueProjections 
            projects={projects} 
            onAddProject={(p) => setProjects(prev => [p, ...prev])} 
          />
        ) : activeTab === 'automation' ? (
          <YouTubeAutomation 
            content={content} 
            onAddContent={(c) => setContent(prev => [c, ...prev])} 
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            <DriveFiles />
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex justify-between items-center text-[10px] uppercase tracking-widest text-[#55555A] border-t border-[#2A2A2E] pt-4">
        <div className="flex gap-6">
          <span>Session ID: SA-992-B</span>
          <span>Monitor: Enabled</span>
          <span>Stack: G-Workspace + AppSheet</span>
        </div>
        <div className="text-[#8E8E93]">Target: 172 Days to Milestone</div>
      </footer>
    </div>
  );
}
