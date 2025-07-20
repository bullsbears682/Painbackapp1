import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  User,
  Brain,
  Heart,
  Lotus,
  Mountain,
  Sun,
  Moon,
  Star,
  TreePine,
  Waves,
  CheckCircle
} from 'lucide-react';

interface MeditationSession {
  id: string;
  title: string;
  instructor: string;
  duration: number;
  category: string;
  description: string;
  benefits: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: React.ComponentType<any>;
  audioUrl?: string;
  script: string[];
}

interface UserSession {
  id: string;
  sessionId: string;
  date: string;
  duration: number;
  completed: boolean;
}

const Meditation: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);

  const categories = [
    { id: 'all', name: 'All', icon: Brain },
    { id: 'pain-relief', name: 'Pain Relief', icon: Heart },
    { id: 'body-scan', name: 'Body Scan', icon: User },
    { id: 'mindfulness', name: 'Mindfulness', icon: Lotus },
    { id: 'sleep', name: 'Sleep', icon: Moon },
    { id: 'stress', name: 'Stress Relief', icon: Sun }
  ];

  const meditationSessions: MeditationSession[] = [
    {
      id: '1',
      title: 'Progressive Muscle Relaxation',
      instructor: 'Dr. Sarah Chen',
      duration: 15,
      category: 'pain-relief',
      description: 'Systematically tense and relax muscle groups to reduce physical tension and pain',
      benefits: ['Reduces muscle tension', 'Decreases pain sensitivity', 'Improves sleep quality'],
      difficulty: 'Beginner',
      icon: User,
      script: [
        'Find a comfortable position and close your eyes.',
        'Start by tensing your toes for 5 seconds, then release.',
        'Notice the contrast between tension and relaxation.',
        'Move to your calves, tense for 5 seconds, then release.',
        'Continue with your thighs, feeling the relief as you let go.',
        'Tense your glutes and lower back, then release completely.',
        'Move to your abdomen, hold the tension, then release.',
        'Tense your hands into fists, hold, then let go.',
        'Tense your arms and shoulders, then release.',
        'Finally, tense your face and scalp, then release.',
        'Notice how your entire body feels relaxed and peaceful.',
        'Rest in this state of complete relaxation for a few minutes.'
      ]
    },
    {
      id: '2',
      title: 'Body Scan for Pain Relief',
      instructor: 'Mark Williams',
      duration: 20,
      category: 'body-scan',
      description: 'A mindful journey through your body to identify and release areas of tension',
      benefits: ['Increases body awareness', 'Reduces chronic pain', 'Promotes healing'],
      difficulty: 'Intermediate',
      icon: Brain,
      script: [
        'Lie down comfortably and close your eyes.',
        'Begin by focusing on your breath, natural and easy.',
        'Bring your attention to the top of your head.',
        'Notice any sensations without trying to change them.',
        'Slowly move your attention down to your forehead.',
        'Notice your eyes, cheeks, and jaw.',
        'Move to your neck and shoulders.',
        'Scan your arms from shoulders to fingertips.',
        'Bring attention to your chest and breathing.',
        'Notice your abdomen rising and falling.',
        'Scan your back from top to bottom.',
        'Move to your hips and pelvis.',
        'Scan your legs from hips to toes.',
        'End by sensing your whole body as one complete system.'
      ]
    },
    {
      id: '3',
      title: 'Loving-Kindness for Healing',
      instructor: 'Tara Bennett',
      duration: 12,
      category: 'mindfulness',
      description: 'Cultivate compassion for yourself and others while promoting inner healing',
      benefits: ['Reduces emotional pain', 'Increases self-compassion', 'Boosts immune system'],
      difficulty: 'Beginner',
      icon: Heart,
      script: [
        'Sit comfortably and take three deep breaths.',
        'Place your hand on your heart and feel it beating.',
        'Repeat: "May I be happy, may I be healthy, may I be at peace."',
        'Feel the warmth of these wishes for yourself.',
        'Now think of someone you love.',
        'Send them the same wishes: "May you be happy, healthy, at peace."',
        'Expand to include a neutral person in your life.',
        'Send them loving wishes as well.',
        'Include someone you have difficulty with.',
        'Extend compassion even to them.',
        'Finally, include all beings everywhere.',
        'Rest in this feeling of universal love and connection.'
      ]
    },
    {
      id: '4',
      title: 'Mountain Meditation',
      instructor: 'Jon Kabat-Zinn',
      duration: 18,
      category: 'mindfulness',
      description: 'Embody the stability and strength of a mountain while facing pain',
      benefits: ['Builds resilience', 'Develops equanimity', 'Strengthens inner stability'],
      difficulty: 'Advanced',
      icon: Mountain,
      script: [
        'Sit with dignity and strength.',
        'Imagine yourself as a majestic mountain.',
        'Your base is broad and stable, deeply rooted.',
        'Your peak reaches toward the sky with grace.',
        'Weather may come and go around you.',
        'Storms, rain, snow, and sunshine.',
        'Through it all, you remain unmoved.',
        'Your essence is unchanging and strong.',
        'Pain may arise like passing weather.',
        'You acknowledge it without being disturbed.',
        'You are the mountain - stable, enduring, peaceful.',
        'Rest in this unshakeable presence.'
      ]
    },
    {
      id: '5',
      title: 'Sleep Preparation',
      instructor: 'Michael Sealey',
      duration: 25,
      category: 'sleep',
      description: 'A gentle meditation to prepare your body and mind for restorative sleep',
      benefits: ['Improves sleep quality', 'Reduces nighttime pain', 'Calms racing thoughts'],
      difficulty: 'Beginner',
      icon: Moon,
      script: [
        'Lie down in your bed and get comfortable.',
        'Let your body sink into the mattress.',
        'Take slow, deep breaths, releasing the day.',
        'Starting with your toes, let them become heavy.',
        'Feel the heaviness moving up through your legs.',
        'Your pelvis and abdomen become relaxed and heavy.',
        'Your chest softens with each exhale.',
        'Your arms become loose and heavy at your sides.',
        'Your shoulders drop and release all tension.',
        'Your neck and head sink into the pillow.',
        'Your face softens completely.',
        'You are safe, you are at peace.',
        'Let yourself drift into healing sleep.'
      ]
    },
    {
      id: '6',
      title: 'RAIN Technique for Pain',
      instructor: 'Tara Brach',
      duration: 10,
      category: 'pain-relief',
      description: 'Recognition, Allowing, Investigation, and Non-attachment approach to pain',
      benefits: ['Changes relationship with pain', 'Reduces suffering', 'Increases acceptance'],
      difficulty: 'Intermediate',
      icon: Star,
      script: [
        'Sit comfortably and bring to mind your pain.',
        'Recognition: Notice what you\'re experiencing right now.',
        'Name it: "This is pain," "This is discomfort."',
        'Allowing: Stop fighting the sensations.',
        'Breathe and make space for what\'s here.',
        'Investigation: Explore with kindness.',
        'Where do you feel it in your body?',
        'What emotions arise with the pain?',
        'Non-attachment: This pain is not who you are.',
        'You are the awareness experiencing the pain.',
        'Rest in this spacious awareness.',
        'You are bigger than any pain or difficulty.'
      ]
    }
  ];

  const filteredSessions = selectedCategory === 'all' 
    ? meditationSessions 
    : meditationSessions.filter(session => session.category === selectedCategory);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && selectedSession) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          
          // Auto-advance script steps
          const stepDuration = (selectedSession.duration * 60) / selectedSession.script.length;
          const newStep = Math.floor(newTime / stepDuration);
          
          if (newStep !== currentStep && newStep < selectedSession.script.length) {
            setCurrentStep(newStep);
          }
          
          if (newTime >= selectedSession.duration * 60) {
            handleComplete();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedSession, currentStep]);

  const handlePlay = (session?: MeditationSession) => {
    if (session && session !== selectedSession) {
      setSelectedSession(session);
      setCurrentTime(0);
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentStep(0);
  };

  const handleComplete = () => {
    setIsPlaying(false);
    
    if (selectedSession) {
      const newSession: UserSession = {
        id: Date.now().toString(),
        sessionId: selectedSession.id,
        date: new Date().toISOString(),
        duration: currentTime,
        completed: currentTime >= (selectedSession.duration * 60 * 0.8) // 80% completion
      };
      
      setUserSessions(prev => [newSession, ...prev.slice(0, 9)]);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = selectedSession 
    ? (currentTime / (selectedSession.duration * 60)) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meditation & Mindfulness</h1>
        <p className="text-gray-600">Guided practices to transform your relationship with pain</p>
      </motion.div>

      {/* Current Session Player */}
      {selectedSession && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <selectedSession.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedSession.title}</h3>
                  <p className="text-gray-600">by {selectedSession.instructor}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{selectedSession.duration} minutes</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      selectedSession.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      selectedSession.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedSession.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{selectedSession.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSession.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* Current Instruction */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-4">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">Current Instruction:</h4>
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-indigo-800 text-lg leading-relaxed"
                >
                  {selectedSession.script[currentStep] || "Begin when you're ready..."}
                </motion.p>
                <div className="mt-3 text-sm text-indigo-600">
                  Step {currentStep + 1} of {selectedSession.script.length}
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{selectedSession.duration}:00</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePlay()}
                  className="btn-primary flex items-center space-x-2 px-8"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isPlaying ? 'Pause' : 'Start'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Session Library */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Meditation Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSessions.map((session, index) => {
            const Icon = session.icon;
            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedSession?.id === session.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handlePlay(session)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{session.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {session.instructor}</p>
                    <p className="text-sm text-gray-700 mb-3">{session.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{session.duration} min</span>
                        <span className={`px-2 py-1 rounded-full ${
                          session.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          session.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {session.difficulty}
                        </span>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center"
                      >
                        {selectedSession?.id === session.id && isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Sessions */}
      {userSessions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Sessions</h2>
          <div className="space-y-3">
            {userSessions.slice(0, 5).map((session, index) => {
              const meditationSession = meditationSessions.find(s => s.id === session.sessionId);
              return (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {session.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{meditationSession?.title}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(session.date).toLocaleDateString()} • {Math.floor(session.duration / 60)} min
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {session.completed ? 'Completed' : 'Partial'}
                    </p>
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

export default Meditation;