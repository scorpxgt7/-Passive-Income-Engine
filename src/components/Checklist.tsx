import React, { useState } from 'react';
import { Task } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

interface ChecklistProps {
  initialTasks: Task[];
}

export function Checklist({ initialTasks }: ChecklistProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const progress = Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);

  return (
    <div className="bg-[#141417] rounded-lg border border-[#2A2A2E] p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93] mb-1">Week 1 Action Plan</h3>
          <p className="text-xs text-[#55555A]">Foundation & The First Asset</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#3B82F6]">{progress}%</span>
          <div className="w-24 h-1.5 bg-[#1A1A1F] rounded-full overflow-hidden border border-[#2A2A2E]">
            <div 
              className="h-full bg-[#3B82F6] transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-start gap-3 p-3 hover:bg-[#1A1A1F] rounded-lg cursor-pointer transition-colors group"
          >
            <div className="mt-0.5 flex-shrink-0">
              {task.completed ? (
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              ) : (
                <Circle className="w-4 h-4 text-[#55555A] group-hover:text-[#3B82F6]" />
              )}
            </div>
            <div>
              <span className={cn(
                "text-xs font-semibold block mb-0.5",
                task.completed ? "text-[#55555A] line-through" : "text-white"
              )}>
                {task.day}
              </span>
              <p className={cn(
                "text-[10px]",
                task.completed ? "text-[#55555A] line-through" : "text-[#8E8E93]"
              )}>
                {task.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
