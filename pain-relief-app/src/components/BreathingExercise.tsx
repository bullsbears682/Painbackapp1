import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Waves,
  Wind,
  Heart,
  Leaf,
  Circle,
  Timer,
  TrendingUp
} from 'lucide-react';

interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  inhale: number;
  hold: number;
  exhale: number;
  rest: number;
  cycles: number;
  benefits: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface Session {
  id: string;
  date: string;
  pattern: string;
  duration: number;
  completedCycles: number;
}

const BreathingExercise: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [customDuration, setCustomDuration] = useState(5);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const breathingPatterns: BreathingPattern[] = [
    {
      id: 'box',
      name: 'Box Breathing',
      description: 'Equal timing for all phases, great for stress relief',
      icon: Circle,
      inhale: 4,
      hold: 4,
      exhale: 4,
      rest: 4,
      cycles: 8,
      benefits: ['Reduces stress', 'Improves focus', 'Calms nervous system'],
      difficulty: 'Beginner'
    },
    {
      id: '478',
      name: '4-7-8 Breathing',
      description: 'Dr. Weil\'s relaxing breath technique',
      icon: Waves,
      inhale: 4,
      hold: 7,
      exhale: 8,
      rest: 0,
      cycles: 6,
      benefits: ['Promotes sleep', 'Reduces anxiety', 'Pain relief'],
      difficulty: 'Intermediate'
    },
    {
      id: 'coherent',
      name: 'Coherent Breathing',
      description: '5-second breathing for heart rate variability',
      icon: Heart,
      inhale: 5,
      hold: 0,
      exhale: 5,
      rest: 0,
      cycles: 12,
      benefits: ['Heart coherence', 'Emotional balance', 'Stress reduction'],
      difficulty: 'Beginner'
    },
    {
      id: 'extended',
      name: 'Extended Exhale',
      description: 'Longer exhale activates parasympathetic nervous system',
      icon: Wind,
      inhale: 4,
      hold: 2,
      exhale: 8,
      rest: 0,
      cycles: 10,
      benefits: ['Deep relaxation', 'Pain management', 'Better sleep'],
      difficulty: 'Intermediate'
    },
    {
      id: 'triangle',
      name: 'Triangle Breathing',
      description: 'Three-phase breathing without holds',
      icon: Leaf,
      inhale: 6,
      hold: 0,
      exhale: 6,
      rest: 6,
      cycles: 8,
      benefits: ['Mental clarity', 'Grounding', 'Anxiety relief'],
      difficulty: 'Advanced'
    }
  ];

  useEffect(() => {
    if (!selectedPattern) {
      setSelectedPattern(breathingPatterns[0]);
    }
  }, []);

  useEffect(() => {
    if (isActive && selectedPattern) {
      startBreathingCycle();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, selectedPattern, currentCycle]);

  const startBreathingCycle = () => {
    if (!selectedPattern || currentCycle >= selectedPattern.cycles) {
      handleComplete();
      return;
    }

    const phases = [
      { name: 'inhale' as const, duration: selectedPattern.inhale },
      ...(selectedPattern.hold > 0 ? [{ name: 'hold' as const, duration: selectedPattern.hold }] : []),
      { name: 'exhale' as const, duration: selectedPattern.exhale },
      ...(selectedPattern.rest > 0 ? [{ name: 'rest' as const, duration: selectedPattern.rest }] : [])
    ];

    let phaseIndex = 0;
    let timeLeft = phases[0].duration;

    setCurrentPhase(phases[0].name);
    setTimeRemaining(timeLeft);

    intervalRef.current = setInterval(() => {
      timeLeft -= 1;
      setTimeRemaining(timeLeft);

      if (timeLeft <= 0) {
        phaseIndex += 1;
        if (phaseIndex >= phases.length) {
          setCurrentCycle(prev => prev + 1);
          return;
        }
        
        const nextPhase = phases[phaseIndex];
        setCurrentPhase(nextPhase.name);
        timeLeft = nextPhase.duration;
        setTimeRemaining(timeLeft);
      }
    }, 1000);
  };

  const handleStart = () => {
    if (!selectedPattern) return;
    
    setIsActive(true);
    setCurrentCycle(0);
    setTotalTime(0);
    
    const totalSeconds = selectedPattern.cycles * (
      selectedPattern.inhale + 
      selectedPattern.hold + 
      selectedPattern.exhale + 
      selectedPattern.rest
    );
    setTotalTime(totalSeconds);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentCycle(0);
    setCurrentPhase('inhale');
    setTimeRemaining(0);
    setTotalTime(0);
  };

  const handleComplete = () => {
    setIsActive(false);
    
    if (selectedPattern) {
      const newSession: Session = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        pattern: selectedPattern.name,
        duration: Math.floor(totalTime / 60),
        completedCycles: currentCycle
      };
      
      setSessions(prev => [newSession, ...prev.slice(0, 9)]);
    }
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'rest':
        return 'Rest';
      default:
        return 'Ready';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'from-blue-400 to-blue-600';
      case 'hold':
        return 'from-purple-400 to-purple-600';
      case 'exhale':
        return 'from-green-400 to-green-600';
      case 'rest':
        return 'from-gray-400 to-gray-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const getBreathingCircleScale = () => {
    if (!isActive) return 1;
    
    switch (currentPhase) {
      case 'inhale':
        return 1.4;
      case 'hold':
        return 1.4;
      case 'exhale':
        return 1;
      case 'rest':
        return 1;
      default:
        return 1;
    }
  };

  const progress = selectedPattern && currentCycle > 0 
    ? (currentCycle / selectedPattern.cycles) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Breathing Exercises</h1>
        <p className="text-gray-600">Guided breathing techniques for pain relief and relaxation</p>
      </motion.div>

      {/* Breathing Circle and Controls */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card text-center"
      >
        <div className="mb-8">
          <div className="relative flex items-center justify-center h-80">
            {/* Outer circle */}
            <motion.div
              className="absolute w-64 h-64 rounded-full border-4 border-gray-200"
              animate={{ 
                scale: isActive ? [1, 1.1, 1] : 1,
                opacity: isActive ? [0.3, 0.6, 0.3] : 0.3
              }}
              transition={{ 
                duration: selectedPattern ? (
                  selectedPattern.inhale + 
                  selectedPattern.hold + 
                  selectedPattern.exhale + 
                  selectedPattern.rest
                ) : 16,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
            
            {/* Main breathing circle */}
            <motion.div
              className={`w-48 h-48 rounded-full bg-gradient-to-br ${getPhaseColor()} flex items-center justify-center shadow-2xl`}
              animate={{ 
                scale: getBreathingCircleScale()
              }}
              transition={{ 
                duration: timeRemaining,
                ease: "easeInOut"
              }}
            >
              <div className="text-center text-white">
                <div className="text-2xl font-bold mb-2">{getPhaseInstruction()}</div>
                <div className="text-4xl font-light">{timeRemaining}</div>
                {selectedPattern && (
                  <div className="text-sm opacity-75 mt-2">
                    Cycle {currentCycle + 1} of {selectedPattern.cycles}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Breathing guide particles */}
            {isActive && (
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: '-4px',
                      marginTop: '-4px',
                    }}
                    animate={{
                      x: Math.cos((i * Math.PI) / 4) * (isActive ? 120 : 0),
                      y: Math.sin((i * Math.PI) / 4) * (isActive ? 120 : 0),
                      opacity: isActive ? [0, 1, 0] : 0,
                    }}
                    transition={{
                      duration: selectedPattern ? (
                        selectedPattern.inhale + 
                        selectedPattern.hold + 
                        selectedPattern.exhale + 
                        selectedPattern.rest
                      ) : 16,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Progress bar */}
          {selectedPattern && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="btn-secondary flex items-center space-x-2"
            disabled={!selectedPattern}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isActive ? handlePause : handleStart}
            className="btn-primary flex items-center space-x-2 px-8"
            disabled={!selectedPattern}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isActive ? 'Pause' : 'Start'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Pattern Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Breathing Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {breathingPatterns.map((pattern, index) => {
            const Icon = pattern.icon;
            return (
              <motion.button
                key={pattern.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPattern(pattern)}
                className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                  selectedPattern?.id === pattern.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{pattern.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
                    
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                      <span>{pattern.inhale}s in</span>
                      {pattern.hold > 0 && <span>• {pattern.hold}s hold</span>}
                      <span>• {pattern.exhale}s out</span>
                      {pattern.rest > 0 && <span>• {pattern.rest}s rest</span>}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        pattern.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        pattern.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {pattern.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{pattern.cycles} cycles</span>
                    </div>

                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {pattern.benefits.slice(0, 2).map((benefit, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {benefit}
                          </span>
                        ))}
                        {pattern.benefits.length > 2 && (
                          <span className="text-xs text-gray-500">+{pattern.benefits.length - 2} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Sessions</h2>
            <TrendingUp className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-3">
            {sessions.slice(0, 5).map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{session.pattern}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(session.date).toLocaleDateString()} • {session.duration} min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{session.completedCycles} cycles</p>
                  <p className="text-xs text-gray-500">completed</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BreathingExercise;