import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Music, 
  Brain, 
  Activity, 
  Waves, 
  Volume2, 
  Target,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Moon,
  Sun
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigation = [
    { 
      id: 'dashboard', 
      name: 'Overview', 
      icon: Heart, 
      gradient: 'from-rose-400 via-fuchsia-500 to-indigo-500',
      count: 3
    },
    { 
      id: 'music', 
      name: 'Audio Therapy', 
      icon: Music, 
      gradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
      count: 12
    },
    { 
      id: 'meditation', 
      name: 'Mindfulness', 
      icon: Brain, 
      gradient: 'from-cyan-400 via-blue-500 to-indigo-500'
    },
    { 
      id: 'exercises', 
      name: 'Movement', 
      icon: Activity, 
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
      count: 8
    },
    { 
      id: 'breathing', 
      name: 'Breathwork', 
      icon: Waves, 
      gradient: 'from-blue-400 via-cyan-500 to-teal-500'
    },
    { 
      id: 'sounds', 
      name: 'Soundscapes', 
      icon: Volume2, 
      gradient: 'from-orange-400 via-red-500 to-pink-500'
    },
    { 
      id: 'tracker', 
      name: 'Analytics', 
      icon: Target, 
      gradient: 'from-amber-400 via-orange-500 to-red-500',
      count: 24
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
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
                    <h2 className="text-3xl font-bold mb-2">Good {time.getHours() < 12 ? 'Morning' : time.getHours() < 18 ? 'Afternoon' : 'Evening'}</h2>
                    <p className="text-indigo-100">Ready to optimize your wellness journey?</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-indigo-200">{time.toLocaleDateString()}</div>
                    <div className="text-2xl font-mono">{time.toLocaleTimeString()}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">3.2</div>
                        <div className="text-sm text-indigo-200">Pain Level</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">89%</div>
                        <div className="text-sm text-indigo-200">Recovery</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">7</div>
                        <div className="text-sm text-indigo-200">Day Streak</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Music, label: 'Quick Session', subtitle: '5 min therapy', gradient: 'from-purple-500 to-pink-500' },
                { icon: Waves, label: 'Breathing', subtitle: '4-7-8 technique', gradient: 'from-blue-500 to-cyan-500' },
                { icon: Brain, label: 'Meditation', subtitle: 'Mindful moment', gradient: 'from-indigo-500 to-purple-500' },
                { icon: Activity, label: 'Movement', subtitle: 'Gentle stretch', gradient: 'from-emerald-500 to-teal-500' }
              ].map((action, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 p-6 text-left transition-all hover:bg-white/80 dark:hover:bg-gray-800/80"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <action.icon className="w-8 h-8 text-gray-700 dark:text-white mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{action.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{action.subtitle}</p>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors" />
                </motion.button>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Weekly Progress</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Pain Reduction', value: 85, color: 'bg-gradient-to-r from-green-400 to-emerald-500' },
                    { label: 'Sleep Quality', value: 72, color: 'bg-gradient-to-r from-blue-400 to-cyan-500' },
                    { label: 'Mood Balance', value: 91, color: 'bg-gradient-to-r from-purple-400 to-pink-500' },
                    { label: 'Energy Level', value: 68, color: 'bg-gradient-to-r from-orange-400 to-yellow-500' }
                  ].map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{stat.label}</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{stat.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.value}%` }}
                          transition={{ delay: index * 0.2, duration: 1, ease: "easeOut" }}
                          className={`h-full ${stat.color} rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/20 p-6"
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Today's Goals</h3>
                <div className="space-y-4">
                  {[
                    { task: 'Morning meditation', completed: true },
                    { task: 'Pain tracking', completed: true },
                    { task: 'Breathing exercise', completed: false },
                    { task: 'Evening therapy', completed: false }
                  ].map((goal, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        goal.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {goal.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </div>
                      <span className={`text-sm ${goal.completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                        {goal.task}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 'music':
        return (
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 rounded-3xl p-8 text-white"
            >
              <h2 className="text-2xl font-bold mb-6">Audio Therapy Studio</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Ocean Waves', duration: '15:30', type: 'Nature', gradient: 'from-blue-400 to-cyan-500' },
                  { title: 'Forest Rain', duration: '22:15', type: 'Ambient', gradient: 'from-green-400 to-emerald-500' },
                  { title: 'Binaural Healing', duration: '30:00', type: 'Therapeutic', gradient: 'from-purple-400 to-pink-500' }
                ].map((track, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${track.gradient} rounded-2xl mb-4 flex items-center justify-center`}>
                      <Music className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{track.title}</h3>
                    <p className="text-sm text-white/70 mb-1">{track.type}</p>
                    <p className="text-sm text-white/50">{track.duration}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'breathing':
        return (
          <div className="flex items-center justify-center min-h-[500px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-white/20 p-12 text-center max-w-lg"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
              >
                <Waves className="w-16 h-16 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4-7-8 Breathing</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg"
              >
                Start Session
              </motion.button>
            </motion.div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center"
            >
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {navigation.find(n => n.id === activeTab)?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Premium module loading...</p>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="flex">
        {/* Sidebar */}
        <motion.nav 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 min-h-screen bg-white/40 dark:bg-gray-900/40 backdrop-blur-2xl border-r border-white/20 dark:border-gray-800/20"
        >
          {/* Logo */}
          <div className="p-8 border-b border-white/10 dark:border-gray-800/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  PainRelief Pro
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Infinex Design</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="p-6 space-y-3">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-white/80 dark:bg-gray-800/80 shadow-lg border border-white/40'
                      : 'hover:bg-white/30 dark:hover:bg-gray-800/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    isActive 
                      ? `bg-gradient-to-br ${item.gradient}` 
                      : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`font-medium ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {item.name}
                    </div>
                    {item.count && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.count} available
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-2 h-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-10 h-10 bg-white/20 dark:bg-gray-700/30 rounded-xl flex items-center justify-center hover:bg-white/30 dark:hover:bg-gray-600/30 transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
                </button>
                <button className="w-10 h-10 bg-white/20 dark:bg-gray-700/30 rounded-xl flex items-center justify-center hover:bg-white/30 dark:hover:bg-gray-600/30 transition-colors">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="w-10 h-10 bg-white/20 dark:bg-gray-700/30 rounded-xl flex items-center justify-center hover:bg-white/30 dark:hover:bg-gray-600/30 transition-colors">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
