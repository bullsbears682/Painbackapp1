import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  CheckCircle,
  AlertCircle,
  User,
  Activity,
  Zap,
  Heart,
  ArrowRight,
  ArrowLeft,
  Volume2,
  Repeat
} from 'lucide-react';

interface Exercise {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  repetitions?: number;
  sets?: number;
  instructions: string[];
  benefits: string[];
  precautions: string[];
  targetAreas: string[];
  videoUrl?: string;
}

interface Routine {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  exercises: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  benefits: string[];
}

interface ExerciseSession {
  id: string;
  routineId?: string;
  exerciseId?: string;
  date: string;
  duration: number;
  completed: boolean;
}

const Exercises: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [currentRoutine, setCurrentRoutine] = useState<Routine | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sessions, setSessions] = useState<ExerciseSession[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);

  const categories = [
    { id: 'all', name: 'All Exercises' },
    { id: 'neck', name: 'Neck & Shoulders' },
    { id: 'back', name: 'Back' },
    { id: 'legs', name: 'Legs & Hips' },
    { id: 'core', name: 'Core' },
    { id: 'full-body', name: 'Full Body' },
    { id: 'stretching', name: 'Stretching' }
  ];

  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Neck Roll',
      description: 'Gentle neck rotations to relieve tension and improve mobility',
      category: 'neck',
      difficulty: 'Beginner',
      duration: 60,
      repetitions: 8,
      sets: 2,
      instructions: [
        'Sit or stand with your spine straight',
        'Slowly drop your right ear toward your right shoulder',
        'Gently roll your head forward, chin to chest',
        'Continue rolling to the left side',
        'Complete the circle by rolling back to the starting position',
        'Reverse direction for the next set'
      ],
      benefits: ['Reduces neck tension', 'Improves flexibility', 'Relieves headaches'],
      precautions: ['Move slowly', 'Stop if you feel dizzy', 'Avoid if you have neck injuries'],
      targetAreas: ['Neck', 'Upper shoulders']
    },
    {
      id: '2',
      name: 'Cat-Cow Stretch',
      description: 'Spinal mobility exercise that helps with back pain and stiffness',
      category: 'back',
      difficulty: 'Beginner',
      duration: 90,
      repetitions: 10,
      sets: 2,
      instructions: [
        'Start on hands and knees in a tabletop position',
        'Arch your back, lifting your chest and tailbone (Cow pose)',
        'Hold for 2-3 seconds',
        'Round your spine toward the ceiling, tucking chin to chest (Cat pose)',
        'Hold for 2-3 seconds',
        'Flow smoothly between the two positions'
      ],
      benefits: ['Improves spinal flexibility', 'Reduces back pain', 'Strengthens core'],
      precautions: ['Move gently', 'Support wrists if needed', 'Avoid if pregnant without approval'],
      targetAreas: ['Spine', 'Core', 'Shoulders']
    },
    {
      id: '3',
      name: 'Hip Flexor Stretch',
      description: 'Deep stretch to relieve tight hip flexors and lower back tension',
      category: 'legs',
      difficulty: 'Intermediate',
      duration: 120,
      repetitions: 1,
      sets: 2,
      instructions: [
        'Start in a lunge position with right foot forward',
        'Lower your left knee to the ground',
        'Keep your right knee directly over your ankle',
        'Gently push your hips forward and down',
        'You should feel a stretch in the front of your left hip',
        'Hold the position and breathe deeply',
        'Switch sides and repeat'
      ],
      benefits: ['Relieves hip tightness', 'Reduces lower back pain', 'Improves posture'],
      precautions: ['Use a pillow under knee if needed', 'Don\'t force the stretch', 'Stop if sharp pain occurs'],
      targetAreas: ['Hip flexors', 'Quadriceps', 'Lower back']
    },
    {
      id: '4',
      name: 'Bird Dog',
      description: 'Core strengthening exercise that improves stability and reduces back pain',
      category: 'core',
      difficulty: 'Intermediate',
      duration: 30,
      repetitions: 8,
      sets: 3,
      instructions: [
        'Start in tabletop position on hands and knees',
        'Extend your right arm forward and left leg back',
        'Keep your hips level and spine neutral',
        'Hold for 5-10 seconds',
        'Return to starting position slowly',
        'Switch to left arm and right leg',
        'Focus on maintaining balance and control'
      ],
      benefits: ['Strengthens core', 'Improves balance', 'Reduces back pain'],
      precautions: ['Keep movements controlled', 'Don\'t arch your back', 'Start with shorter holds'],
      targetAreas: ['Core', 'Glutes', 'Shoulders', 'Back']
    },
    {
      id: '5',
      name: 'Gentle Spinal Twist',
      description: 'Seated twist to improve spinal mobility and reduce tension',
      category: 'back',
      difficulty: 'Beginner',
      duration: 60,
      repetitions: 1,
      sets: 2,
      instructions: [
        'Sit tall in a chair with feet flat on floor',
        'Place your right hand on the back of the chair',
        'Place your left hand on your right knee',
        'Gently rotate your torso to the right',
        'Keep your shoulders relaxed',
        'Hold and breathe deeply',
        'Return to center and repeat on the other side'
      ],
      benefits: ['Improves spinal mobility', 'Reduces tension', 'Aids digestion'],
      precautions: ['Move slowly', 'Don\'t force the twist', 'Stop if you feel pain'],
      targetAreas: ['Spine', 'Obliques', 'Lower back']
    },
    {
      id: '6',
      name: 'Wall Push-Up',
      description: 'Modified push-up to strengthen arms and chest without strain',
      category: 'full-body',
      difficulty: 'Beginner',
      duration: 45,
      repetitions: 12,
      sets: 2,
      instructions: [
        'Stand arm\'s length from a wall',
        'Place palms flat against the wall at shoulder height',
        'Keep your body in a straight line',
        'Slowly bend your elbows and lean toward the wall',
        'Push back to starting position',
        'Keep your core engaged throughout'
      ],
      benefits: ['Strengthens upper body', 'Improves posture', 'Low impact'],
      precautions: ['Start slowly', 'Keep wrists comfortable', 'Stop if shoulder pain occurs'],
      targetAreas: ['Arms', 'Chest', 'Shoulders', 'Core']
    }
  ];

  const routines: Routine[] = [
    {
      id: '1',
      name: 'Morning Mobility',
      description: 'Gentle routine to start your day with improved flexibility',
      category: 'stretching',
      duration: 15,
      exercises: ['1', '2', '5'],
      difficulty: 'Beginner',
      benefits: ['Increases mobility', 'Reduces morning stiffness', 'Energizes body']
    },
    {
      id: '2',
      name: 'Lower Back Relief',
      description: 'Targeted exercises for lower back pain and tension',
      category: 'back',
      duration: 20,
      exercises: ['2', '3', '4'],
      difficulty: 'Intermediate',
      benefits: ['Reduces back pain', 'Strengthens core', 'Improves posture']
    },
    {
      id: '3',
      name: 'Office Break Routine',
      description: 'Quick exercises you can do at work to combat sitting pain',
      category: 'neck',
      duration: 10,
      exercises: ['1', '5'],
      difficulty: 'Beginner',
      benefits: ['Relieves neck tension', 'Improves circulation', 'Reduces stress']
    }
  ];

  const filteredExercises = selectedCategory === 'all' 
    ? exercises 
    : exercises.filter(exercise => exercise.category === selectedCategory);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && currentExercise) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          
          // Auto-advance instruction steps
          const stepDuration = currentExercise.duration / currentExercise.instructions.length;
          const newStep = Math.floor(newTime / stepDuration);
          
          if (newStep !== currentStep && newStep < currentExercise.instructions.length) {
            setCurrentStep(newStep);
          }
          
          if (newTime >= currentExercise.duration) {
            if (currentExercise.sets && currentSet < currentExercise.sets) {
              setCurrentSet(prev => prev + 1);
              setCurrentTime(0);
              setCurrentStep(0);
              return 0;
            } else {
              handleComplete();
              return 0;
            }
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, currentExercise, currentStep, currentSet]);

  const handleStart = (exercise?: Exercise) => {
    if (exercise && exercise !== currentExercise) {
      setCurrentExercise(exercise);
      setCurrentTime(0);
      setCurrentStep(0);
      setCurrentSet(1);
    }
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentTime(0);
    setCurrentStep(0);
    setCurrentSet(1);
  };

  const handleComplete = () => {
    setIsActive(false);
    
    if (currentExercise) {
      const newSession: ExerciseSession = {
        id: Date.now().toString(),
        exerciseId: currentExercise.id,
        date: new Date().toISOString(),
        duration: currentTime,
        completed: true
      };
      
      setSessions(prev => [newSession, ...prev.slice(0, 9)]);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = currentExercise 
    ? (currentTime / currentExercise.duration) * 100 
    : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Therapeutic Exercises</h1>
        <p className="text-gray-600">Evidence-based exercises designed to reduce pain and improve mobility</p>
      </motion.div>

      {/* Current Exercise Player */}
      {currentExercise && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{currentExercise.name}</h3>
                  <p className="text-gray-600">{currentExercise.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Timer className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{currentExercise.duration}s</span>
                    {currentExercise.sets && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">Set {currentSet} of {currentExercise.sets}</span>
                      </>
                    )}
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(currentExercise.difficulty)}`}>
                      {currentExercise.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Target Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentExercise.targetAreas.map((area, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentExercise.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {currentExercise.precautions.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 text-orange-500 mr-1" />
                    Precautions:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {currentExercise.precautions.map((precaution, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        {precaution}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              {/* Current Instruction */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 mb-4">
                <h4 className="text-sm font-semibold text-green-900 mb-2">Current Step:</h4>
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-800 text-lg leading-relaxed mb-2"
                >
                  {currentExercise.instructions[currentStep] || "Get ready to begin..."}
                </motion.p>
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Step {currentStep + 1} of {currentExercise.instructions.length}</span>
                  {currentExercise.repetitions && (
                    <span>{currentExercise.repetitions} repetitions</span>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentExercise.duration)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
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
                  onClick={isActive ? handlePause : () => handleStart()}
                  className="btn-primary flex items-center space-x-2 px-8"
                >
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isActive ? 'Pause' : 'Start'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

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
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-sm font-medium">{category.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Exercise Library */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Exercise Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                currentExercise?.id === exercise.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleStart(exercise)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center space-x-2">
                  <Timer className="w-3 h-3" />
                  <span>{exercise.duration}s</span>
                </div>
                {exercise.sets && (
                  <span>{exercise.sets} sets</span>
                )}
                {exercise.repetitions && (
                  <span>{exercise.repetitions} reps</span>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {exercise.targetAreas.slice(0, 2).map((area, i) => (
                  <span key={i} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {area}
                  </span>
                ))}
                {exercise.targetAreas.length > 2 && (
                  <span className="text-xs text-gray-500">+{exercise.targetAreas.length - 2} more</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full btn-primary text-sm py-2"
              >
                {currentExercise?.id === exercise.id && isActive ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Start Exercise
                  </>
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Sessions</h2>
          <div className="space-y-3">
            {sessions.slice(0, 5).map((session, index) => {
              const exercise = exercises.find(e => e.id === session.exerciseId);
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
                      <p className="font-medium text-gray-900">{exercise?.name}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(session.date).toLocaleDateString()} • {formatTime(session.duration)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">Completed</p>
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

export default Exercises;