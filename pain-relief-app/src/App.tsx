import React, { useState } from 'react';
import { Heart, Music, Brain, Activity, Waves, Volume2, Target } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Heart },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'meditation', name: 'Meditation', icon: Brain },
    { id: 'exercises', name: 'Exercises', icon: Activity },
    { id: 'breathing', name: 'Breathing', icon: Waves },
    { id: 'sounds', name: 'Sounds', icon: Volume2 },
    { id: 'tracker', name: 'Tracker', icon: Target },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Pain Management Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Today's Pain Level</h3>
                <div className="text-3xl font-bold text-blue-600">3/10</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Mood</h3>
                <div className="text-3xl font-bold text-green-600">😊 Good</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Activities</h3>
                <div className="text-sm">5 breathing exercises completed</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Music Sessions</h3>
                <div className="text-sm">2 therapy sessions today</div>
              </div>
            </div>
          </div>
        );
      case 'music':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Music Therapy</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Healing Sounds</h3>
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-100 rounded text-left hover:bg-blue-200">
                  🎵 Ocean Waves - 10 minutes
                </button>
                <button className="w-full p-3 bg-blue-100 rounded text-left hover:bg-blue-200">
                  🎵 Forest Rain - 15 minutes  
                </button>
                <button className="w-full p-3 bg-blue-100 rounded text-left hover:bg-blue-200">
                  🎵 Meditation Bells - 20 minutes
                </button>
              </div>
            </div>
          </div>
        );
      case 'breathing':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Breathing Exercises</h2>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-blue-200 rounded-full flex items-center justify-center">
                <div className="text-4xl">💨</div>
              </div>
              <h3 className="font-semibold mb-2">4-7-8 Breathing</h3>
              <p className="text-gray-600 mb-4">Breathe in for 4, hold for 7, exhale for 8</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Start Exercise
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{navigation.find(n => n.id === activeTab)?.name}</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <p>This module is being loaded...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">
            🏥 PainRelief Pro
          </h1>
        </div>
        <nav className="p-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
