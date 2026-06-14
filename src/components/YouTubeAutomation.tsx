import React, { useState } from 'react';
import { ContentRecord } from '../types';
import { Youtube, Cpu, FileAudio, PlaySquare, CalendarClock, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';
import { ContentModal } from './ContentModal';
import { motion, AnimatePresence } from 'motion/react';

interface YouTubeAutomationProps {
  content: ContentRecord[];
  onAddContent: (content: ContentRecord) => void;
}

export function YouTubeAutomation({ content, onAddContent }: YouTubeAutomationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const publishedViews = content.reduce((sum, item) => sum + item.views, 0);
  const pendingVideos = content.filter(c => c.youtubeStatus !== 'Published').length;

  return (
    <div className="space-y-6">
      <ContentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={(c) => {
          onAddContent(c);
          setIsModalOpen(false);
        }} 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141417] p-5 rounded-lg border border-[#2A2A2E] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93]">Total Views</h3>
            <div className="p-1.5 bg-[#EF444415] text-[#EF4444] rounded">
              <Youtube className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-mono text-white">{publishedViews.toLocaleString()}</div>
            <p className="text-xs text-[#55555A] mt-1 text-right border-t border-[#2A2A2E] pt-2">All-time automated views</p>
          </div>
        </div>

        <div className="bg-[#141417] p-5 rounded-lg border border-[#2A2A2E] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93]">Videos in Pipeline</h3>
            <div className="p-1.5 bg-[#3B82F615] text-[#3B82F6] rounded">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div>
             <div className="text-2xl font-mono text-white">{pendingVideos}</div>
             <p className="text-xs text-[#55555A] mt-1 text-right border-t border-[#2A2A2E] pt-2">Pending / Scheduled</p>
          </div>
        </div>

        <div className="bg-[#0A0A0B] border border-[#3B82F630] p-5 rounded-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#3B82F608] rounded-full -mr-12 -mt-12"></div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#3B82F6] mb-2 relative z-10">Automation Setup</h3>
          <p className="text-xs leading-relaxed text-[#A0A0A5] italic relative z-10">
            Pipeline active: Google Docs notes ➔ NotebookLM (Audio Generation) ➔ Faceless Video Renderer ➔ YouTube Auto-Publish API.
          </p>
          <div className="mt-4 pt-4 border-t border-[#2A2A2E] flex justify-between items-center relative z-10">
             <span className="text-[10px] font-mono text-[#55555A]">STATUS: OPERATIONAL</span>
          </div>
        </div>
      </div>

      <div className="bg-[#141417] rounded-lg border border-[#2A2A2E] overflow-hidden">
         <div className="p-4 border-b border-[#2A2A2E] bg-[#1A1A1F] flex items-center justify-between">
            <div className="flex items-center gap-2">
               <Cpu className="w-4 h-4 text-[#8E8E93]" />
               <h3 className="text-xs font-semibold text-white">NotebookLM Content Pipeline</h3>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold text-white bg-[#2A2A2E] px-3 py-1.5 rounded hover:bg-[#3B82F6] border border-[#3B82F6]/20 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Queue Topic
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap text-xs">
               <thead className="text-[10px] text-[#55555A] uppercase tracking-widest bg-[#0A0A0B] border-b border-[#2A2A2E]">
                  <tr>
                     <th className="px-5 py-3 font-medium">Topic / Strategy</th>
                     <th className="px-5 py-3 font-medium text-center">NotebookLM Voice</th>
                     <th className="px-5 py-3 font-medium text-center">Video Render</th>
                     <th className="px-5 py-3 font-medium text-center">YouTube Publish</th>
                     <th className="px-5 py-3 font-medium text-right">Schedule/Stats</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-[#2A2A2E]">
                  <AnimatePresence initial={false}>
                    {content.map((item) => (
                       <motion.tr 
                          key={item.id} 
                          initial={{ opacity: 0, backgroundColor: "rgba(59, 130, 246, 0.3)", y: -10 }}
                          animate={{ opacity: 1, backgroundColor: "transparent", y: 0 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                          className="hover:bg-[#1A1A1F]/50 transition-colors"
                       >
                          <td className="px-5 py-3 font-medium text-[#E0E0E0]">{item.topic}</td>
                          <td className="px-5 py-3 text-center">
                             <span className={cn(
                                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold",
                                item.notebookLmStatus === 'Generated' ? "text-[#22C55E] bg-[#22C55E15]" : "text-[#55555A] bg-[#2A2A2E]"
                             )}>
                                <FileAudio className="w-3 h-3" />
                                {item.notebookLmStatus}
                             </span>
                          </td>
                          <td className="px-5 py-3 text-center">
                             <span className={cn(
                                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold",
                                item.videoStatus === 'Ready' ? "text-[#22C55E] bg-[#22C55E15]" : 
                                item.videoStatus === 'Rendering' ? "text-[#3B82F6] bg-[#3B82F615]" : "text-[#55555A] bg-[#2A2A2E]"
                             )}>
                                <PlaySquare className="w-3 h-3" />
                                {item.videoStatus}
                             </span>
                          </td>
                          <td className="px-5 py-3 text-center">
                             <span className={cn(
                                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold",
                                item.youtubeStatus === 'Published' ? "text-[#22C55E] bg-[#22C55E15]" : 
                                item.youtubeStatus === 'Scheduled' ? "text-[#EAB308] bg-[#EAB30815]" : "text-[#55555A] bg-[#2A2A2E]"
                             )}>
                                <Youtube className="w-3 h-3" />
                                {item.youtubeStatus}
                             </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                             {item.youtubeStatus === 'Published' ? (
                                <div className="flex flex-col items-end">
                                   <span className="text-[10px] text-[#55555A] mb-0.5 uppercase tracking-widest">Views</span>
                                   <span className="font-mono font-medium text-[#E0E0E0]">{item.views.toLocaleString()}</span>
                                </div>
                             ) : (
                                <div className="flex flex-col items-end">
                                   <span className="text-[10px] text-[#55555A] mb-0.5 uppercase tracking-widest">Date</span>
                                   <span className="font-mono text-[#8E8E93] flex items-center gap-1">
                                      <CalendarClock className="w-3 h-3" />
                                      {format(new Date(item.scheduledDate), 'MMM d, yyyy')}
                                   </span>
                                </div>
                             )}
                          </td>
                       </motion.tr>
                    ))}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
