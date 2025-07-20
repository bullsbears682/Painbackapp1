import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Settings,
  Waves,
  Cloud,
  TreePine,
  Mountain,
  Zap,
  Clock,
  Heart,
  Brain
} from 'lucide-react';

interface SoundOption {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  benefits: string[];
  frequency?: string;
  isPlaying: boolean;
  volume: number;
}

interface Preset {
  id: string;
  name: string;
  description: string;
  sounds: { id: string; volume: number }[];
  category: string;
  benefits: string[];
}

const SoundTherapy: React.FC = () => {
  const [sounds, setSounds] = useState<SoundOption[]>([]);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [masterVolume, setMasterVolume] = useState(70);
  const [isMasterMuted, setIsMasterMuted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sessionTime, setSessionTime] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);

  const categories = [
    { id: 'all', name: 'All Sounds' },
    { id: 'nature', name: 'Nature' },
    { id: 'ambient', name: 'Ambient' },
    { id: 'white-noise', name: 'White Noise' },
    { id: 'binaural', name: 'Binaural Beats' },
    { id: 'meditation', name: 'Meditation' }
  ];

  useEffect(() => {
    const initialSounds: SoundOption[] = [
      {
        id: 'rain',
        name: 'Rain',
        description: 'Gentle rainfall sounds for relaxation',
        category: 'nature',
        icon: Cloud,
        benefits: ['Reduces anxiety', 'Promotes sleep', 'Masks pain perception'],
        isPlaying: false,
        volume: 50
      },
      {
        id: 'ocean',
        name: 'Ocean Waves',
        description: 'Rhythmic ocean waves for deep relaxation',
        category: 'nature',
        icon: Waves,
        benefits: ['Lowers blood pressure', 'Reduces stress', 'Pain relief'],
        isPlaying: false,
        volume: 60
      },
      {
        id: 'forest',
        name: 'Forest Sounds',
        description: 'Birds and wind through trees',
        category: 'nature',
        icon: TreePine,
        benefits: ['Mental clarity', 'Stress reduction', 'Natural healing'],
        isPlaying: false,
        volume: 45
      },
      {
        id: 'mountain',
        name: 'Mountain Wind',
        description: 'High altitude winds and distant echoes',
        category: 'nature',
        icon: Mountain,
        benefits: ['Deep focus', 'Emotional release', 'Grounding'],
        isPlaying: false,
        volume: 40
      },
      {
        id: 'white-noise',
        name: 'White Noise',
        description: 'Consistent frequency for focus and pain masking',
        category: 'white-noise',
        icon: Zap,
        benefits: ['Blocks distractions', 'Pain masking', 'Improves concentration'],
        isPlaying: false,
        volume: 55
      },
      {
        id: 'brown-noise',
        name: 'Brown Noise',
        description: 'Lower frequency noise for deep relaxation',
        category: 'white-noise',
        icon: Zap,
        benefits: ['Deep sleep', 'Anxiety reduction', 'Pain relief'],
        isPlaying: false,
        volume: 50
      },
      {
        id: 'alpha-waves',
        name: 'Alpha Waves',
        description: '10Hz binaural beats for relaxation',
        category: 'binaural',
        icon: Brain,
        benefits: ['Relaxation', 'Pain relief', 'Improved focus'],
        frequency: '10Hz',
        isPlaying: false,
        volume: 35
      },
      {
        id: 'theta-waves',
        name: 'Theta Waves',
        description: '6Hz binaural beats for deep healing',
        category: 'binaural',
        icon: Brain,
        benefits: ['Deep relaxation', 'Healing', 'Meditation'],
        frequency: '6Hz',
        isPlaying: false,
        volume: 30
      },
      {
        id: 'delta-waves',
        name: 'Delta Waves',
        description: '2Hz binaural beats for sleep and recovery',
        category: 'binaural',
        icon: Brain,
        benefits: ['Deep sleep', 'Recovery', 'Pain relief'],
        frequency: '2Hz',
        isPlaying: false,
        volume: 25
      },
      {
        id: 'singing-bowls',
        name: 'Tibetan Bowls',
        description: 'Traditional singing bowls for meditation',
        category: 'meditation',
        icon: Heart,
        benefits: ['Stress relief', 'Emotional healing', 'Chakra balancing'],
        isPlaying: false,
        volume: 40
      }
    ];

    const initialPresets: Preset[] = [
      {
        id: 'deep-sleep',
        name: 'Deep Sleep',
        description: 'Combination of sounds to promote restful sleep',
        sounds: [
          { id: 'rain', volume: 60 },
          { id: 'delta-waves', volume: 30 },
          { id: 'brown-noise', volume: 20 }
        ],
        category: 'sleep',
        benefits: ['Improves sleep quality', 'Reduces nighttime pain', 'Deep rest']
      },
      {
        id: 'pain-relief',
        name: 'Pain Relief',
        description: 'Therapeutic frequencies and masking sounds for pain management',
        sounds: [
          { id: 'alpha-waves', volume: 40 },
          { id: 'ocean', volume: 50 },
          { id: 'white-noise', volume: 30 }
        ],
        category: 'therapy',
        benefits: ['Reduces pain perception', 'Promotes healing', 'Relaxation']
      },
      {
        id: 'stress-relief',
        name: 'Stress Relief',
        description: 'Natural sounds for immediate stress reduction',
        sounds: [
          { id: 'forest', volume: 55 },
          { id: 'rain', volume: 40 },
          { id: 'theta-waves', volume: 25 }
        ],
        category: 'wellness',
        benefits: ['Reduces cortisol', 'Calms nervous system', 'Mental clarity']
      },
      {
        id: 'focus-meditation',
        name: 'Focus & Meditation',
        description: 'Sounds to enhance meditation and mindfulness',
        sounds: [
          { id: 'singing-bowls', volume: 50 },
          { id: 'mountain', volume: 30 },
          { id: 'alpha-waves', volume: 35 }
        ],
        category: 'meditation',
        benefits: ['Deep focus', 'Mindfulness', 'Spiritual connection']
      }
    ];

    setSounds(initialSounds);
    setPresets(initialPresets);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive]);

  const toggleSound = (soundId: string) => {
    setSounds(prev => prev.map(sound => 
      sound.id === soundId 
        ? { ...sound, isPlaying: !sound.isPlaying }
        : sound
    ));

    // Start session if any sound is playing
    const hasPlayingSounds = sounds.some(s => s.id === soundId ? !s.isPlaying : s.isPlaying);
    setIsSessionActive(hasPlayingSounds || sounds.some(s => s.isPlaying));
  };

  const updateSoundVolume = (soundId: string, volume: number) => {
    setSounds(prev => prev.map(sound => 
      sound.id === soundId 
        ? { ...sound, volume }
        : sound
    ));
  };

  const loadPreset = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;

    setSelectedPreset(presetId);
    
    // Stop all sounds first
    setSounds(prev => prev.map(sound => ({ ...sound, isPlaying: false })));
    
    // Apply preset configuration
    setTimeout(() => {
      setSounds(prev => prev.map(sound => {
        const presetSound = preset.sounds.find(ps => ps.id === sound.id);
        return presetSound 
          ? { ...sound, isPlaying: true, volume: presetSound.volume }
          : sound;
      }));
      setIsSessionActive(true);
    }, 100);
  };

  const stopAllSounds = () => {
    setSounds(prev => prev.map(sound => ({ ...sound, isPlaying: false })));
    setIsSessionActive(false);
    setSelectedPreset(null);
  };

  const resetSession = () => {
    stopAllSounds();
    setSessionTime(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredSounds = selectedCategory === 'all' 
    ? sounds 
    : sounds.filter(sound => sound.category === selectedCategory);

  const activeSounds = sounds.filter(sound => sound.isPlaying);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sound Therapy</h1>
        <p className="text-gray-600">Therapeutic sounds and frequencies for pain relief and healing</p>
      </motion.div>

      {/* Session Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Session Control</h3>
            <p className="text-sm text-gray-600">
              {isSessionActive ? `Active session: ${formatTime(sessionTime)}` : 'No active session'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMasterMuted(!isMasterMuted)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {isMasterMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMasterMuted ? 0 : masterVolume}
                onChange={(e) => {
                  setMasterVolume(Number(e.target.value));
                  setIsMasterMuted(false);
                }}
                className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-500 w-8">{isMasterMuted ? 0 : masterVolume}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetSession}
              className="btn-secondary flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopAllSounds}
              className="btn-primary"
            >
              Stop All
            </motion.button>
          </div>
        </div>

        {/* Active Sounds */}
        {activeSounds.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Active Sounds ({activeSounds.length})</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeSounds.map((sound) => {
                const Icon = sound.icon;
                return (
                  <div key={sound.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900">{sound.name}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sound.volume}
                          onChange={(e) => updateSoundVolume(sound.id, Number(e.target.value))}
                          className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-500 w-8">{sound.volume}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>

      {/* Presets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Therapeutic Presets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presets.map((preset, index) => (
            <motion.button
              key={preset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => loadPreset(preset.id)}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                selectedPreset === preset.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <h3 className="font-semibold text-gray-900 mb-2">{preset.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{preset.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {preset.benefits.map((benefit, i) => (
                  <span key={i} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {benefit}
                  </span>
                ))}
              </div>

              <div className="text-xs text-gray-500">
                {preset.sounds.length} sounds included
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-sm font-medium">{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Sound Library */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Sound Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSounds.map((sound, index) => {
            const Icon = sound.icon;
            return (
              <motion.div
                key={sound.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  sound.isPlaying
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      sound.isPlaying ? 'bg-orange-500' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${sound.isPlaying ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{sound.name}</h3>
                      {sound.frequency && (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          {sound.frequency}
                        </span>
                      )}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSound(sound.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      sound.isPlaying
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {sound.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </motion.button>
                </div>

                <p className="text-sm text-gray-600 mb-3">{sound.description}</p>

                {sound.isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-3"
                  >
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-gray-500" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={sound.volume}
                        onChange={(e) => updateSoundVolume(sound.id, Number(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm text-gray-500 w-8">{sound.volume}</span>
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-wrap gap-1">
                  {sound.benefits.slice(0, 2).map((benefit, i) => (
                    <span key={i} className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      {benefit}
                    </span>
                  ))}
                  {sound.benefits.length > 2 && (
                    <span className="text-xs text-gray-500">+{sound.benefits.length - 2} more</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default SoundTherapy;