import React, { useState } from 'react';
import { X, Bot } from 'lucide-react';
import { ContentRecord } from '../types';
import { format, addDays } from 'date-fns';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (content: ContentRecord) => void;
}

export function ContentModal({ isOpen, onClose, onAdd }: ContentModalProps) {
  const [topic, setTopic] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    const newContent: ContentRecord = {
      id: Math.random().toString(36).substr(2, 9),
      topic,
      notebookLmStatus: 'Pending',
      videoStatus: 'Pending',
      youtubeStatus: 'Draft',
      scheduledDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      views: 0
    };

    onAdd(newContent);
    setTopic('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#141417] border border-[#2A2A2E] rounded-lg w-full max-w-md p-6 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#8E8E93] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 mb-6">
          <Bot className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-sm uppercase tracking-widest font-semibold text-white">Queue AI Generation</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
             <label className="block text-[10px] uppercase tracking-widest text-[#8E8E93] mb-1.5">Content Topic / Source Material</label>
             <textarea 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-[#2A2A2E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#3B82F6] transition-colors resize-none h-24"
                placeholder="e.g. Paste link or type topic like '10 Excel formulas for productivity'"
                required
             />
          </div>
          <div className="bg-[#0A0A0B] p-3 border border-[#2A2A2E]/50 rounded text-xs text-[#A0A0A5] leading-relaxed">
             <span className="text-[#3B82F6] font-semibold">Automated Flow:</span> The system will ingest this topic, use NotebookLM to generate audio summaries, render a faceless background video, and schedule it on YouTube.
          </div>
          
          <div className="pt-6 flex justify-end gap-3 border-t border-[#2A2A2E] mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#8E8E93] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-[#3B82F6] text-white rounded hover:bg-[#2563EB] transition-colors"
            >
              Push to Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
