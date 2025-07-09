
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  FileText, 
  Calendar, 
  GitBranch, 
  Globe, 
  BookOpen,
  Settings,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

interface IngestionSource {
  id: string;
  name: string;
  type: 'email' | 'docs' | 'calendar' | 'github' | 'browser' | 'notes';
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
  status: 'connected' | 'error' | 'syncing' | 'idle';
  lastSync: Date;
  itemsProcessed: number;
  totalItems: number;
  error?: string;
}

interface IngestionPanelProps {
  stats: {
    totalDocuments: number;
    entitiesExtracted: number;
    connectionsFound: number;
    lastSync: Date;
  };
  onStatsUpdate: (stats: any) => void;
  onGraphUpdate: (data: any) => void;
}

export const IngestionPanel: React.FC<IngestionPanelProps> = ({ 
  stats, 
  onStatsUpdate, 
  onGraphUpdate 
}) => {
  const [sources, setSources] = useState<IngestionSource[]>([
    {
      id: 'gmail',
      name: 'Gmail & Attachments',
      type: 'email',
      icon: Mail,
      enabled: true,
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      itemsProcessed: 1247,
      totalItems: 1250
    },
    {
      id: 'gdrive',
      name: 'Google Drive & Docs',
      type: 'docs',
      icon: FileText,
      enabled: true,
      status: 'syncing',
      lastSync: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
      itemsProcessed: 89,
      totalItems: 156
    },
    {
      id: 'gcalendar',
      name: 'Google Calendar',
      type: 'calendar',
      icon: Calendar,
      enabled: true,
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      itemsProcessed: 342,
      totalItems: 342
    },
    {
      id: 'github',
      name: 'GitHub Repositories',
      type: 'github',
      icon: GitBranch,
      enabled: false,
      status: 'idle',
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      itemsProcessed: 0,
      totalItems: 0,
      error: 'Authentication required'
    },
    {
      id: 'browser',
      name: 'Browser History',
      type: 'browser',
      icon: Globe,
      enabled: true,
      status: 'connected',
      lastSync: new Date(Date.now() - 1000 * 60 * 1), // 1 minute ago
      itemsProcessed: 2156,
      totalItems: 2156
    },
    {
      id: 'obsidian',
      name: 'Markdown Notes',
      type: 'notes',
      icon: BookOpen,
      enabled: true,
      status: 'error',
      lastSync: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      itemsProcessed: 78,
      totalItems: 95,
      error: 'File system access denied'
    }
  ]);

  const [isGlobalSync, setIsGlobalSync] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSources(prev => prev.map(source => {
        if (source.enabled && source.status === 'syncing') {
          const progress = Math.min(source.itemsProcessed + Math.floor(Math.random() * 3), source.totalItems);
          return {
            ...source,
            itemsProcessed: progress,
            lastSync: new Date(),
            status: progress === source.totalItems ? 'connected' : 'syncing'
          };
        }
        return source;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleSource = (sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, enabled: !source.enabled, status: !source.enabled ? 'syncing' : 'idle' }
        : source
    ));
  };

  const syncSource = (sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, status: 'syncing', itemsProcessed: 0, lastSync: new Date() }
        : source
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'syncing': return <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'idle': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'syncing': return 'text-blue-400';
      case 'error': return 'text-red-400';
      case 'idle': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const totalProgress = sources.reduce((acc, source) => {
    return acc + (source.enabled ? (source.itemsProcessed / Math.max(source.totalItems, 1)) : 0);
  }, 0) / sources.filter(s => s.enabled).length * 100;

  return (
    <div className="space-y-6">
      {/* Global Controls */}
      <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-blue-400" />
              Data Ingestion Control Center
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Auto-sync</span>
                <Switch
                  checked={isGlobalSync}
                  onCheckedChange={setIsGlobalSync}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                onClick={() => sources.forEach(source => source.enabled && syncSource(source.id))}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync All
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Overall Progress</span>
                <span className="text-white">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-2 bg-gray-800" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{sources.filter(s => s.enabled).length}</div>
                <div className="text-gray-400">Active Sources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {sources.reduce((acc, s) => acc + s.itemsProcessed, 0).toLocaleString()}
                </div>
                <div className="text-gray-400">Items Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {sources.filter(s => s.status === 'syncing').length}
                </div>
                <div className="text-gray-400">Currently Syncing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {sources.filter(s => s.status === 'error').length}
                </div>
                <div className="text-gray-400">Errors</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Source Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sources.map((source) => (
          <Card key={source.id} className="bg-black/20 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gray-800/50">
                    <source.icon className="h-5 w-5 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{source.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(source.status)}
                      <span className={`text-xs capitalize ${getStatusColor(source.status)}`}>
                        {source.status}
                      </span>
                    </div>
                  </div>
                </div>
                <Switch
                  checked={source.enabled}
                  onCheckedChange={() => toggleSource(source.id)}
                />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {source.enabled && (
                <>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">
                        {source.itemsProcessed} / {source.totalItems}
                      </span>
                    </div>
                    <Progress 
                      value={(source.itemsProcessed / Math.max(source.totalItems, 1)) * 100} 
                      className="h-1.5 bg-gray-800" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Last sync: {source.lastSync.toLocaleTimeString()}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => syncSource(source.id)}
                      disabled={source.status === 'syncing'}
                      className="h-6 px-2 text-xs hover:bg-gray-800"
                    >
                      {source.status === 'syncing' ? (
                        <RefreshCw className="h-3 w-3 animate-spin" />
                      ) : (
                        <RefreshCw className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                  
                  {source.error && (
                    <div className="p-2 bg-red-600/10 border border-red-600/20 rounded text-xs text-red-400">
                      {source.error}
                    </div>
                  )}
                </>
              )}
              
              {!source.enabled && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">Source disabled</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Processing Pipeline Status */}
      <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">AI Processing Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { name: 'Text Extraction', progress: 92, status: 'active' },
              { name: 'Entity Recognition', progress: 87, status: 'active' },
              { name: 'Relation Mapping', progress: 94, status: 'active' },
              { name: 'Graph Construction', progress: 89, status: 'active' }
            ].map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{stage.name}</span>
                  <span className="text-xs text-gray-400">{stage.progress}%</span>
                </div>
                <Progress value={stage.progress} className="h-1.5 bg-gray-800" />
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Processing</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
