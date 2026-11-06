import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Network, Search, ZoomIn, ZoomOut, RotateCcw, 
  Shield, Scale, BookOpen, Building2, CheckCircle2, 
  Info, Sparkles, AlertCircle
} from 'lucide-react';

interface KGNode {
  id: string;
  label: string;
  type: 'Regulatory_Act' | 'Section_Provision' | 'Compliance_Obligation' | 'Government_Authority' | 'Govenics_Offering' | 'Applicable_Industry' | string;
  properties?: Record<string, any>;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface KGEdge {
  source: string;
  target: string;
  relation: string;
}

interface KGData {
  version: string;
  generated_at: string;
  nodes_count: number;
  edges_count: number;
  nodes: KGNode[];
  edges: KGEdge[];
}

const TYPE_CONFIG: Record<string, { bg: string; border: string; text: string; icon: any; label: string }> = {
  Regulatory_Act: {
    bg: '#eff6ff',
    border: '#3b82f6',
    text: '#1d4ed8',
    icon: Scale,
    label: 'Regulatory Act'
  },
  Section_Provision: {
    bg: '#f0fdf4',
    border: '#22c55e',
    text: '#15803d',
    icon: BookOpen,
    label: 'Section Provision'
  },
  Compliance_Obligation: {
    bg: '#fef2f2',
    border: '#ef4444',
    text: '#b91c1c',
    icon: CheckCircle2,
    label: 'Compliance Obligation'
  },
  Government_Authority: {
    bg: '#fdf4ff',
    border: '#c084fc',
    text: '#7e22ce',
    icon: Shield,
    label: 'Government Authority'
  },
  Govenics_Offering: {
    bg: '#fff7ed',
    border: '#f97316',
    text: '#c2410c',
    icon: Sparkles,
    label: 'GOVENICS Offering'
  },
  Applicable_Industry: {
    bg: '#f8fafc',
    border: '#64748b',
    text: '#334155',
    icon: Building2,
    label: 'Applicable Industry'
  }
};

export const ComplianceKnowledgeGraph: React.FC = () => {
  const [data, setData] = useState<KGData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedNode, setSelectedNode] = useState<KGNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<KGEdge | null>(null);

  // Canvas Viewport transform
  const [zoom, setZoom] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 20, y: 10 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Dragging node
  const [draggedNode, setDraggedNode] = useState<KGNode | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch Knowledge Graph Data from existing API
  useEffect(() => {
    let isMounted = true;
    async function fetchKG() {
      try {
        setLoading(true);
        const res = await fetch('/api/compliance/knowledge-graph');
        if (!res.ok) {
          throw new Error(`Failed to load Knowledge Graph API (${res.status})`);
        }
        const json = await res.json();
        if (isMounted) {
          // Initialize clustered force-directed layout coordinates
          // Cluster around 4 primary Acts: Factories, EPA, DPDP, MCA CSR
          const actClusters: Record<string, { x: number; y: number }> = {
            "ACT_ACT-IND-LABOUR-1948": { x: 420, y: 340 },
            "ACT_ACT-IND-ENV-1986": { x: 780, y: 340 },
            "ACT_ACT-IND-DPDP-2023": { x: 420, y: 720 },
            "ACT_REG-IND-MCA-CSR-2021": { x: 780, y: 720 },
          };

          const nodesWithPos = (json.nodes || []).map((node: KGNode, index: number) => {
            // Position based on entity role and relationships
            let posX = 600;
            let posY = 500;

            if (node.id in actClusters) {
              posX = actClusters[node.id].x;
              posY = actClusters[node.id].y;
            } else if (node.type === 'Government_Authority') {
              // Placed along top/corners
              if (node.id.includes('labour')) { posX = 200; posY = 240; }
              else if (node.id.includes('cpcb') || node.id.includes('environment')) { posX = 980; posY = 240; }
              else if (node.id.includes('meity')) { posX = 200; posY = 820; }
              else { posX = 980; posY = 820; }
            } else if (node.type === 'Govenics_Offering') {
              if (node.id.includes('labour')) { posX = 420; posY = 150; }
              else if (node.id.includes('ehs') || node.id.includes('environmental')) { posX = 780; posY = 150; }
              else if (node.id.includes('privacy') || node.id.includes('cyber')) { posX = 420; posY = 920; }
              else { posX = 780; posY = 920; }
            } else if (node.type === 'Applicable_Industry') {
              if (node.id.includes('manufacturing')) { posX = 600; posY = 240; }
              else if (node.id.includes('chemicals')) { posX = 940; posY = 460; }
              else if (node.id.includes('technology') || node.id.includes('it')) { posX = 260; posY = 600; }
              else { posX = 600; posY = 820; }
            } else if (node.type === 'Section_Provision') {
              // Orbit around their specific parent Act
              const parentActKey = node.id.includes('LABOUR') ? 'ACT_ACT-IND-LABOUR-1948'
                : node.id.includes('ENV') ? 'ACT_ACT-IND-ENV-1986'
                : node.id.includes('DPDP') ? 'ACT_ACT-IND-DPDP-2023'
                : 'ACT_REG-IND-MCA-CSR-2021';
              const center = actClusters[parentActKey] || { x: 600, y: 500 };
              const secIdx = index % 3;
              const angle = (secIdx * (Math.PI / 1.5)) - (Math.PI / 3);
              posX = center.x + 130 * Math.cos(angle);
              posY = center.y + 130 * Math.sin(angle);
            } else if (node.type === 'Compliance_Obligation') {
              // Radiate outwards from sections
              const parentActKey = node.id.includes('LABOUR') ? 'ACT_ACT-IND-LABOUR-1948'
                : node.id.includes('ENV') ? 'ACT_ACT-IND-ENV-1986'
                : node.id.includes('DPDP') ? 'ACT_ACT-IND-DPDP-2023'
                : 'ACT_REG-IND-MCA-CSR-2021';
              const center = actClusters[parentActKey] || { x: 600, y: 500 };
              const obIdx = index % 3;
              const angle = (obIdx * (Math.PI / 1.5)) - (Math.PI / 3);
              posX = center.x + 225 * Math.cos(angle);
              posY = center.y + 225 * Math.sin(angle);
            }

            return {
              ...node,
              x: posX,
              y: posY,
            };
          });

          setData({
            ...json,
            nodes: nodesWithPos
          });
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Error fetching knowledge graph');
          setLoading(false);
        }
      }
    }
    fetchKG();
    return () => { isMounted = false; };
  }, []);

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    if (!data) return [];
    return data.nodes.filter(n => {
      const matchSearch = n.label.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = selectedType === 'ALL' || n.type === selectedType;
      return matchSearch && matchType;
    });
  }, [data, searchQuery, selectedType]);

  const activeNodeIds = useMemo(() => new Set(filteredNodes.map(n => n.id)), [filteredNodes]);

  // Edges between active nodes
  const activeEdges = useMemo(() => {
    if (!data) return [];
    return data.edges.filter(e => activeNodeIds.has(e.source) && activeNodeIds.has(e.target));
  }, [data, activeNodeIds]);

  // Node position map for rendering lines
  const nodePositionMap = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    if (!data) return map;
    data.nodes.forEach(n => {
      if (n.x !== undefined && n.y !== undefined) {
        map.set(n.id, { x: n.x, y: n.y });
      }
    });
    return map;
  }, [data]);

  // Pan controls
  const handleMouseDown = (e: React.MouseEvent) => {
    // If not clicking on a node
    if ((e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).tagName === 'rect') {
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
    } else if (draggedNode && data) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mouseX = (e.clientX - rect.left - pan.x) / zoom;
      const mouseY = (e.clientY - rect.top - pan.y) / zoom;

      setData({
        ...data,
        nodes: data.nodes.map(n => n.id === draggedNode.id ? { ...n, x: mouseX, y: mouseY } : n)
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedNode(null);
  };

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(0.4, prev + delta), 2.5));
  };

  const handleReset = () => {
    setZoom(0.85);
    setPan({ x: 20, y: 10 });
    setSelectedNode(null);
    setSelectedEdge(null);
    setSearchQuery('');
    setSelectedType('ALL');
  };

  // Example path selector helper
  const handleSelectFactoriesActPath = () => {
    if (!data) return;
    const act = data.nodes.find(n => n.id === 'ACT_ACT-IND-LABOUR-1948');
    if (act) {
      setSelectedNode(act);
      setSelectedEdge(null);
      // Pan to node
      if (act.x && act.y) {
        setPan({ x: 500 - act.x * zoom, y: 350 - act.y * zoom });
      }
    }
  };

  // Connected nodes lookup for inspected node
  const connectedDetails = useMemo(() => {
    if (!selectedNode || !data) return { incoming: [], outgoing: [] };
    const outgoing = data.edges
      .filter(e => e.source === selectedNode.id)
      .map(e => ({ edge: e, target: data.nodes.find(n => n.id === e.target) }))
      .filter(i => i.target);
    const incoming = data.edges
      .filter(e => e.target === selectedNode.id)
      .map(e => ({ edge: e, source: data.nodes.find(n => n.id === e.source) }))
      .filter(i => i.source);
    return { incoming, outgoing };
  }, [selectedNode, data]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-600 font-semibold text-sm">Loading Live Compliance Knowledge Graph...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-rose-50 rounded-3xl p-8 border border-rose-200 text-rose-700 flex items-center gap-4">
        <AlertCircle className="w-8 h-8 flex-shrink-0" />
        <div>
          <h4 className="font-bold text-base">Unable to Load Knowledge Graph</h4>
          <p className="text-sm text-rose-600">{error || 'No knowledge graph data returned.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
      {/* Header & Controls Toolbar */}
      <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-50/50">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-600 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-widest mb-1.5">
            <Network className="w-3.5 h-3.5" /> Interactive Knowledge Graph
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Regulatory Provisions &amp; Obligation Topology
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Live multi-entity graph linking Acts, Sections, Obligations, Authorities, Offerings, and Industries ({data.nodes_count} Nodes, {data.edges_count} Edges).
          </p>
        </div>

        {/* Action presets & reset */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <button
            onClick={handleSelectFactoriesActPath}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Inspect Factories Act regulatory tree"
          >
            <Scale className="w-3.5 h-3.5" /> Inspect Factories Act Path
          </button>
          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />
          <button
            onClick={() => handleZoom(0.15)}
            className="p-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 text-xs font-bold shadow-2xs"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(-0.15)}
            className="p-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 text-xs font-bold shadow-2xs"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 text-xs font-bold shadow-2xs flex items-center gap-1"
            title="Reset Viewport"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="px-6 py-3 border-b border-slate-100 bg-white flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search entity node..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
          />
        </div>

        {/* Entity Type Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Filter:</span>
          <button
            onClick={() => setSelectedType('ALL')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
              selectedType === 'ALL'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Types ({data.nodes.length})
          </button>
          {Object.entries(TYPE_CONFIG).map(([typeKey, cfg]) => {
            const count = data.nodes.filter(n => n.type === typeKey).length;
            const isSelected = selectedType === typeKey;
            return (
              <button
                key={typeKey}
                onClick={() => setSelectedType(typeKey)}
                className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${
                  isSelected ? 'shadow-2xs ring-1 ring-inset ring-slate-400' : 'opacity-85 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isSelected ? cfg.bg : '#f1f5f9',
                  color: cfg.text,
                  border: isSelected ? `1px solid ${cfg.border}` : '1px solid transparent'
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.border }} />
                {cfg.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Graph Visualization Stage + Sidebar Inspector */}
      <div className="relative flex-1 min-h-[680px] flex overflow-hidden">
        
        {/* SVG Interactive Canvas */}
        <div 
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="flex-1 cursor-grab active:cursor-grabbing bg-slate-900 select-none relative overflow-hidden"
          style={{ height: '680px' }}
        >
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          <svg 
            width="100%" 
            height="100%" 
            className="overflow-visible"
            viewBox="0 0 1200 1000"
          >
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              
              {/* Edges / Relationship Lines */}
              <g className="edges-group">
                {activeEdges.map((edge, idx) => {
                  const srcPos = nodePositionMap.get(edge.source);
                  const tgtPos = nodePositionMap.get(edge.target);
                  if (!srcPos || !tgtPos) return null;

                  const isSelected = selectedEdge === edge || 
                    (selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target));

                  return (
                    <g 
                      key={`${edge.source}-${edge.target}-${idx}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEdge(edge);
                        setSelectedNode(null);
                      }}
                      className="cursor-pointer group"
                    >
                      <line
                        x1={srcPos.x}
                        y1={srcPos.y}
                        x2={tgtPos.x}
                        y2={tgtPos.y}
                        stroke={isSelected ? '#60a5fa' : '#334155'}
                        strokeWidth={isSelected ? 2.5 : 1.2}
                        strokeDasharray={edge.relation === 'MONITORED_BY_OFFERING' ? '4 2' : undefined}
                        className="transition-colors duration-200"
                      />
                      {/* Edge Label Pill */}
                      <text
                        x={(srcPos.x + tgtPos.x) / 2}
                        y={(srcPos.y + tgtPos.y) / 2 - 4}
                        fill={isSelected ? '#93c5fd' : '#64748b'}
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="pointer-events-none uppercase tracking-tighter"
                      >
                        {edge.relation.replace(/_/g, ' ')}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Node Circles and Labels */}
              <g className="nodes-group">
                {filteredNodes.map((node) => {
                  if (node.x === undefined || node.y === undefined) return null;
                  const cfg = TYPE_CONFIG[node.type] || { bg: '#fff', border: '#94a3b8', text: '#000', label: node.type };
                  const isSelected = selectedNode?.id === node.id;
                  const isConnected = selectedNode && (
                    activeEdges.some(e => (e.source === selectedNode.id && e.target === node.id) || (e.target === selectedNode.id && e.source === node.id))
                  );

                  let radius = 32;
                  if (node.type === 'Regulatory_Act') radius = 42;
                  if (node.type === 'Government_Authority') radius = 38;
                  if (node.type === 'Govenics_Offering') radius = 36;

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setDraggedNode(node);
                        setSelectedNode(node);
                        setSelectedEdge(null);
                      }}
                      className="cursor-pointer group"
                    >
                      {/* Node highlight ring */}
                      {(isSelected || isConnected) && (
                        <circle
                          r={radius + 6}
                          fill="none"
                          stroke={isSelected ? '#3b82f6' : '#64748b'}
                          strokeWidth={isSelected ? 3 : 1.5}
                          strokeDasharray={isConnected && !isSelected ? '3 3' : undefined}
                          className="animate-pulse"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r={radius}
                        fill={cfg.bg}
                        stroke={cfg.border}
                        strokeWidth={isSelected ? 3 : 2}
                        className="transition-transform group-hover:scale-110 drop-shadow-md"
                      />

                      {/* Node Icon Label */}
                      <text
                        y={5}
                        textAnchor="middle"
                        fill={cfg.text}
                        fontSize={radius > 35 ? "14" : "12"}
                        fontWeight="900"
                        className="pointer-events-none font-sans"
                      >
                        {node.type === 'Regulatory_Act' ? 'ACT' 
                          : node.type === 'Section_Provision' ? 'SEC'
                          : node.type === 'Compliance_Obligation' ? 'RULE'
                          : node.type === 'Government_Authority' ? 'GOV'
                          : node.type === 'Govenics_Offering' ? 'SOL'
                          : 'IND'}
                      </text>

                      {/* Node Text Label Underneath */}
                      <text
                        y={radius + 18}
                        textAnchor="middle"
                        fill={isSelected ? '#60a5fa' : '#f8fafc'}
                        fontSize="12"
                        fontWeight="bold"
                        className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] select-none"
                      >
                        {node.label.length > 28 ? `${node.label.slice(0, 26)}...` : node.label}
                      </text>
                    </g>
                  );
                })}
              </g>

            </g>
          </svg>

          {/* Quick HUD Legend */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-3 text-xs text-slate-300 pointer-events-none flex flex-col gap-1.5 shadow-lg">
            <span className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">Topology Legend</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> <span>Regulatory Act</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> <span>Section Provision</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> <span>Compliance Obligation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> <span>Government Authority</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> <span>GOVENICS Offering</span>
            </div>
          </div>
        </div>

        {/* Node / Edge Inspector Sidebar */}
        <div className="w-80 lg:w-96 border-l border-slate-200 bg-white p-6 overflow-y-auto max-h-[580px]">
          {selectedNode ? (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Node Inspector</span>
                <span 
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: TYPE_CONFIG[selectedNode.type]?.bg || '#f1f5f9',
                    color: TYPE_CONFIG[selectedNode.type]?.text || '#334155',
                    border: `1px solid ${TYPE_CONFIG[selectedNode.type]?.border || '#cbd5e1'}`
                  }}
                >
                  {TYPE_CONFIG[selectedNode.type]?.label || selectedNode.type}
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900 leading-snug">
                  {selectedNode.label}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-1">ID: {selectedNode.id}</p>
              </div>

              {/* Node Properties */}
              {selectedNode.properties && Object.keys(selectedNode.properties).length > 0 && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Attributes</span>
                  {Object.entries(selectedNode.properties).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-500 capitalize">{k.replace(/_/g, ' ')}:</span>
                      <span className="font-semibold text-slate-800">{String(v)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Connected Relationships */}
              <div className="space-y-3 pt-2">
                <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Connected Relations</span>
                
                {connectedDetails.outgoing.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-600">Outgoing:</span>
                    {connectedDetails.outgoing.map(({ edge, target }, i) => (
                      <div 
                        key={i} 
                        onClick={() => target && setSelectedNode(target)}
                        className="p-2.5 bg-slate-50 hover:bg-blue-50/60 border border-slate-200/70 hover:border-blue-200 rounded-lg text-xs cursor-pointer transition-colors group"
                      >
                        <span className="text-[10px] font-bold text-blue-600 block uppercase tracking-wider">{edge.relation.replace(/_/g, ' ')} &rarr;</span>
                        <span className="font-medium text-slate-800 group-hover:text-blue-700">{target?.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {connectedDetails.incoming.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-semibold text-slate-600">Incoming:</span>
                    {connectedDetails.incoming.map(({ edge, source }, i) => (
                      <div 
                        key={i}
                        onClick={() => source && setSelectedNode(source)}
                        className="p-2.5 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/70 hover:border-emerald-200 rounded-lg text-xs cursor-pointer transition-colors group"
                      >
                        <span className="text-[10px] font-bold text-emerald-600 block uppercase tracking-wider">&larr; {edge.relation.replace(/_/g, ' ')}</span>
                        <span className="font-medium text-slate-800 group-hover:text-emerald-700">{source?.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : selectedEdge ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Relationship Inspector</span>
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200/60">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">Relationship Type</span>
                <h4 className="text-sm font-black text-slate-900 font-mono">
                  {selectedEdge.relation}
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">Source Entity</span>
                  <span className="font-semibold text-slate-800">{selectedEdge.source}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 font-bold text-[10px] uppercase block">Target Entity</span>
                  <span className="font-semibold text-slate-800">{selectedEdge.target}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <Info className="w-8 h-8 text-slate-300" />
              <p className="text-xs font-semibold leading-relaxed">
                Click any Node or Relationship line in the graph to inspect its legal attributes, statutory obligations, and connected entities.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
