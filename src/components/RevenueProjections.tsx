import React, { useState, useEffect } from 'react';
import { ProjectRecord } from '../types';
import { format, addMonths, isSameMonth } from 'date-fns';
import { FileSpreadsheet, Copy, Check, Plus, ExternalLink, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';
import { ProjectModal } from './ProjectModal';
import { motion, AnimatePresence } from 'motion/react';
import { initAuth, googleSignIn } from '../lib/auth';
import { exportToGoogleSheets } from '../lib/sheets';

interface RevenueProjectionsProps {
  projects: ProjectRecord[];
  onAddProject: (project: ProjectRecord) => void;
}

export function RevenueProjections({ projects, onAddProject }: RevenueProjectionsProps) {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      () => setNeedsAuth(false),
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  const today = new Date();
  
  const months = [
    today,
    addMonths(today, 1),
    addMonths(today, 2),
    addMonths(today, 3)
  ];
  
  const formattedMonths = months.map(m => format(m, 'MMM yyyy'));

  // Calculate summaries
  let totalProjected = 0;
  let ongoingTotal = 0;
  let completedTotal = 0;
  
  const monthlyTotals = [0, 0, 0, 0];

  projects.forEach(p => {
    totalProjected += p.value;
    if (p.status === 'Ongoing') ongoingTotal += p.value;
    if (p.status === 'Completed') completedTotal += p.value;
    
    const projectDate = new Date(p.completionDate);
    months.forEach((monthDate, index) => {
      if (isSameMonth(projectDate, monthDate)) {
        monthlyTotals[index] += p.value;
      }
    });
  });

  const handleExport = async () => {
    if (needsAuth) {
      try {
        await googleSignIn();
      } catch (e) {
        return; // User cancelled or error
      }
    }
    
    const confirmed = window.confirm(
      `This will create a new Google Sheet and export ${projects.length} project(s) to it. Proceed?`
    );
    if (!confirmed) return;

    try {
      setIsExporting(true);
      const url = await exportToGoogleSheets(projects);
      setSheetUrl(url);
    } catch (err) {
      console.error(err);
      alert('Failed to export to Google Sheets.');
    } finally {
      setIsExporting(false);
    }
  };

  const formulasText = `
GOOGLE SHEETS FORMULAS:

1. Current Month Revenue (Assuming Dates in C2:C100, Values in D2:D100):
   =SUMPRODUCT((MONTH(C2:C100)=MONTH(TODAY()))*(YEAR(C2:C100)=YEAR(TODAY())), D2:D100)

2. Next Month Revenue:
   =SUMPRODUCT((MONTH(C2:C100)=MONTH(EDATE(TODAY(),1)))*(YEAR(C2:C100)=YEAR(EDATE(TODAY(),1))), D2:D100)

3. Status Summary (Assuming Status in E2:E100):
   Ongoing:   =SUMIF(E2:E100, "Ongoing", D2:D100)
   Completed: =SUMIF(E2:E100, "Completed", D2:D100)
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(formulasText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={(p) => {
          onAddProject(p);
          setIsModalOpen(false);
        }} 
      />

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#141417] p-5 rounded-lg border border-[#2A2A2E]">
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93] mb-4">Total Pipeline</h3>
          <div className="text-2xl font-mono text-white">₱{totalProjected.toLocaleString()}</div>
        </div>
        <div className="bg-[#141417] p-5 rounded-lg border border-[#2A2A2E]">
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93] mb-4">Completed</h3>
          <div className="text-2xl font-mono text-[#22C55E]">₱{completedTotal.toLocaleString()}</div>
        </div>
        <div className="bg-[#141417] p-5 rounded-lg border border-[#2A2A2E]">
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93] mb-4">Ongoing</h3>
          <div className="text-2xl font-mono text-[#3B82F6]">₱{ongoingTotal.toLocaleString()}</div>
        </div>
        
        <div className="bg-[#141417] p-5 rounded-lg border border-[#2A2A2E] flex flex-col justify-center items-start group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#22C55E08] rounded-full -mr-8 -mt-8"></div>
          <p className="text-[10px] text-[#A0A0A5] italic mb-3">Copy the formulas to implement this in Google Sheets.</p>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-white bg-[#1A1A1F] px-4 py-2 border border-[#2A2A2E] rounded hover:bg-[#2A2A2E] transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-[#22C55E]" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied to Clipboard' : 'Copy Sheet Formulas'}
          </button>
        </div>
      </div>

      {/* Monthly Projections */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {formattedMonths.map((month, idx) => (
          <div key={month} className="bg-[#0A0A0B] p-4 rounded border border-[#2A2A2E]">
            <p className="text-[10px] uppercase tracking-widest text-[#55555A] mb-1">{month}</p>
            <p className="font-mono text-[#E0E0E0]">₱{monthlyTotals[idx].toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Spreadsheet View */}
      <div className="bg-[#141417] rounded-lg border border-[#2A2A2E] overflow-hidden">
        <div className="p-4 border-b border-[#2A2A2E] flex items-center justify-between bg-[#1A1A1F]">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#22C55E]" />
            <h3 className="text-xs font-medium text-white">Revenue Projections Sheet</h3>
          </div>
          <div className="flex items-center gap-2">
            {sheetUrl ? (
              <a href={sheetUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#EAB308] bg-[#EAB30815] px-3 py-1.5 rounded hover:bg-[#EAB30825] border border-[#EAB308]/20 transition-colors">
                <ExternalLink className="w-3 h-3" />
                Open Sheet
              </a>
            ) : (
              <button 
                onClick={handleExport}
                disabled={isExporting}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-[#22C55E] bg-[#22C55E15] px-3 py-1.5 rounded hover:bg-[#22C55E25] border border-[#22C55E]/20 transition-colors disabled:opacity-50"
              >
                {isExporting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <FileSpreadsheet className="w-3 h-3" />}
                {needsAuth ? 'Connect Sheets' : 'Sync to Sheets'}
              </button>
            )}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white bg-[#2A2A2E] px-3 py-1.5 rounded hover:bg-[#3B82F6] border border-[#3B82F6]/20 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add Project
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="text-[10px] text-[#8E8E93] uppercase tracking-widest bg-[#141417] border-b border-[#2A2A2E]">
              <tr>
                <th className="px-5 py-3 font-medium border-r border-[#2A2A2E] w-8 text-center bg-[#0A0A0B]"></th>
                <th className="px-5 py-3 font-medium border-r border-[#2A2A2E]">A - Project Name</th>
                <th className="px-5 py-3 font-medium border-r border-[#2A2A2E]">B - Client</th>
                <th className="px-5 py-3 font-medium border-r border-[#2A2A2E]">C - Est. Completion</th>
                <th className="px-5 py-3 font-medium border-r border-[#2A2A2E]">D - Value (₱)</th>
                <th className="px-5 py-3 font-medium">E - Status</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[11px]">
              <AnimatePresence initial={false}>
                {projects.map((p, idx) => (
                  <motion.tr 
                    key={p.id}
                    initial={{ opacity: 0, backgroundColor: "rgba(34, 197, 94, 0.3)", y: -10 }}
                    animate={{ opacity: 1, backgroundColor: "transparent", y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="border-b border-[#2A2A2E]/50 hover:bg-[#1A1A1F] transition-colors"
                  >
                    <td className="px-5 py-2 text-center text-[#55555A] bg-[#0A0A0B] border-r border-[#2A2A2E]">{projects.length - idx}</td>
                    <td className="px-5 py-2 text-[#E0E0E0] border-r border-[#2A2A2E]">{p.name}</td>
                    <td className="px-5 py-2 text-[#E0E0E0] border-r border-[#2A2A2E]">{p.client}</td>
                    <td className="px-5 py-2 text-[#8E8E93] border-r border-[#2A2A2E]">{format(new Date(p.completionDate), 'MM/dd/yyyy')}</td>
                    <td className="px-5 py-2 text-white border-r border-[#2A2A2E] text-right">{p.value.toLocaleString()}</td>
                    <td className="px-5 py-2">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[9px] uppercase tracking-widest font-sans font-bold",
                        p.status === 'Completed' ? "text-[#22C55E] bg-[#22C55E15]" : "text-[#3B82F6] bg-[#3B82F615]"
                      )}>
                        {p.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {/* Empty rows for effect */}
              {Array.from({ length: 3 }).map((_, i) => (
                <tr key={`empty-${i}`} className="border-b border-[#2A2A2E]/50">
                  <td className="px-5 py-3 text-center text-[#55555A] bg-[#0A0A0B] border-r border-[#2A2A2E]">{projects.length + 2 + i}</td>
                  <td className="border-r border-[#2A2A2E]"></td>
                  <td className="border-r border-[#2A2A2E]"></td>
                  <td className="border-r border-[#2A2A2E]"></td>
                  <td className="border-r border-[#2A2A2E]"></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
