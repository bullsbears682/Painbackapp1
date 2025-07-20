import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  Clock,
  Headphones,
  Music,
  Waves,
  Moon,
  Sun,
  TreePine,
  Mountain,
  Cloud
} from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: string;
  description: string;
  benefits: string[];
  waveform: number[];
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  tracks: Track[];
}

const MusicTherapy: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('relaxation');
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const playlists: Playlist[] = [
    {
      id: 'relaxation',
      name: 'Deep Relaxation',
      description: 'Slow, calming melodies to reduce tension and promote healing',
      icon: Waves,
      gradient: 'from-blue-400 to-blue-600',
      tracks: [
        {
          id: '1',
          title: 'Ocean Serenity',
          artist: 'Nature Sounds Collective',
          duration: '12:45',
          category: 'Ambient',
          description: 'Gentle ocean waves combined with soft piano melodies',
          benefits: ['Reduces anxiety', 'Lowers blood pressure', 'Promotes sleep'],
          waveform: [20, 40, 30, 60, 45, 70, 55, 40, 35, 50, 45, 30]
        },
        {
          id: '2',
          title: 'Forest Whispers',
          artist: 'Healing Harmonies',
          duration: '15:20',
          category: 'Nature',
          description: 'Forest sounds with gentle string instruments',
          benefits: ['Stress relief', 'Mental clarity', 'Emotional balance'],
          waveform: [30, 50, 45, 70, 60, 80, 65, 50, 40, 55, 50, 35]
        },
        {
          id: '3',
          title: 'Mindful Breathing',
          artist: 'Zen Masters',
          duration: '8:30',
          category: 'Meditation',
          description: 'Guided breathing with ambient soundscapes',
          benefits: ['Pain management', 'Deep relaxation', 'Mindfulness'],
          waveform: [15, 35, 25, 50, 40, 60, 45, 30, 25, 40, 35, 20]
        }
      ]
    },
    {
      id: 'nature',
      name: 'Nature Sounds',
      description: 'Pure nature recordings for natural healing',
      icon: TreePine,
      gradient: 'from-green-400 to-green-600',
      tracks: [
        {
          id: '4',
          title: 'Rainforest Symphony',
          artist: 'Earth Recordings',
          duration: '20:15',
          category: 'Nature',
          description: 'Tropical rainforest with distant thunder',
          benefits: ['Deep focus', 'Stress reduction', 'Natural healing'],
          waveform: [40, 60, 50, 80, 70, 90, 75, 60, 50, 65, 60, 45]
        },
        {
          id: '5',
          title: 'Mountain Breeze',
          artist: 'Alpine Sounds',
          duration: '18:45',
          category: 'Mountain',
          description: 'High altitude winds with bird songs',
          benefits: ['Mental clarity', 'Emotional release', 'Grounding'],
          waveform: [25, 45, 35, 65, 55, 75, 60, 45, 35, 50, 45, 30]
        }
      ]
    },
    {
      id: 'binaural',
      name: 'Binaural Beats',
      description: 'Frequency-based therapy for pain relief',
      icon: Headphones,
      gradient: 'from-purple-400 to-purple-600',
      tracks: [
        {
          id: '6',
          title: 'Alpha Wave Therapy',
          artist: 'Frequency Healers',
          duration: '30:00',
          category: 'Binaural',
          description: '10Hz alpha waves for relaxation',
          benefits: ['Pain relief', 'Relaxation', 'Improved focus'],
          waveform: [10, 20, 15, 30, 25, 40, 30, 20, 15, 25, 20, 10]
        },
        {
          id: '7',
          title: 'Theta Healing',
          artist: 'Brainwave Institute',
          duration: '25:30',
          category: 'Binaural',
          description: '6Hz theta waves for deep healing',
          benefits: ['Deep relaxation', 'Healing', 'Meditation'],
          waveform: [5, 15, 10, 25, 20, 35, 25, 15, 10, 20, 15, 5]
        }
      ]
    }
  ];

  const currentPlaylist = playlists.find(p => p.id === selectedPlaylist);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    // Simulate audio time updates
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if (newTime >= duration) {
            handleNext();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, duration]);

  const handlePlay = (track?: Track) => {
    if (track && track !== currentTrack) {
      setCurrentTrack(track);
      setCurrentTime(0);
      setDuration(convertDurationToSeconds(track.duration));
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentPlaylist || !currentTrack) return;
    
    const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
    let nextIndex = currentIndex + 1;
    
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * currentPlaylist.tracks.length);
    } else if (nextIndex >= currentPlaylist.tracks.length) {
      nextIndex = isRepeat ? 0 : currentIndex;
    }
    
    const nextTrack = currentPlaylist.tracks[nextIndex];
    setCurrentTrack(nextTrack);
    setCurrentTime(0);
    setDuration(convertDurationToSeconds(nextTrack.duration));
  };

  const handlePrevious = () => {
    if (!currentPlaylist || !currentTrack) return;
    
    const currentIndex = currentPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentPlaylist.tracks.length - 1;
    
    const prevTrack = currentPlaylist.tracks[prevIndex];
    setCurrentTrack(prevTrack);
    setCurrentTime(0);
    setDuration(convertDurationToSeconds(prevTrack.duration));
  };

  const convertDurationToSeconds = (duration: string): number => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const AudioVisualizer = ({ waveform }: { waveform: number[] }) => (
    <div className="flex items-end justify-center h-16 space-x-1">
      {waveform.map((height, index) => (
        <motion.div
          key={index}
          className="w-1 bg-gradient-to-t from-blue-500 to-green-500 rounded-full"
          style={{ height: `${height}%` }}
          animate={{
            height: isPlaying ? [`${height}%`, `${height * 1.5}%`, `${height}%`] : `${height}%`
          }}
          transition={{
            duration: 1,
            repeat: isPlaying ? Infinity : 0,
            delay: index * 0.1
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Music Therapy</h1>
        <p className="text-gray-600">Therapeutic soundscapes designed to reduce pain and promote healing</p>
      </motion.div>

      {/* Current Player */}
      {currentTrack && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{currentTrack.title}</h3>
                  <p className="text-gray-600">{currentTrack.artist}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                    {currentTrack.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{currentTrack.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentTrack.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <AudioVisualizer waveform={currentTrack.waveform} />
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{currentTrack.duration}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`p-2 rounded-full ${isShuffle ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'} transition-colors`}
                >
                  <Shuffle className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevious}
                  className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePlay()}
                  className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`p-2 rounded-full ${isRepeat ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'} transition-colors`}
                >
                  <Repeat className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </motion.button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{isMuted ? 0 : volume}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Playlist Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {playlists.map((playlist, index) => {
          const Icon = playlist.icon;
          return (
            <motion.button
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPlaylist(playlist.id)}
              className={`card text-left transition-all duration-200 ${
                selectedPlaylist === playlist.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-xl'
              }`}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${playlist.gradient} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{playlist.name}</h3>
                  <p className="text-sm text-gray-600">{playlist.tracks.length} tracks</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{playlist.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Track List */}
      {currentPlaylist && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${currentPlaylist.gradient} flex items-center justify-center`}>
              <currentPlaylist.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{currentPlaylist.name}</h2>
              <p className="text-gray-600">{currentPlaylist.description}</p>
            </div>
          </div>

          <div className="space-y-3">
            {currentPlaylist.tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  currentTrack?.id === track.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
                onClick={() => handlePlay(track)}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
                >
                  {currentTrack?.id === track.id && isPlaying ? (
                    <Pause className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Play className="w-4 h-4 text-blue-600" />
                  )}
                </motion.button>

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{track.title}</h4>
                  <p className="text-sm text-gray-600">{track.artist}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">{track.duration}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    {track.category}
                  </span>
                </div>

                <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hidden audio element for future implementation */}
      <audio ref={audioRef} />
    </div>
  );
};

export default MusicTherapy;