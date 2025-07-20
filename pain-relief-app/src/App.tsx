import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Brain, 
  Music, 
  Activity, 
  Calendar, 
  Settings, 
  Play, 
  Pause, 
  Volume2, 
  BarChart3,
  Target,
  Shield,
  Sparkles,
  Moon,
  Sun,
  Waves,
  Zap
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import MusicTherapy from './components/MusicTherapy';
import Exercises from './components/Exercises';
import Meditation from './components/Meditation';
import PainTracker from './components/PainTracker';
import SoundTherapy from './components/SoundTherapy';
import BreathingExercise from './components/BreathingExercise';

interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  gradient: string;
}

const navigation: NavigationItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: BarChart3, gradient: 'from-blue-500 to-cyan-500' },
  { id: 'music', name: 'Music Therapy', icon: Music, gradient: 'from-purple-500 to-pink-500' },
  { id: 'meditation', name: 'Meditation', icon: Brain, gradient: 'from-indigo-500 to-purple-500' },
  { id: 'exercises', name: 'Exercises', icon: Activity, gradient: 'from-green-500 to-emerald-500' },
  { id: 'breathing', name: 'Breathing', icon: Waves, gradient: 'from-cyan-500 to-blue-500' },
  { id: 'sounds', name: 'Sound Therapy', icon: Volume2, gradient: 'from-orange-500 to-red-500' },
  { id: 'tracker', name: 'Pain Tracker', icon: Target, gradient: 'from-red-500 to-pink-500' },
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'music':
        return <MusicTherapy />;
      case 'meditation':
        return <Meditation />;
      case 'exercises':
        return <Exercises />;
      case 'breathing':
        return <BreathingExercise />;
      case 'sounds':
        return <SoundTherapy />;
      case 'tracker':
        return <PainTracker />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
              <Heart className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              PainRelief Pro
            </h1>
            <p className="text-gray-600 mt-2">Your Personal Pain Management Companion</p>
          </div>
          <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-all duration-300`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                PainRelief Pro
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white dark:bg-gray-800 min-h-[calc(100vh-4rem)] shadow-lg border-r border-gray-200 dark:border-gray-700">
          <div className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto"
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
          
          {/* Quick Stats */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Streak</span>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">7 days</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Energy</span>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-600">85%</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6"
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
