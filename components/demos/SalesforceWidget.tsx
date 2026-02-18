import React, { useState } from 'react';
import { Activity, CheckCircle, Clock, MoreHorizontal, User, BarChart2 } from 'lucide-react';

export const SalesforceWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  
  const tasks = [
    { id: 1, title: 'Q3 System Audit', priority: 'High', status: 'Pending', due: 'Today' },
    { id: 2, title: 'API Gateway Migr.', priority: 'Medium', status: 'In Progress', due: 'Tomorrow' },
    { id: 3, title: 'Client Onboarding', priority: 'Low', status: 'Complete', due: 'Yesterday' },
  ];

  return (
    // CHANGE: Removed rounded-lg, shadow-sm. Added border-border.
    <div className="w-full bg-surface border border-border font-sans text-xs">
      {/* Header */}
      <div className="bg-surface px-4 py-2 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-foreground text-background p-1 rounded-none">
             <Activity size={12} />
          </div>
          <span className="font-semibold text-foreground font-mono tracking-tight text-[10px] uppercase">Workflow Optimizer</span>
        </div>
        <MoreHorizontal size={14} className="text-neutral-400" />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-background">
        {['tasks', 'analytics', 'team'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            // CHANGE: sharper focus states, no rounded corners
            className={`px-4 py-2 capitalize font-semibold transition-all text-[10px] tracking-wide border-r border-border ${
              activeTab === tab 
                ? 'text-background bg-foreground' 
                : 'text-neutral-500 hover:text-foreground hover:bg-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="p-4 bg-background min-h-[220px]">
        {activeTab === 'tasks' && (
          <div className="space-y-1">
             <div className="flex justify-between items-center text-neutral-400 pb-2 border-b border-border text-[10px] uppercase tracking-wider font-mono font-semibold">
               <span>Task Name</span>
               <span>Status</span>
             </div>
             {tasks.map(task => (
               <div key={task.id} className="flex items-center justify-between p-2 hover:bg-surface border border-transparent hover:border-border transition-all cursor-default group">
                 <div className="flex items-center gap-3">
                   {/* CHANGE: Square indicators instead of round */}
                   <div className={`w-2 h-2 rounded-none border ${
                     task.priority === 'High' ? 'bg-foreground border-foreground' : 
                     task.priority === 'Medium' ? 'bg-neutral-400 border-neutral-400' : 'bg-background border-neutral-400'
                   }`} />
                   <span className="font-semibold text-foreground group-hover:underline decoration-1 underline-offset-2">{task.title}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   {task.status === 'Complete' ? (
                     <CheckCircle size={14} className="text-foreground" strokeWidth={2} />
                   ) : (
                     <Clock size={14} className="text-neutral-400" />
                   )}
                   <span className="text-neutral-400 text-[10px] font-mono">{task.due}</span>
                 </div>
               </div>
             ))}
             
             {/* Simulated generative insight */}
             <div className="mt-6 p-3 bg-surface border border-border border-l-4 border-l-foreground">
               <div className="flex items-start gap-2">
                 <div className="mt-0.5 text-foreground">
                   <BarChart2 size={12} />
                 </div>
                 <div>
                   <h4 className="font-semibold text-foreground text-[10px] uppercase mb-1 font-mono">System Insight</h4>
                   <p className="text-neutral-600 text-[11px] leading-snug font-medium">
                     Efficiency analysis suggests automating "Client Onboarding" could save 4.5h/week.
                   </p>
                 </div>
               </div>
             </div>
          </div>
        )}
        {activeTab !== 'tasks' && (
          <div className="h-full flex flex-col items-center justify-center text-neutral-400 py-12">
            <User size={24} className="mb-2 opacity-20" />
            <p className="text-[10px] font-mono uppercase tracking-widest">Restricted Access</p>
          </div>
        )}
      </div>
    </div>
  );
};