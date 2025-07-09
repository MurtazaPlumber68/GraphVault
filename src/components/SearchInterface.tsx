
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  FileText, 
  Users, 
  Calendar, 
  GitBranch,
  Clock,
  ExternalLink,
  Brain,
  Zap
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  type: 'email' | 'document' | 'code' | 'calendar' | 'note';
  score: number;
  timestamp: Date;
  source: string;
  entities: string[];
  relations: string[];
}

interface SearchInterfaceProps {
  results: SearchResult[];
  onSearch: (results: SearchResult[]) => void;
  graphData: { nodes: any[]; links: any[] };
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ 
  results, 
  onSearch, 
  graphData 
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    entities: [] as string[]
  });

  // Sample search results
  const sampleResults: SearchResult[] = [
    {
      id: '1',
      title: 'Machine Learning Project Proposal',
      content: 'A comprehensive proposal for implementing a machine learning pipeline that processes user data and generates insights through neural networks...',
      type: 'document',
      score: 0.95,
      timestamp: new Date('2025-01-08'),
      source: 'Google Docs',
      entities: ['Machine Learning', 'Neural Networks', 'Data Pipeline'],
      relations: ['contains', 'mentions']
    },
    {
      id: '2',
      title: 'Email: Meeting with AI Team',
      content: 'Following up on our discussion about the knowledge graph implementation. We need to focus on entity extraction and relation mapping...',
      type: 'email',
      score: 0.87,
      timestamp: new Date('2025-01-07'),
      source: 'Gmail',
      entities: ['AI Team', 'Knowledge Graph', 'Entity Extraction'],
      relations: ['mentions', 'discusses']
    },
    {
      id: '3',
      title: 'Code Commit: Graph Database Schema',
      content: 'Added temporal node relationships and improved query performance for knowledge graph traversal algorithms...',
      type: 'code',
      score: 0.82,
      timestamp: new Date('2025-01-06'),
      source: 'GitHub',
      entities: ['Graph Database', 'Schema', 'Performance'],
      relations: ['implements', 'improves']
    },
    {
      id: '4',
      title: 'Team Standup - AI Development',
      content: 'Discussed progress on semantic search implementation and vector embeddings. Next steps include RAG optimization...',
      type: 'calendar',
      score: 0.78,
      timestamp: new Date('2025-01-05'),
      source: 'Google Calendar',
      entities: ['Semantic Search', 'Vector Embeddings', 'RAG'],
      relations: ['discusses', 'plans']
    }
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter sample results based on query
      const filteredResults = sampleResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.content.toLowerCase().includes(query.toLowerCase()) ||
        result.entities.some(entity => entity.toLowerCase().includes(query.toLowerCase()))
      );
      
      onSearch(filteredResults);
      setIsSearching(false);
    }, 1000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <FileText className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'code': return <GitBranch className="h-4 w-4" />;
      case 'calendar': return <Calendar className="h-4 w-4" />;
      case 'note': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-600/20 text-blue-300 border-blue-600/30';
      case 'document': return 'bg-green-600/20 text-green-300 border-green-600/30';
      case 'code': return 'bg-purple-600/20 text-purple-300 border-purple-600/30';
      case 'calendar': return 'bg-orange-600/20 text-orange-300 border-orange-600/30';
      case 'note': return 'bg-gray-600/20 text-gray-300 border-gray-600/30';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-600/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-400" />
            Semantic Search & Q&A
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search across your entire knowledge graph..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !query.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSearching ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Quick filters:</span>
            {['all', 'email', 'document', 'code', 'calendar'].map((type) => (
              <Badge
                key={type}
                variant={filters.type === type ? "default" : "secondary"}
                className={`cursor-pointer capitalize ${
                  filters.type === type 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setFilters(prev => ({ ...prev, type }))}
              >
                {type}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Results */}
        <div className="lg:col-span-2 space-y-4">
          {results.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {results.length} results found
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Zap className="h-4 w-4" />
                  <span>AI-powered semantic search</span>
                </div>
              </div>
              
              {results.map((result) => (
                <Card key={result.id} className="bg-black/20 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(result.type)}
                        <h4 className="font-semibold text-white">{result.title}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(result.type)}>
                          {result.type}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                          {Math.round(result.score * 100)}% match
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {result.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{result.timestamp.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ExternalLink className="h-3 w-3" />
                          <span>{result.source}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {result.entities.slice(0, 3).map((entity, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs border-gray-600 text-gray-400"
                          >
                            {entity}
                          </Badge>
                        ))}
                        {result.entities.length > 3 && (
                          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                            +{result.entities.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <Card className="bg-black/20 backdrop-blur-sm border-gray-700">
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  {query ? 'No results found' : 'Start your search'}
                </h3>
                <p className="text-gray-400">
                  {query 
                    ? 'Try different keywords or adjust your filters'
                    : 'Enter a query to search across your knowledge graph'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Related Entities */}
          <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">Related Entities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['Machine Learning', 'Neural Networks', 'Data Science', 'AI Research', 'Deep Learning'].map((entity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{entity}</span>
                  <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                    {Math.floor(Math.random() * 20 + 5)}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Search Statistics */}
          <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">Search Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total indexed</span>
                <span className="text-white">1.2M documents</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Search time</span>
                <span className="text-white">47ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Entities found</span>
                <span className="text-white">156</span>
              </div>
              <Separator className="bg-gray-700" />
              <div className="text-xs text-gray-500">
                Powered by vector embeddings and semantic search
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
