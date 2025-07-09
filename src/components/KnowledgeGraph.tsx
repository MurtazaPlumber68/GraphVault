import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause,
  Settings,
  Filter
} from 'lucide-react';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'person' | 'project' | 'concept' | 'document' | 'event';
  size: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  strength: number;
  type: 'mentions' | 'collaborates' | 'contains' | 'precedes';
}

interface KnowledgeGraphProps {
  data: { nodes: Node[]; links: Link[] };
  onDataChange: (data: { nodes: Node[]; links: Link[] }) => void;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data, onDataChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [simulation, setSimulation] = useState<d3.Simulation<Node, Link> | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [zoom, setZoom] = useState(1);

  // Generate sample data
  useEffect(() => {
    if (data.nodes.length === 0) {
      const sampleNodes: Node[] = [
        { id: '1', name: 'Machine Learning', type: 'concept', size: 20 },
        { id: '2', name: 'John Doe', type: 'person', size: 15 },
        { id: '3', name: 'AI Project Alpha', type: 'project', size: 18 },
        { id: '4', name: 'Research Paper', type: 'document', size: 12 },
        { id: '5', name: 'Team Meeting', type: 'event', size: 10 },
        { id: '6', name: 'Deep Learning', type: 'concept', size: 16 },
        { id: '7', name: 'Jane Smith', type: 'person', size: 14 },
        { id: '8', name: 'Neural Networks', type: 'concept', size: 17 },
        { id: '9', name: 'Code Review', type: 'event', size: 11 },
        { id: '10', name: 'Documentation', type: 'document', size: 13 },
      ];

      const sampleLinks: Link[] = [
        { source: '1', target: '6', strength: 0.9, type: 'contains' },
        { source: '1', target: '8', strength: 0.8, type: 'contains' },
        { source: '2', target: '3', strength: 0.7, type: 'collaborates' },
        { source: '3', target: '4', strength: 0.6, type: 'contains' },
        { source: '5', target: '2', strength: 0.5, type: 'mentions' },
        { source: '6', target: '8', strength: 0.8, type: 'contains' },
        { source: '7', target: '3', strength: 0.6, type: 'collaborates' },
        { source: '9', target: '10', strength: 0.4, type: 'precedes' },
        { source: '4', target: '8', strength: 0.7, type: 'mentions' },
        { source: '2', target: '7', strength: 0.5, type: 'collaborates' },
      ];

      onDataChange({ nodes: sampleNodes, links: sampleLinks });
    }
  }, [data.nodes.length, onDataChange]);

  // D3 Force Simulation
  useEffect(() => {
    if (!svgRef.current || data.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // Clear previous content
    svg.selectAll('*').remove();

    // Create zoom behavior
    const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        container.attr('transform', event.transform);
        setZoom(event.transform.k);
      });

    svg.call(zoomBehavior);

    const container = svg.append('g');

    // Create simulation with proper typing
    const sim = d3.forceSimulation<Node>(data.nodes)
      .force('link', d3.forceLink<Node, Link>(data.links)
        .id(d => d.id)
        .distance(d => 50 + (1 - d.strength) * 100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<Node>().radius(d => (d as Node).size + 5));

    setSimulation(sim);

    // Create links
    const link = container.append('g')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', d => {
        switch (d.type) {
          case 'mentions': return '#60a5fa';
          case 'collaborates': return '#a78bfa';
          case 'contains': return '#34d399';
          case 'precedes': return '#fbbf24';
          default: return '#6b7280';
        }
      })
      .attr('stroke-width', d => Math.sqrt(d.strength * 10))
      .attr('stroke-opacity', 0.6);

    // Create node groups
    const node = container.append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', (event, d) => {
          if (!event.active) sim.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event, d) => {
          if (!event.active) sim.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }));

    // Add circles
    node.append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => {
        switch (d.type) {
          case 'person': return '#ef4444';
          case 'project': return '#8b5cf6';
          case 'concept': return '#06b6d4';
          case 'document': return '#10b981';
          case 'event': return '#f59e0b';
          default: return '#6b7280';
        }
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add labels
    node.append('text')
      .attr('dy', d => d.size + 15)
      .attr('text-anchor', 'middle')
      .style('fill', '#e5e7eb')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .text(d => d.name);

    // Add click handlers
    node.on('click', (event, d) => {
      setSelectedNode(d);
    });

    // Update positions on tick
    sim.on('tick', () => {
      link
        .attr('x1', d => (d.source as Node).x!)
        .attr('y1', d => (d.source as Node).y!)
        .attr('x2', d => (d.target as Node).x!)
        .attr('y2', d => (d.target as Node).y!);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      sim.stop();
    };
  }, [data, onDataChange]);

  const handlePlayPause = () => {
    if (simulation) {
      if (isPlaying) {
        simulation.stop();
      } else {
        simulation.restart();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    if (simulation) {
      simulation.alpha(1).restart();
      setIsPlaying(true);
    }
  };

  const nodeTypeColors = {
    person: '#ef4444',
    project: '#8b5cf6',
    concept: '#06b6d4',
    document: '#10b981',
    event: '#f59e0b'
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePlayPause} className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Zoom: {(zoom * 100).toFixed(0)}%</span>
          <div className="flex items-center space-x-1">
            {Object.entries(nodeTypeColors).map(([type, color]) => (
              <div key={type} className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                <span className="text-xs text-gray-400 capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Graph Container */}
        <div className="flex-1">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-0">
              <svg
                ref={svgRef}
                width="100%"
                height="600"
                viewBox="0 0 800 600"
                className="w-full h-full"
              />
            </CardContent>
          </Card>
        </div>

        {/* Node Details Panel */}
        {selectedNode && (
          <Card className="w-80 bg-black/30 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                Node Details
                <Badge 
                  variant="secondary" 
                  className="capitalize"
                  style={{ 
                    backgroundColor: `${nodeTypeColors[selectedNode.type]}20`,
                    color: nodeTypeColors[selectedNode.type],
                    borderColor: `${nodeTypeColors[selectedNode.type]}40`
                  }}
                >
                  {selectedNode.type}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">{selectedNode.name}</h3>
                <p className="text-sm text-gray-400">
                  Size: {selectedNode.size} | ID: {selectedNode.id}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">Connected Nodes</h4>
                <div className="space-y-1">
                  {data.links
                    .filter(link => 
                      (typeof link.source === 'string' ? link.source : link.source.id) === selectedNode.id ||
                      (typeof link.target === 'string' ? link.target : link.target.id) === selectedNode.id
                    )
                    .map((link, index) => {
                      const connectedNodeId = (typeof link.source === 'string' ? link.source : link.source.id) === selectedNode.id
                        ? (typeof link.target === 'string' ? link.target : link.target.id)
                        : (typeof link.source === 'string' ? link.source : link.source.id);
                      const connectedNode = data.nodes.find(n => n.id === connectedNodeId);
                      return (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">{connectedNode?.name}</span>
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                            {link.type}
                          </Badge>
                        </div>
                      );
                    })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
