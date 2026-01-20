import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ProjectData {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  mockUI: React.ReactNode;
}

// Mock UI Components for visual placeholders
const AgentDashboardMock = () => (
  <div className="w-full h-full bg-[#0f172a] p-3 font-sans text-[10px]">
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">SC</span>
        </div>
        <span className="text-white/90 font-medium">Service Console</span>
      </div>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-green-400"></div>
        <span className="text-green-400 text-[8px]">Live</span>
      </div>
    </div>
    {/* Stats row */}
    <div className="grid grid-cols-3 gap-2 mb-3">
      <div className="bg-white/5 rounded p-2">
        <div className="text-white/50 text-[8px]">Open Cases</div>
        <div className="text-white font-semibold">24</div>
      </div>
      <div className="bg-white/5 rounded p-2">
        <div className="text-white/50 text-[8px]">Avg Response</div>
        <div className="text-emerald-400 font-semibold">2.4m</div>
      </div>
      <div className="bg-white/5 rounded p-2">
        <div className="text-white/50 text-[8px]">CSAT</div>
        <div className="text-white font-semibold">94%</div>
      </div>
    </div>
    {/* Case list */}
    <div className="space-y-1.5">
      {[
        { name: 'Acme Corp', status: 'Urgent', color: 'bg-red-400' },
        { name: 'TechStart Inc', status: 'Open', color: 'bg-yellow-400' },
        { name: 'Global Ltd', status: 'Pending', color: 'bg-blue-400' },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between bg-white/5 rounded px-2 py-1.5">
          <span className="text-white/80">{item.name}</span>
          <span className={`${item.color} text-[8px] px-1.5 py-0.5 rounded text-black font-medium`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const DataPipelineMock = () => (
  <div className="w-full h-full bg-[#0f172a] p-3 font-sans text-[10px]">
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <span className="text-white/90 font-medium">Pipeline Status</span>
      <span className="text-emerald-400 text-[8px]">● All Systems Go</span>
    </div>
    {/* Flow visualization */}
    <div className="flex items-center justify-between mb-4 px-2">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mb-1">
          <span className="text-blue-400 text-[8px]">IN</span>
        </div>
        <span className="text-white/50 text-[8px]">Source</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-emerald-500 mx-2"></div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded bg-violet-500/20 border border-violet-500/50 flex items-center justify-center mb-1">
          <span className="text-violet-400 text-[8px]">⚙</span>
        </div>
        <span className="text-white/50 text-[8px]">Transform</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-violet-500 to-emerald-500 mx-2"></div>
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-1">
          <span className="text-emerald-400 text-[8px]">✓</span>
        </div>
        <span className="text-white/50 text-[8px]">Output</span>
      </div>
    </div>
    {/* Stats */}
    <div className="bg-white/5 rounded p-2">
      <div className="flex justify-between mb-1">
        <span className="text-white/50">Records processed</span>
        <span className="text-white font-medium">12,847</span>
      </div>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="w-4/5 h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
      </div>
    </div>
  </div>
);

const AIWritingMock = () => (
  <div className="w-full h-full bg-white p-3 font-sans text-[10px]">
    {/* Minimal header */}
    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
      <span className="text-gray-900 font-medium">Draft</span>
      <div className="flex gap-1">
        <div className="w-4 h-4 rounded bg-violet-100 flex items-center justify-center">
          <span className="text-violet-600 text-[8px]">AI</span>
        </div>
      </div>
    </div>
    {/* Text content */}
    <div className="space-y-2 text-gray-600">
      <div className="h-2 bg-gray-200 rounded w-full"></div>
      <div className="h-2 bg-gray-200 rounded w-11/12"></div>
      <div className="h-2 bg-gray-200 rounded w-4/5"></div>
    </div>
    {/* AI suggestion */}
    <div className="mt-3 p-2 bg-violet-50 border border-violet-200 rounded">
      <div className="flex items-center gap-1 mb-1">
        <span className="text-violet-600 text-[8px]">✨ Suggestion</span>
      </div>
      <div className="space-y-1">
        <div className="h-1.5 bg-violet-200 rounded w-full"></div>
        <div className="h-1.5 bg-violet-200 rounded w-3/4"></div>
      </div>
    </div>
    {/* Action buttons */}
    <div className="mt-2 flex gap-1">
      <div className="px-2 py-1 bg-violet-600 rounded text-white text-[8px]">Accept</div>
      <div className="px-2 py-1 bg-gray-100 rounded text-gray-600 text-[8px]">Dismiss</div>
    </div>
  </div>
);

const CustomerPortalMock = () => (
  <div className="w-full h-full bg-white p-3 font-sans text-[10px]">
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <span className="text-gray-900 font-medium">Support Portal</span>
      <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
        <span className="text-amber-600 text-[8px]">JA</span>
      </div>
    </div>
    {/* Quick actions */}
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="p-2 bg-gray-50 rounded border border-gray-100 text-center">
        <div className="text-gray-400 text-[10px] mb-0.5">📄</div>
        <span className="text-gray-600 text-[8px]">New Ticket</span>
      </div>
      <div className="p-2 bg-gray-50 rounded border border-gray-100 text-center">
        <div className="text-gray-400 text-[10px] mb-0.5">📚</div>
        <span className="text-gray-600 text-[8px]">Knowledge</span>
      </div>
    </div>
    {/* Recent tickets */}
    <div className="text-[8px] text-gray-400 mb-1">Recent Tickets</div>
    <div className="space-y-1">
      {[
        { title: 'API Integration', status: 'Resolved', color: 'text-emerald-600 bg-emerald-50' },
        { title: 'Billing Question', status: 'Open', color: 'text-amber-600 bg-amber-50' },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-1.5 bg-gray-50 rounded">
          <span className="text-gray-700">{item.title}</span>
          <span className={`${item.color} text-[7px] px-1 py-0.5 rounded`}>{item.status}</span>
        </div>
      ))}
    </div>
  </div>
);

// Sales demos - conceptual LWC tools for customer conversations
const salesDemos: ProjectData[] = [
  {
    id: '001',
    category: 'Salesforce LWC',
    title: 'Agent Dashboard',
    description: 'Unified agent context to reduce training friction.',
    tags: ['LWC', 'Apex', 'Service Cloud'],
    mockUI: <AgentDashboardMock />,
  },
  {
    id: '002',
    category: 'Integration',
    title: 'Data Pipeline',
    description: 'Automation concept for data reconciliation workflows.',
    tags: ['Node.js', 'PostgreSQL', 'Lambda'],
    mockUI: <DataPipelineMock />,
  },
];

// Concepts - ideas seeking a collaborator
const concepts: ProjectData[] = [
  {
    id: '003',
    category: 'Co-builder wanted',
    title: 'AI Writing App',
    description: 'Minimalist editor with AI suggestions.',
    tags: ['Next.js', 'OpenAI'],
    mockUI: <AIWritingMock />,
  },
  {
    id: '004',
    category: 'Collaboration',
    title: 'Customer Portal',
    description: 'Self-service to reduce support friction.',
    tags: ['React', 'Figma'],
    mockUI: <CustomerPortalMock />,
  },
];

export const Artifacts: React.FC = () => {
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full py-16 md:py-24 px-6 md:px-12 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Compact */}
        <div
          className={`flex items-baseline gap-4 mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="font-serif text-fluid-2xl font-normal text-foreground">
            Work
          </h2>
          <span className="font-mono text-[11px] text-muted uppercase tracking-widest">
            Demos & Concepts
          </span>
        </div>

        {/* Bento Grid - 2 rows of 2 on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sales Demos */}
          {salesDemos.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
              type="demo"
            />
          ))}

          {/* Concepts */}
          {concepts.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index + salesDemos.length}
              isVisible={isVisible}
              type="concept"
            />
          ))}
        </div>

        {/* Subtle legend */}
        <div
          className={`flex items-center gap-6 mt-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-foreground"></div>
            <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
              Sales Demos
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 border border-foreground"></div>
            <span className="font-mono text-[10px] text-muted uppercase tracking-wider">
              Concepts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================================
   PROJECT CARD WITH MOCK UI
   ================================ */
interface CardProps {
  project: ProjectData;
  index: number;
  isVisible: boolean;
  type: 'demo' | 'concept';
}

const ProjectCard: React.FC<CardProps> = ({ project, index, isVisible, type }) => {
  const isDemo = type === 'demo';

  return (
    <div
      className={`group relative border transition-all duration-500 hover:border-foreground overflow-hidden ${
        isDemo
          ? 'bg-surface border-border'
          : 'bg-background border-dashed border-border hover:border-solid'
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${100 + index * 75}ms` }}
    >
      {/* Type indicator bar */}
      <div
        className={`absolute top-0 left-6 w-8 h-0.5 ${
          isDemo ? 'bg-foreground' : 'bg-transparent border-t border-foreground'
        }`}
      ></div>

      {/* Mock UI Screenshot */}
      <div className="relative h-40 overflow-hidden border-b border-border">
        {project.mockUI}
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="font-mono text-[9px] text-muted uppercase tracking-widest">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="font-sans text-base font-semibold text-foreground mt-1 mb-1 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-muted leading-relaxed mb-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="font-mono text-[9px] text-muted/80 uppercase tracking-wider border border-border px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
