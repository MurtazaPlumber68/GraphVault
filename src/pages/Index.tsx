
import React, { useState, useEffect } from 'react';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';
import { SearchInterface } from '@/components/SearchInterface';
import { Dashboard } from '@/components/Dashboard';
import { IngestionPanel } from '@/components/IngestionPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Brain, Search, BarChart3, Database } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [searchResults, setSearchResults] = useState([]);
  const [ingestionStats, setIngestionStats] = useState({
    totalDocuments: 0,
    entitiesExtracted: 0,
    connectionsFound: 0,
    lastSync: new Date()
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIngestionStats(prev => ({
        ...prev,
        totalDocuments: prev.totalDocuments + Math.floor(Math.random() * 3),
        entitiesExtracted: prev.entitiesExtracted + Math.floor(Math.random() * 5),
        connectionsFound: prev.connectionsFound + Math.floor(Math.random() * 2),
        lastSync: new Date()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Personal Knowledge Graph</h1>
                <p className="text-gray-400 text-sm">Autonomous AI-Powered Learning System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Sync Active</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{ingestionStats.totalDocuments.toLocaleString()} Documents</div>
                <div className="text-xs text-gray-500">Last updated: {ingestionStats.lastSync.toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/30 backdrop-blur-sm border border-gray-700">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2 data-[state=active]:bg-blue-600">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="graph" className="flex items-center space-x-2 data-[state=active]:bg-purple-600">
              <Brain className="h-4 w-4" />
              <span>Knowledge Graph</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center space-x-2 data-[state=active]:bg-green-600">
              <Search className="h-4 w-4" />
              <span>Semantic Search</span>
            </TabsTrigger>
            <TabsTrigger value="ingestion" className="flex items-center space-x-2 data-[state=active]:bg-orange-600">
              <Database className="h-4 w-4" />
              <span>Data Ingestion</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="dashboard" className="space-y-6">
              <Dashboard stats={ingestionStats} />
            </TabsContent>

            <TabsContent value="graph" className="space-y-6">
              <Card className="p-6 bg-black/30 backdrop-blur-sm border-gray-700">
                <KnowledgeGraph data={graphData} onDataChange={setGraphData} />
              </Card>
            </TabsContent>

            <TabsContent value="search" className="space-y-6">
              <SearchInterface 
                results={searchResults} 
                onSearch={setSearchResults}
                graphData={graphData}
              />
            </TabsContent>

            <TabsContent value="ingestion" className="space-y-6">
              <IngestionPanel 
                stats={ingestionStats}
                onStatsUpdate={setIngestionStats}
                onGraphUpdate={setGraphData}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default Index;
