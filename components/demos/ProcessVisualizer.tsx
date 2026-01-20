import React, { useEffect, useState } from 'react';

export const ProcessVisualizer: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 1, label: 'Ingest', x: 50, y: 100 },
    { id: 2, label: 'Transform', x: 200, y: 100 },
    { id: 3, label: 'Output', x: 350, y: 100 },
    { id: 4, label: 'Audit', x: 200, y: 180 },
  ];

  return (
    // CHANGE: Removed rounded-lg
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg width="100%" height="220" viewBox="0 0 400 220" className="overflow-visible">
        <defs>
          <marker id="arrowhead-tech" markerWidth="8" markerHeight="6" refX="28" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#171717" />
          </marker>
        </defs>

        {/* Connections */}
        <path d="M50 100 L200 100" stroke="#E5E5E5" strokeWidth="1" />
        <path d="M200 100 L350 100" stroke="#E5E5E5" strokeWidth="1" />
        <path d="M350 100 Q350 180 200 180" fill="none" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M200 180 Q50 180 50 100" fill="none" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4 4" />

        {/* Active Path - Black Line */}
         {step === 1 && <path d="M50 100 L200 100" stroke="#171717" strokeWidth="2" markerEnd="url(#arrowhead-tech)" />}
         {step === 2 && <path d="M200 100 L350 100" stroke="#171717" strokeWidth="2" markerEnd="url(#arrowhead-tech)" />}
         {step === 3 && <path d="M350 100 Q350 180 200 180" fill="none" stroke="#171717" strokeWidth="2" />}
         {step === 0 && <path d="M200 180 Q50 180 50 100" fill="none" stroke="#171717" strokeWidth="2" markerEnd="url(#arrowhead-tech)" />}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            {/* Outer Circle - White fill, Black border if active */}
            <circle 
                r="20" 
                fill="#FFFFFF" 
                stroke={step === i ? '#171717' : '#E5E5E5'} 
                strokeWidth={step === i ? 2 : 1}
                className="transition-all duration-300" 
            />
            
            {/* Inner Dot - Square instead of circle for tech feel */}
             {step === i && <rect x="-4" y="-4" width="8" height="8" fill="#171717" />}

            <text x="0" y="35" textAnchor="middle" fill={step === i ? '#171717' : '#A3A3A3'} fontSize="10" fontFamily="'IBM Plex Mono', monospace" className="uppercase tracking-widest font-semibold">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};