import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ProjectRecord } from '../types';
import { format, addMonths } from 'date-fns';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: ProjectRecord) => void;
}

export function ProjectModal({ isOpen, onClose, onAdd }: ProjectModalProps) {
  const [name, setName] = useState('');
  const [client, setClient] = useState('');
  const [value, setValue] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !client || !value) return;

    const newProject: ProjectRecord = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      client,
      completionDate: format(addMonths(new Date(), 1), 'yyyy-MM-dd'),
      value: Number(value),
      status: 'Ongoing'
    };

    onAdd(newProject);
    setName('');
    setClient('');
    setValue('');
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
        
        <h2 className="text-sm uppercase tracking-widest font-semibold text-white mb-6">Add New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#8E8E93] mb-1.5">Project Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#2A2A2E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#3B82F6] transition-colors"
              placeholder="e.g. App Wireframes"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#8E8E93] mb-1.5">Client</label>
            <input 
              type="text" 
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#2A2A2E] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#3B82F6] transition-colors"
              placeholder="e.g. Acme Corp"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#8E8E93] mb-1.5">Value (₱)</label>
            <input 
              type="number" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-[#2A2A2E] rounded px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-[#3B82F6] transition-colors"
              placeholder="50000"
              required
            />
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
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
