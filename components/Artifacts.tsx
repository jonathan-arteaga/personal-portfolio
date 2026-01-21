import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ShoppingCart, Store, RefreshCw, List, Building2, Smartphone } from 'lucide-react';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  mockUI: React.ReactNode;
}

// Mock UI Components - Light gray backgrounds with floating UI elements

const EcommerceMock = () => (
  <div className="w-full h-full flex items-center justify-center gap-3 p-4">
    {/* Product Card */}
    <div className="bg-white rounded-lg shadow-sm p-2 w-24">
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
    {/* Shopping Cart Modal */}
    <div className="bg-white rounded-lg shadow-lg p-3 w-28">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-medium text-gray-700">Shopping Cart</span>
        <span className="text-gray-400 text-[10px]">×</span>
      </div>
      <div className="w-full h-12 bg-gray-100 rounded mb-2"></div>
      <div className="bg-gray-900 text-white text-[8px] py-1.5 rounded text-center flex items-center justify-center gap-1">
        <span></span> Pay
      </div>
    </div>
  </div>
);

const MarketplaceMock = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-sm p-3 w-48">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 border-2 border-white shadow"></div>
        <div className="flex gap-1">
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
            <div className="w-6 h-8 bg-gray-300 rounded-sm"></div>
          </div>
          <div className="w-10 h-10 bg-pink-50 rounded flex items-center justify-center">
            <div className="w-6 h-4 bg-gray-300 rounded-sm"></div>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center relative">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded text-white text-[6px] flex items-center justify-center">↗</div>
          </div>
          <div className="w-10 h-10 bg-purple-50 rounded flex items-center justify-center">
            <div className="w-5 h-5 bg-purple-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SubscriptionMock = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-sm p-3 w-40">
      <div className="space-y-2">
        <div className="flex items-center justify-between bg-gray-50 rounded p-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded text-[8px] flex items-center justify-center text-gray-500">18</div>
            <div className="flex items-center gap-1">
              <div className="text-[8px] text-blue-600 font-medium">VISA</div>
              <span className="text-[8px] text-gray-400">****4242</span>
            </div>
          </div>
          <span className="text-[9px] font-medium text-gray-700">$7.99</span>
        </div>
        <div className="flex items-center justify-between bg-gray-50 rounded p-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded text-[8px] flex items-center justify-center text-gray-500">18</div>
            <div className="flex items-center gap-1">
              <div className="text-[8px] text-blue-600 font-medium">VISA</div>
              <span className="text-[8px] text-gray-400">****4242</span>
            </div>
          </div>
          <span className="text-[9px] font-medium text-gray-700">$7.99</span>
        </div>
      </div>
    </div>
  </div>
);

const OrderManagementMock = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-sm p-3 w-44">
      <div className="text-[9px] text-gray-500 mb-2">Total Sales</div>
      {/* Chart area */}
      <div className="h-12 flex items-end gap-1 mb-3">
        <svg className="w-full h-full" viewBox="0 0 120 40">
          <path
            d="M0 35 Q20 30 40 28 T80 20 T120 15"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <circle cx="80" cy="20" r="3" fill="#3B82F6" />
        </svg>
      </div>
      {/* Order rows */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-[6px]">✓</span>
            </div>
            <div className="w-12 h-1.5 bg-gray-200 rounded"></div>
          </div>
          <span className="text-[8px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded">✓ Paid</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            <div className="w-10 h-1.5 bg-gray-200 rounded"></div>
          </div>
          <span className="text-[8px] text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">○ Unfulfilled</span>
        </div>
      </div>
    </div>
  </div>
);

const B2BStoreMock = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-sm p-3 w-44 relative">
      {/* Browser dots */}
      <div className="flex gap-1 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
      </div>
      {/* Navigation */}
      <div className="flex items-center gap-2 mb-3 bg-gray-50 rounded p-1.5">
        <div className="w-4 h-4 bg-gray-200 rounded"></div>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        </div>
      </div>
      {/* Person silhouette */}
      <div className="flex items-center justify-center">
        <div className="w-16 h-20 bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
          <div className="w-8 h-12 bg-blue-200/50 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

const POSMock = () => (
  <div className="w-full h-full flex items-center justify-center gap-3 p-4">
    {/* Phone/Terminal */}
    <div className="bg-gray-800 rounded-2xl p-2 w-20 shadow-lg">
      <div className="bg-white rounded-xl p-2 h-24 flex flex-col items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 rounded-lg mb-1 flex items-center justify-center">
          <div className="text-[8px] text-gray-400">⟨⟩</div>
        </div>
        <div className="text-[8px] text-gray-500">Tap to pay</div>
        <div className="text-[10px] font-semibold text-gray-800 mt-1">$29.99</div>
      </div>
    </div>
    {/* Credit Card */}
    <div className="bg-white rounded-lg shadow-sm p-2 w-24 h-16 relative">
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

// Project data matching the screenshot structure
const projects: ProjectData[] = [
  {
    id: '001',
    title: 'Ecommerce',
    description: 'Build a multi-region and multi-channel store with endless customizations.',
    icon: <ShoppingCart className="w-5 h-5" />,
    mockUI: <EcommerceMock />,
  },
  {
    id: '002',
    title: 'Marketplace',
    description: 'Set up a marketplace with multiple vendors.',
    icon: <Store className="w-5 h-5" />,
    mockUI: <MarketplaceMock />,
  },
  {
    id: '003',
    title: 'Subscription Business',
    description: 'Handle subscription-based orders and set up custom renewal logic.',
    icon: <RefreshCw className="w-5 h-5" />,
    mockUI: <SubscriptionMock />,
  },
  {
    id: '004',
    title: 'Order Management System',
    description: 'Handle orders from multiple channels and route to your fulfillment services.',
    icon: <List className="w-5 h-5" />,
    mockUI: <OrderManagementMock />,
  },
  {
    id: '005',
    title: 'B2B Store',
    description: 'Set unique price lists, discounts, and product access for B2B customers.',
    icon: <Building2 className="w-5 h-5" />,
    mockUI: <B2BStoreMock />,
  },
  {
    id: '006',
    title: 'Point of Sales (POS)',
    description: 'Support POS systems and in-store purchases.',
    icon: <Smartphone className="w-5 h-5" />,
    mockUI: <POSMock />,
  },
];

export const Artifacts: React.FC = () => {
  const { ref: sectionRef, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full py-16 md:py-24 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`flex items-baseline gap-4 mb-10 transition-all duration-700 ${
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

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
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

/* ================================
   PROJECT CARD - Matching screenshot design
   ================================ */
interface CardProps {
  project: ProjectData;
  index: number;
  isVisible: boolean;
}

const ProjectCard: React.FC<CardProps> = ({ project, index, isVisible }) => {
  return (
    <div
      className={`group bg-surface-alt rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-lg ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${100 + index * 75}ms` }}
    >
      {/* Preview Area - Large with light gray background */}
      <div className="relative h-48 bg-[#f0f0f0] dark:bg-[#1a1a1a] overflow-hidden">
        {project.mockUI}
      </div>

      {/* Content Area */}
      <div className="p-5 bg-surface-alt">
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-2">
          <span className="text-foreground/70">{project.icon}</span>
          <h3 className="font-sans text-base font-semibold text-foreground">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="font-sans text-sm text-muted leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );
};
