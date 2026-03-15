import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ShoppingCart, Store, RefreshCw, List, Building2, Smartphone, Cloud, Globe, Lightbulb, Wrench, Zap, BarChart3, Code } from 'lucide-react';

type TabCategory = 'salesforce' | 'websites' | 'prototypes' | 'independent';

interface Tab {
  id: TabCategory;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'salesforce', label: 'Salesforce', icon: <Cloud className="w-3.5 h-3.5" /> },
  { id: 'websites',   label: 'Websites',   icon: <Globe className="w-3.5 h-3.5" /> },
  { id: 'prototypes', label: 'Prototypes', icon: <Lightbulb className="w-3.5 h-3.5" /> },
  { id: 'independent', label: 'Independent', icon: <Wrench className="w-3.5 h-3.5" /> },
];

interface ProjectData {
  id: string;
  category: TabCategory;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  mockUI: React.ReactNode;
}

/* ── Mock UIs ─────────────────────────────────────────────────── */
/* Intentionally scoped to `.mock-ui` for realistic micro-copy typography. */

const EcommerceMock = () => (
  <div className="mock-ui w-full h-full flex items-center justify-center gap-3 p-4">
    <div className="bg-white rounded-lg elev-1 p-2 w-24">
      <div className="w-full h-16 bg-gray-100 rounded mb-2 flex items-center justify-center">
        <div className="w-8 h-12 bg-gray-300 rounded"></div>
      </div>
      <div className="text-[10px] font-medium text-gray-800">$179.99</div>
      <div className="flex gap-0.5 mt-1">
        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
        <div className="w-2 h-2 rounded-full bg-pink-400"></div>
      </div>
    </div>
    <div className="bg-white rounded-lg elev-2 p-3 w-28">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-medium text-gray-700">Shopping Cart</span>
        <span className="text-gray-400 text-[10px]">×</span>
      </div>
      <div className="w-full h-12 bg-gray-100 rounded mb-2"></div>
      <div className="bg-gray-900 text-white text-[8px] py-1.5 rounded text-center">
        Pay
      </div>
    </div>
  </div>
);

const MarketplaceMock = () => (
  <div className="mock-ui w-full h-full flex items-center justify-center p-4">
    <div className="bg-white rounded-lg elev-1 p-3 w-48">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 border-2 border-white elev-1"></div>
        <div className="flex gap-1">
          {['bg-gray-100','bg-pink-50','bg-gray-100','bg-purple-50'].map((bg, i) => (
            <div key={i} className={`w-10 h-10 ${bg} rounded flex items-center justify-center`}>
              <div className="w-5 h-6 bg-gray-300 rounded-sm"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-1.5 bg-gray-100 rounded w-3/4 mb-1.5"></div>
      <div className="h-1.5 bg-gray-100 rounded w-1/2"></div>
    </div>
  </div>
);

const SubscriptionMock = () => (
  <div className="mock-ui w-full h-full flex items-center justify-center p-4">
    <div className="bg-white rounded-lg elev-1 p-3 w-44">
      <div className="text-[9px] font-semibold text-gray-700 mb-2">Subscriptions</div>
      {[['Netflix','$15.99'],['Spotify','$9.99'],['iCloud','$2.99']].map(([name, price], i) => (
        <div key={i} className="flex items-center justify-between bg-gray-50 rounded p-2 mb-1.5 last:mb-0">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <span className="text-[9px] text-gray-700 font-medium">{name}</span>
          </div>
          <span className="text-[9px] font-semibold text-gray-800">{price}</span>
        </div>
      ))}
    </div>
  </div>
);

const OrderManagementMock = () => (
  <div className="mock-ui w-full h-full flex items-center justify-center p-4">
    <div className="bg-white rounded-lg elev-1 p-3 w-44">
      <div className="text-[9px] text-gray-500 mb-2">Total Sales</div>
      <div className="h-12 flex items-end mb-3">
        <svg className="w-full h-full" viewBox="0 0 120 40">
          <path d="M0 35 Q20 30 40 28 T80 20 T120 15" fill="none" stroke="#3B82F6" strokeWidth="2" />
          <circle cx="80" cy="20" r="3" fill="#3B82F6" />
        </svg>
      </div>
      <div className="space-y-1.5">
        {[
          {
            label: 'Paid',
            dotClass: 'bg-green-400',
            textClass: 'text-green-600',
            bgClass: 'bg-green-50',
          },
          {
            label: 'Unfulfilled',
            dotClass: 'bg-yellow-400',
            textClass: 'text-yellow-600',
            bgClass: 'bg-yellow-50',
          },
        ].map(({ label, dotClass, textClass, bgClass }, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${dotClass}`}></div>
              <div className="w-12 h-1.5 bg-gray-200 rounded"></div>
            </div>
            <span className={`text-[8px] px-1.5 py-0.5 rounded ${textClass} ${bgClass}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const B2BStoreMock = () => (
  <div className="mock-ui w-full h-full flex items-center justify-center p-4">
    <div className="bg-white rounded-lg elev-1 p-3 w-44">
      <div className="flex gap-1 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
      </div>
      <div className="flex items-center gap-2 mb-3 bg-gray-50 rounded p-1.5">
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="h-1.5 bg-gray-200 rounded flex-1"></div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-12 bg-gradient-to-b from-blue-50 to-blue-100 rounded flex items-center justify-center">
            <div className="w-6 h-8 bg-blue-200/60 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const POSMock = () => (
  <div className="mock-ui w-full h-full flex items-center justify-center gap-3 p-4">
    <div className="bg-gray-800 rounded-2xl p-2 w-20 elev-2">
      <div className="bg-white rounded-xl p-2 h-24 flex flex-col items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 rounded-lg mb-1 flex items-center justify-center">
          <div className="text-[8px] text-gray-400">⟨⟩</div>
        </div>
        <div className="text-[8px] text-gray-500">Tap to pay</div>
        <div className="text-[10px] font-semibold text-gray-800 mt-1">$29.99</div>
      </div>
    </div>
    <div className="bg-white rounded-lg elev-1 p-2 w-24 h-16 relative">
      <div className="absolute top-2 right-2 flex items-center gap-0.5">
        <div className="text-[6px] text-gray-400">****</div>
        <div className="text-[8px] text-gray-600 font-mono">1024</div>
      </div>
      <div className="absolute bottom-2 right-2 flex gap-0.5">
        <div className="w-4 h-4 rounded-full bg-red-500 opacity-80"></div>
        <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-80 -ml-2"></div>
      </div>
    </div>
  </div>
);

const WorkflowAutomationMock = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="flex items-center gap-3">
      {[
        'from-amber-400 to-orange-500',
        'from-orange-500 to-rose-500',
        'from-rose-500 to-purple-600',
      ].map((gradient, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} opacity-80`} />
          {i < 2 && (
            <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </div>
  </div>
);

const OperationsInfraMock = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="grid grid-cols-3 gap-2">
      {[
        'from-blue-400 to-cyan-400',
        'from-cyan-400 to-teal-400',
        'from-teal-400 to-emerald-400',
        'from-emerald-400 to-green-400',
        'from-blue-500 to-indigo-400',
        'from-indigo-400 to-violet-400',
      ].map((gradient, i) => (
        <div
          key={i}
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} opacity-70`}
        />
      ))}
    </div>
  </div>
);

const WebAppMock = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="relative">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200/50"
          style={{
            width: `${140 - i * 16}px`,
            height: `${90 - i * 10}px`,
            background: `linear-gradient(135deg, rgba(99,102,241,${0.15 + i * 0.1}), rgba(168,85,247,${0.15 + i * 0.1}))`,
            position: i === 0 ? 'relative' : 'absolute',
            top: i === 0 ? 0 : `${i * -12}px`,
            left: i === 0 ? 0 : `${i * 12}px`,
            zIndex: 3 - i,
          }}
        />
      ))}
    </div>
  </div>
);

/* ── Project data ─────────────────────────────────────────────── */

const projects: ProjectData[] = [
  {
    id: 'sf-001',
    category: 'salesforce',
    title: 'Agent Dashboard',
    description: 'Unified agent context to reduce training friction and speed up case resolution.',
    icon: <List className="w-4 h-4" />,
    tags: ['Service Cloud', 'Flows', 'Agentforce'],
    mockUI: <OrderManagementMock />,
  },
  {
    id: 'sf-002',
    category: 'salesforce',
    title: 'Service Console',
    description: 'Custom console app for streamlined case management and faster agent workflows.',
    icon: <Building2 className="w-4 h-4" />,
    tags: ['Console', 'OmniStudio', 'LWC'],
    mockUI: <B2BStoreMock />,
  },
  {
    id: 'web-001',
    category: 'websites',
    title: 'Ecommerce Store',
    description: 'Multi-region, multi-channel storefront with product variants and checkout flow.',
    icon: <ShoppingCart className="w-4 h-4" />,
    tags: ['Commerce Cloud', 'React', 'Stripe'],
    mockUI: <EcommerceMock />,
  },
  {
    id: 'web-002',
    category: 'websites',
    title: 'Marketplace',
    description: 'Multi-vendor marketplace with seller onboarding, listings, and order management.',
    icon: <Store className="w-4 h-4" />,
    tags: ['Next.js', 'Tailwind', 'Postgres'],
    mockUI: <MarketplaceMock />,
  },
  {
    id: 'proto-001',
    category: 'prototypes',
    title: 'Subscription Manager',
    description: 'Handles subscription-based billing, renewal logic, and dunning management.',
    icon: <RefreshCw className="w-4 h-4" />,
    tags: ['Stripe', 'Node.js', 'React'],
    mockUI: <SubscriptionMock />,
  },
  {
    id: 'proto-002',
    category: 'prototypes',
    title: 'Mobile POS',
    description: 'In-store point-of-sale with tap-to-pay, receipt generation, and inventory sync.',
    icon: <Smartphone className="w-4 h-4" />,
    tags: ['React Native', 'Stripe Terminal'],
    mockUI: <POSMock />,
  },
  {
    id: 'ind-001',
    category: 'independent',
    title: 'AI Workflow Automation',
    description: 'Custom tools that take messy manual processes and turn them into one-click workflows. Upload data, get structured output. No prompt engineering required by the end user.',
    icon: <Zap className="w-4 h-4" />,
    tags: ['Claude', 'Python', 'Automation'],
    mockUI: <WorkflowAutomationMock />,
  },
  {
    id: 'ind-002',
    category: 'independent',
    title: 'Digital Operations Infrastructure',
    description: 'Websites, analytics, lead routing, and reporting systems built from scratch for small teams. Everything connected, everything measured.',
    icon: <BarChart3 className="w-4 h-4" />,
    tags: ['Next.js', 'Analytics', 'Integrations'],
    mockUI: <OperationsInfraMock />,
  },
  {
    id: 'ind-003',
    category: 'independent',
    title: 'Custom Web Applications',
    description: 'Production apps built with Next.js, Tailwind, and modern tooling. Fast, responsive, designed for the people who actually use them.',
    icon: <Code className="w-4 h-4" />,
    tags: ['Next.js', 'Tailwind', 'React'],
    mockUI: <WebAppMock />,
  },
];

/* ── Component ────────────────────────────────────────────────── */

export const Artifacts: React.FC = () => {
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>();
  const [activeTab, setActiveTab] = useState<TabCategory>('salesforce');

  const filteredProjects = projects.filter((p) => p.category === activeTab);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full border-t border-border surface-tier-1 section-shell"
    >
      <div className="content-shell">

        {/* Section Header */}
        <div
          className={`flex items-center gap-4 mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-foreground"></div>
            <span className="type-label text-muted">
              Work
            </span>
          </div>
          <span className="type-tag text-muted/50 border border-border px-2 py-0.5">
            Demos &amp; Concepts
          </span>
        </div>

        {/* Tab Bar */}
        <div
          className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); }}
                className={`focus-ring flex items-center gap-2 px-4 py-2 type-body-sm font-medium transition-all duration-200 border ${
                  activeTab === tab.id
                    ? 'interactive-accent-primary'
                    : 'bg-transparent text-muted border-border hover:border-foreground hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Project Card ─────────────────────────────────────────────── */

interface CardProps {
  project: ProjectData;
  index: number;
  isVisible: boolean;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, isVisible }) => (
  <div
    className={`group border border-border overflow-hidden transition-all duration-500 hover:border-foreground elev-1 hover-elev-3 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}
    style={{ transitionDelay: `${String(200 + index * 80)}ms` }}
  >
    {/* Preview Area */}
    <div
      className="relative h-60 overflow-hidden"
      style={{ backgroundColor: 'var(--surface-alt)' }}
    >
      {/* Inner content scales on hover */}
      <div className="group-hover:scale-[1.03] transition-transform duration-500 ease-out w-full h-full">
        {project.mockUI}
      </div>

      {/* Bottom gradient overlay — fades into card body */}
      <div
        className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--surface-alt), transparent)' }}
      />

      {/* Preview badge */}
      <div
        className="project-preview-badge absolute top-3 right-3 type-tag text-muted border border-border px-1.5 py-0.5"
      >
        Preview
      </div>
    </div>

    {/* Content */}
    <div className="p-5 bg-surface">
      {/* Icon + Title row */}
      <div className="flex items-center gap-2.5 mb-2">
        <span className="text-muted">{project.icon}</span>
        <h3 className="type-title text-foreground">
          {project.title}
        </h3>
      </div>

      {/* Description */}
      <p className="type-body-sm text-muted mb-4">
        {project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="type-tag text-muted border border-border px-2 py-0.5 group-hover:border-foreground/30 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);
