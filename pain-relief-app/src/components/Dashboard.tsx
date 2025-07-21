import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart,
  TrendingUp,
  Zap,
  Calendar,
  Award,
  Target,
  Activity,
  Smile,
  Moon,
  Sun,
  Brain,
  Shield,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [painLevel, setPainLevel] = useState(3.2);
  const [mood, setMood] = useState(85);
  const [streak, setStreak] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      id: 'pain',
      label: 'Pain Level',
      value: painLevel.toFixed(1),
      unit: '/10',
      icon: Heart,
      gradient: 'from-red-400 to-pink-500',
      progress: (10 - painLevel) * 10,
      trend: -12,
      description: 'Better than yesterday'
    },
    {
      id: 'recovery',
      label: 'Recovery',
      value: '89',
      unit: '%',
      icon: TrendingUp,
      gradient: 'from-green-400 to-emerald-500',
      progress: 89,
      trend: +8,
      description: 'Weekly improvement'
    },
    {
      id: 'energy',
      label: 'Energy',
      value: '76',
      unit: '%',
      icon: Zap,
      gradient: 'from-yellow-400 to-orange-500',
      progress: 76,
      trend: +5,
      description: 'Above average'
    },
    {
      id: 'streak',
      label: 'Streak',
      value: streak,
      unit: ' days',
      icon: Shield,
      gradient: 'from-purple-400 to-indigo-500',
      progress: Math.min(streak * 10, 100),
      trend: +1,
      description: 'Keep it up!'
    }
  ];

  const weeklyData = [
    { day: 'Mon', pain: 4.2, mood: 70, energy: 65 },
    { day: 'Tue', pain: 3.8, mood: 75, energy: 70 },
    { day: 'Wed', pain: 3.5, mood: 80, energy: 75 },
    { day: 'Thu', pain: 3.2, mood: 82, energy: 78 },
    { day: 'Fri', pain: 3.0, mood: 85, energy: 80 },
    { day: 'Sat', pain: 2.8, mood: 88, energy: 82 },
    { day: 'Sun', pain: 3.2, mood: 85, energy: 76 }
  ];

  const achievements = [
    { id: 1, title: 'Week Warrior', description: '7 days of consistent tracking', icon: Award, completed: true },
    { id: 2, title: 'Pain Fighter', description: 'Reduced pain by 20%', icon: Shield, completed: true },
    { id: 3, title: 'Meditation Master', description: '10 meditation sessions', icon: Brain, completed: false },
    { id: 4, title: 'Mood Booster', description: 'Maintain 80+ mood for 5 days', icon: Smile, completed: false }
  ];

  const quickActions = [
    { 
      label: 'Log Pain', 
      subtitle: 'Track current levels', 
      icon: Heart, 
      gradient: 'from-red-500 to-pink-500',
      action: 'pain'
    },
    { 
      label: 'Quick Meditation', 
      subtitle: '5 min session', 
      icon: Brain, 
      gradient: 'from-indigo-500 to-purple-500',
      action: 'meditation'
    },
    { 
      label: 'Breathing', 
      subtitle: '4-7-8 technique', 
      icon: Activity, 
      gradient: 'from-blue-500 to-cyan-500',
      action: 'breathing'
    },
    { 
      label: 'Mood Check', 
      subtitle: 'How are you feeling?', 
      icon: Smile, 
      gradient: 'from-yellow-500 to-orange-500',
      action: 'mood'
    }
  ];

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-8 text-white"
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{getGreeting()}</h1>
              <p className="text-indigo-100">Ready to optimize your wellness journey?</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-indigo-200">{time.toLocaleDateString()}</div>
              <div className="text-2xl font-mono">{time.toLocaleTimeString()}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold">{stat.value}{stat.unit}</div>
                      <div className="text-xs text-indigo-200">{stat.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-indigo-200">{stat.description}</span>
                    <span className={`font-semibold ${stat.trend > 0 ? 'text-green-300' : 'text-red-300'}`}>
                      {stat.trend > 0 ? '+' : ''}{stat.trend}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Progress Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card-premium p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Weekly Progress</h3>
            <div className="flex space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Pain</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Mood</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Energy</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between space-x-4">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex flex-col space-y-1">
                  {/* Pain bar (inverted - lower is better) */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(10 - day.pain) * 8}px` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    className="w-full bg-gradient-to-t from-red-400 to-pink-500 rounded-t-sm"
                  ></motion.div>
                  
                  {/* Mood bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${day.mood * 1.5}px` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                    className="w-full bg-gradient-to-t from-green-400 to-emerald-500 rounded-sm"
                  ></motion.div>
                  
                  {/* Energy bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${day.energy * 1.5}px` }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                    className="w-full bg-gradient-to-t from-yellow-400 to-orange-500 rounded-b-sm"
                  ></motion.div>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{day.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-premium p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Quick Actions</h3>
          <div className="space-y-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.action}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-4 p-4 rounded-xl bg-white/40 dark:bg-gray-800/40 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">{action.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{action.subtitle}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Achievements & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-4 p-4 rounded-xl transition-all ${
                    achievement.completed 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    achievement.completed 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    <Icon className={`w-6 h-6 ${achievement.completed ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${
                      achievement.completed 
                        ? 'text-green-800 dark:text-green-200' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {achievement.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </div>
                  </div>
                  {achievement.completed && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Today's Goals */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card-premium p-6"
        >
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Today's Goals</h3>
          <div className="space-y-4">
            {[
              { task: 'Morning meditation', completed: true, time: '7:30 AM' },
              { task: 'Pain level tracking', completed: true, time: '12:00 PM' },
              { task: 'Afternoon breathing', completed: false, time: '3:00 PM' },
              { task: 'Evening therapy', completed: false, time: '8:00 PM' },
              { task: 'Sleep preparation', completed: false, time: '10:00 PM' }
            ].map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/40 dark:hover:bg-gray-800/40 transition-colors"
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  goal.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {goal.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <div className="flex-1">
                  <span className={`text-sm font-medium ${
                    goal.completed 
                      ? 'line-through text-gray-500 dark:text-gray-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {goal.task}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{goal.time}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Progress</span>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">40%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '40%' }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;