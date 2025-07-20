import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Clock,
  Thermometer,
  Activity,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Target,
  Edit,
  Trash2
} from 'lucide-react';

interface PainEntry {
  id: string;
  date: string;
  time: string;
  level: number;
  location: string;
  type: string;
  triggers?: string[];
  medications?: string[];
  activities?: string[];
  weather?: string;
  mood: number;
  notes?: string;
}

interface PainStats {
  averageLevel: number;
  trend: 'up' | 'down' | 'stable';
  commonLocation: string;
  commonType: string;
  bestTime: string;
  worstTime: string;
}

const PainTracker: React.FC = () => {
  const [entries, setEntries] = useState<PainEntry[]>([]);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<PainEntry | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [stats, setStats] = useState<PainStats | null>(null);

  const [formData, setFormData] = useState({
    level: 5,
    location: '',
    type: '',
    triggers: [] as string[],
    medications: [] as string[],
    activities: [] as string[],
    weather: '',
    mood: 5,
    notes: ''
  });

  const painLocations = [
    'Head/Neck', 'Shoulders', 'Upper Back', 'Lower Back', 'Arms/Hands',
    'Chest', 'Abdomen', 'Hips', 'Legs/Feet', 'Joints', 'Full Body'
  ];

  const painTypes = [
    'Sharp/Stabbing', 'Dull/Aching', 'Burning', 'Throbbing', 'Cramping',
    'Tingling', 'Numbness', 'Stiffness', 'Pressure', 'Electric'
  ];

  const commonTriggers = [
    'Stress', 'Weather Change', 'Poor Sleep', 'Physical Activity',
    'Sitting Too Long', 'Poor Posture', 'Eating', 'Hormonal Changes',
    'Dehydration', 'Loud Noises', 'Bright Lights'
  ];

  const commonMedications = [
    'Ibuprofen', 'Acetaminophen', 'Aspirin', 'Naproxen',
    'Prescription Pain Med', 'Muscle Relaxer', 'Topical Cream',
    'Ice Pack', 'Heat Pad', 'Natural Remedy'
  ];

  const commonActivities = [
    'Rest', 'Light Walking', 'Stretching', 'Meditation', 'Deep Breathing',
    'Hot Bath', 'Massage', 'Yoga', 'Physical Therapy', 'Work'
  ];

  useEffect(() => {
    // Generate some sample data
    const sampleEntries: PainEntry[] = [
      {
        id: '1',
        date: '2024-01-21',
        time: '14:30',
        level: 6,
        location: 'Lower Back',
        type: 'Dull/Aching',
        triggers: ['Sitting Too Long'],
        medications: ['Ibuprofen'],
        activities: ['Stretching'],
        weather: 'Rainy',
        mood: 4,
        notes: 'Pain started after long work session'
      },
      {
        id: '2',
        date: '2024-01-20',
        time: '09:15',
        level: 3,
        location: 'Head/Neck',
        type: 'Throbbing',
        triggers: ['Stress', 'Poor Sleep'],
        medications: ['Acetaminophen'],
        activities: ['Meditation'],
        weather: 'Sunny',
        mood: 6,
        notes: 'Better after meditation session'
      },
      {
        id: '3',
        date: '2024-01-19',
        time: '16:45',
        level: 8,
        location: 'Shoulders',
        type: 'Sharp/Stabbing',
        triggers: ['Poor Posture'],
        medications: ['Ice Pack'],
        activities: ['Rest'],
        weather: 'Cloudy',
        mood: 3,
        notes: 'Severe shoulder pain from desk work'
      }
    ];

    setEntries(sampleEntries);
    calculateStats(sampleEntries);
  }, []);

  const calculateStats = (entriesData: PainEntry[]) => {
    if (entriesData.length === 0) return;

    const levels = entriesData.map(e => e.level);
    const averageLevel = levels.reduce((sum, level) => sum + level, 0) / levels.length;

    // Calculate trend (simplified)
    const recentEntries = entriesData.slice(0, 3);
    const olderEntries = entriesData.slice(3, 6);
    const recentAvg = recentEntries.length > 0 
      ? recentEntries.reduce((sum, e) => sum + e.level, 0) / recentEntries.length 
      : 0;
    const olderAvg = olderEntries.length > 0 
      ? olderEntries.reduce((sum, e) => sum + e.level, 0) / olderEntries.length 
      : recentAvg;

    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (recentAvg > olderAvg + 0.5) trend = 'up';
    else if (recentAvg < olderAvg - 0.5) trend = 'down';

    // Find most common location and type
    const locationCounts = entriesData.reduce((acc, entry) => {
      acc[entry.location] = (acc[entry.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const typeCounts = entriesData.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const commonLocation = Object.keys(locationCounts).reduce((a, b) => 
      locationCounts[a] > locationCounts[b] ? a : b
    );

    const commonType = Object.keys(typeCounts).reduce((a, b) => 
      typeCounts[a] > typeCounts[b] ? a : b
    );

    // Find best and worst times (simplified)
    const timeAnalysis = entriesData.reduce((acc, entry) => {
      const hour = parseInt(entry.time.split(':')[0]);
      const timeOfDay = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
      
      if (!acc[timeOfDay]) acc[timeOfDay] = { total: 0, count: 0 };
      acc[timeOfDay].total += entry.level;
      acc[timeOfDay].count += 1;
      
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const timeAverages = Object.keys(timeAnalysis).map(time => ({
      time,
      average: timeAnalysis[time].total / timeAnalysis[time].count
    }));

    const bestTime = timeAverages.reduce((a, b) => a.average < b.average ? a : b).time;
    const worstTime = timeAverages.reduce((a, b) => a.average > b.average ? a : b).time;

    setStats({
      averageLevel: Math.round(averageLevel * 10) / 10,
      trend,
      commonLocation,
      commonType,
      bestTime,
      worstTime
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: PainEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].slice(0, 5),
      level: formData.level,
      location: formData.location,
      type: formData.type,
      triggers: formData.triggers,
      medications: formData.medications,
      activities: formData.activities,
      weather: formData.weather,
      mood: formData.mood,
      notes: formData.notes
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    calculateStats(updatedEntries);
    setShowAddEntry(false);
    
    // Reset form
    setFormData({
      level: 5,
      location: '',
      type: '',
      triggers: [],
      medications: [],
      activities: [],
      weather: '',
      mood: 5,
      notes: ''
    });
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    calculateStats(updatedEntries);
  };

  const getPainLevelColor = (level: number) => {
    if (level <= 3) return 'text-green-600 bg-green-100';
    if (level <= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getMoodColor = (mood: number) => {
    if (mood <= 3) return 'text-red-600';
    if (mood <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  const toggleArrayItem = (array: string[], item: string, setter: (items: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pain Tracker</h1>
          <p className="text-gray-600">Monitor and analyze your pain patterns for better management</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddEntry(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Log Pain</span>
        </motion.button>
      </motion.div>

      {/* Stats Overview */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Pain Level</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageLevel}/10</p>
                <div className="flex items-center mt-1">
                  {stats.trend === 'down' ? (
                    <>
                      <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Improving</span>
                    </>
                  ) : stats.trend === 'up' ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-sm text-red-600">Worsening</span>
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
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Most Affected Area</p>
                <p className="text-lg font-semibold text-gray-900">{stats.commonLocation}</p>
                <p className="text-sm text-gray-500 mt-1">{stats.commonType}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Best Time</p>
                <p className="text-lg font-semibold text-green-600">{stats.bestTime}</p>
                <p className="text-sm text-gray-500 mt-1">Lowest pain levels</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Worst Time</p>
                <p className="text-lg font-semibold text-red-600">{stats.worstTime}</p>
                <p className="text-sm text-gray-500 mt-1">Highest pain levels</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Entries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recent Entries</h2>
          <div className="flex items-center space-x-2">
            {(['week', 'month', 'year'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {entries.slice(0, 10).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getPainLevelColor(entry.level)}`}>
                  {entry.level}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{entry.location}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-600">{entry.type}</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(entry.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{entry.time}</span>
                  </div>
                  {entry.mood && (
                    <div className="flex items-center space-x-1">
                      <span className={`text-sm font-medium ${getMoodColor(entry.mood)}`}>
                        Mood: {entry.mood}/10
                      </span>
                    </div>
                  )}
                </div>

                {entry.triggers && entry.triggers.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {entry.triggers.map((trigger, i) => (
                      <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        {trigger}
                      </span>
                    ))}
                  </div>
                )}

                {entry.notes && (
                  <p className="mt-2 text-sm text-gray-700 italic">"{entry.notes}"</p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedEntry(entry)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => deleteEntry(entry.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Add Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Pain Entry</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Pain Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pain Level: {formData.level}/10
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>No Pain</span>
                    <span>Severe</span>
                  </div>
                </div>

                {/* Location and Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select location</option>
                      {painLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select type</option>
                      {painTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Triggers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Potential Triggers</label>
                  <div className="flex flex-wrap gap-2">
                    {commonTriggers.map(trigger => (
                      <button
                        key={trigger}
                        type="button"
                        onClick={() => toggleArrayItem(formData.triggers, trigger, (items) => setFormData({ ...formData, triggers: items }))}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          formData.triggers.includes(trigger)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {trigger}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mood: {formData.mood}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.mood}
                    onChange={(e) => setFormData({ ...formData, mood: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Very Bad</span>
                    <span>Excellent</span>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Any additional details..."
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddEntry(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PainTracker;