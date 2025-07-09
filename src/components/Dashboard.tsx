
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Users, 
  GitBranch, 
  Calendar, 
  TrendingUp, 
  Clock,
  Brain,
  Zap
} from 'lucide-react';

interface DashboardProps {
  stats: {
    totalDocuments: number;
    entitiesExtracted: number;
    connectionsFound: number;
    lastSync: Date;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const recentActivities = [
    { id: 1, type: 'email', title: 'Processed 15 new emails', time: '2 min ago', icon: FileText },
    { id: 2, type: 'github', title: 'Analyzed 3 GitHub commits', time: '5 min ago', icon: GitBranch },
    { id: 3, type: 'calendar', title: 'Extracted 2 meeting entities', time: '8 min ago', icon: Calendar },
    { id: 4, type: 'docs', title: 'Indexed 7 Google Docs', time: '12 min ago', icon: FileText },
  ];

  const metrics = [
    {
      title: 'Total Documents',
      value: stats.totalDocuments.toLocaleString(),
      change: '+12%',
      icon: FileText,
      color: 'text-blue-400'
    },
    {
      title: 'Entities Extracted',
      value: stats.entitiesExtracted.toLocaleString(),
      change: '+8%',
      icon: Brain,
      color: 'text-purple-400'
    },
    {
      title: 'Connections Found',
      value: stats.connectionsFound.toLocaleString(),
      change: '+15%',
      icon: Zap,
      color: 'text-green-400'
    },
    {
      title: 'Processing Speed',
      value: '1.2k/min',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-black/30 backdrop-blur-sm border-gray-700 hover:border-gray-600 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                    <span className="text-xs text-green-400">{metric.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gray-800/50 ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                <div className="p-2 rounded-lg bg-gray-700/50">
                  <activity.icon className="h-4 w-4 text-gray-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.title}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 border-blue-600/30">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Processing Status */}
        <Card className="bg-black/30 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-400" />
              AI Processing Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Entity Extraction</span>
                  <span className="text-green-400">87%</span>
                </div>
                <Progress value={87} className="h-2 bg-gray-800" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Relation Mapping</span>
                  <span className="text-blue-400">94%</span>
                </div>
                <Progress value={94} className="h-2 bg-gray-800" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Embedding Generation</span>
                  <span className="text-purple-400">76%</span>
                </div>
                <Progress value={76} className="h-2 bg-gray-800" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-300">Graph Construction</span>
                  <span className="text-orange-400">91%</span>
                </div>
                <Progress value={91} className="h-2 bg-gray-800" />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Queue Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Processing</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">24 items in queue • ETA: 3 minutes</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
