import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Target,
  Award,
  Activity,
  Heart,
  Brain,
  Smile,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

interface PainLevel {
  date: string;
  level: number;
  type: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  completed: boolean;
  date?: string;
}

const Dashboard: React.FC = () => {
  const [painData, setPainData] = useState<PainLevel[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [todaysMood, setTodaysMood] = useState(7);
  const [currentStreak, setCurrentStreak] = useState(5);

  useEffect(() => {
    // Simulate pain tracking data
    const mockPainData: PainLevel[] = [
      { date: '2024-01-15', level: 6, type: 'Lower Back' },
      { date: '2024-01-16', level: 4, type: 'Lower Back' },
      { date: '2024-01-17', level: 5, type: 'Neck' },
      { date: '2024-01-18', level: 3, type: 'Lower Back' },
      { date: '2024-01-19', level: 2, type: 'Lower Back' },
      { date: '2024-01-20', level: 4, type: 'Headache' },
      { date: '2024-01-21', level: 3, type: 'Lower Back' },
    ];

    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: '7-Day Streak',
        description: 'Completed exercises for 7 consecutive days',
        icon: Award,
        completed: true,
        date: '2024-01-21'
      },
      {
        id: '2',
        title: 'Meditation Master',
        description: 'Completed 50 meditation sessions',
        icon: Brain,
        completed: true,
        date: '2024-01-20'
      },
      {
        id: '3',
        title: 'Pain-Free Day',
        description: 'Recorded a pain level of 0-1',
        icon: Smile,
        completed: false
      },
      {
        id: '4',
        title: 'Music Therapy Pro',
        description: 'Listened to therapy music for 10 hours',
        icon: Heart,
        completed: true,
        date: '2024-01-19'
      }
    ];

    setPainData(mockPainData);
    setAchievements(mockAchievements);
  }, []);

  const averagePainLevel = painData.length > 0 
    ? Math.round(painData.reduce((sum, data) => sum + data.level, 0) / painData.length * 10) / 10
    : 0;

  const painTrend = painData.length >= 2
    ? painData[painData.length - 1].level - painData[painData.length - 2].level
    : 0;

  const completedAchievements = achievements.filter(a => a.completed).length;

  const getWellnessRecommendations = () => {
    const recommendations = [];
    
    if (averagePainLevel > 5) {
      recommendations.push({
        type: 'urgent',
        title: 'Consider Gentle Movement',
        description: 'Your average pain level is elevated. Try some gentle stretching exercises.',
        icon: Activity
      });
    }
    
    if (currentStreak < 3) {
      recommendations.push({
        type: 'motivation',
        title: 'Build Your Streak',
        description: 'Consistency is key. Try to complete at least one activity daily.',
        icon: Target
      });
    }

    if (todaysMood < 6) {
      recommendations.push({
        type: 'mood',
        title: 'Mood Boost Needed',
        description: 'Consider a music therapy session or meditation to lift your spirits.',
        icon: Smile
      });
    }

    return recommendations;
  };

  const recommendations = getWellnessRecommendations();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
            <p className="text-blue-100">Ready to continue your wellness journey?</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{currentStreak}</div>
            <div className="text-sm text-blue-100">Day Streak</div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Pain Level</p>
              <p className="text-2xl font-bold text-gray-900">{averagePainLevel}/10</p>
              <div className="flex items-center mt-1">
                {painTrend < 0 ? (
                  <>
                    <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">Improving</span>
                  </>
                ) : painTrend > 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                    <span className="text-sm text-red-600">Increasing</span>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-1"></div>
                    <span className="text-sm text-gray-600">Stable</span>
                  </>
                )}
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Today's Mood</p>
              <p className="text-2xl font-bold text-gray-900">{todaysMood}/10</p>
              <p className="text-sm text-gray-500 mt-1">
                {todaysMood >= 8 ? 'Excellent' : todaysMood >= 6 ? 'Good' : todaysMood >= 4 ? 'Fair' : 'Needs attention'}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Smile className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{completedAchievements}/{achievements.length}</p>
              <p className="text-sm text-green-600 mt-1">
                {Math.round((completedAchievements / achievements.length) * 100)}% Complete
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">This Week</p>
              <p className="text-2xl font-bold text-gray-900">32h</p>
              <p className="text-sm text-purple-600 mt-1">Therapy Time</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pain Tracking Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pain Levels (Last 7 Days)</h3>
            <LineChart className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-3">
            {painData.slice(-7).map((data, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="text-sm text-gray-600 w-16">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{data.type}</span>
                    <span className="text-sm font-medium">{data.level}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        data.level <= 3 ? 'bg-green-500' :
                        data.level <= 6 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(data.level / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Achievements</h3>
            <Award className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border ${
                    achievement.completed
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.completed ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    {achievement.completed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {achievement.date && (
                      <p className="text-xs text-gray-500 mt-1">
                        Completed on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Recommendations</h3>
            <Target className="w-5 h-5 text-gray-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.type === 'urgent' ? 'bg-red-50 border-red-500' :
                    rec.type === 'motivation' ? 'bg-blue-50 border-blue-500' :
                    'bg-yellow-50 border-yellow-500'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      rec.type === 'urgent' ? 'bg-red-100' :
                      rec.type === 'motivation' ? 'bg-blue-100' :
                      'bg-yellow-100'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        rec.type === 'urgent' ? 'text-red-600' :
                        rec.type === 'motivation' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">{rec.title}</p>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;