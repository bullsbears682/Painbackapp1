# 🏥 PainRelief Pro - Termux Setup Guide

> **Premium Pain Management App for Android via Termux**

## 📱 What is PainRelief Pro?

PainRelief Pro is a comprehensive, $1M+ quality pain management application designed to help you:

- 📊 **Track Pain** with intelligent analytics
- 🎵 **Music Therapy** with curated healing playlists
- 🧘 **Guided Meditations** for pain relief
- 💪 **Therapeutic Exercises** with step-by-step guidance
- 🫁 **Breathing Techniques** with interactive visualizations
- 🔊 **Sound Therapy** with binaural beats and nature sounds
- 📈 **Progress Analytics** with insights and recommendations

## 🚀 Quick Setup for Termux

### Prerequisites

1. **Install Termux** from F-Droid (recommended) or Google Play
2. **Grant Storage Permission**: In Termux, run `termux-setup-storage`
3. **Ensure Stable Internet** for initial setup

### Automated Setup (Recommended)

```bash
# 1. Copy the pain-relief-app folder to Termux
# 2. Navigate to the app directory
cd pain-relief-app

# 3. Run the automated setup script
chmod +x termux-setup.sh
./termux-setup.sh
```

### Manual Setup

If you prefer step-by-step setup:

```bash
# Update Termux
pkg update && pkg upgrade

# Install Node.js and dependencies
pkg install nodejs npm git python make clang

# Install the app dependencies
npm install --legacy-peer-deps

# Start the app
npm start
```

## 🎯 Running the App

### Standard Start
```bash
npm start
```

### Mobile-Optimized Start
```bash
npm run mobile
# OR
node mobile-start.js
```

### Available URLs
- **Local Access**: http://localhost:3000
- **Network Access**: http://YOUR_IP:3000 (shown when starting)

## 📲 Termux Pro Tips

### 1. **Termux Widget Setup**
Install **Termux:Widget** from F-Droid to add home screen shortcuts:

```bash
# The setup script automatically creates ~/.shortcuts/painrelief
# Just add the Termux widget to your home screen
```

### 2. **Prevent Sleep During Use**
```bash
# Install wake lock to prevent device sleeping
pkg install termux-api
termux-wake-lock
```

### 3. **Background Execution**
```bash
# Start in background and detach
nohup npm start > app.log 2>&1 &

# Or use screen/tmux
pkg install tmux
tmux new-session -d -s painrelief 'npm start'
```

### 4. **Performance Optimization**
```bash
# For devices with limited RAM
NODE_OPTIONS='--max-old-space-size=1024' npm start

# For better performance
export NODE_ENV=production
npm run build
npx serve -s build -p 3000
```

## 🌐 Browser Recommendations

### Best Browsers for the App:
1. **Chrome/Chromium** - Full PWA support
2. **Firefox** - Good performance
3. **Samsung Internet** - Excellent mobile experience
4. **Brave** - Privacy-focused with good performance

### PWA Installation:
1. Open the app in your browser
2. Look for "Add to Home Screen" option
3. Install as PWA for app-like experience

## 🔧 Troubleshooting

### Common Issues and Solutions:

#### **1. NPM Install Fails**
```bash
# Try with legacy peer deps
npm install --legacy-peer-deps

# Clear cache if needed
npm cache clean --force
```

#### **2. Port Already in Use**
```bash
# Use different port
PORT=3001 npm start
```

#### **3. Memory Issues**
```bash
# Increase memory limit
NODE_OPTIONS='--max-old-space-size=2048' npm start
```

#### **4. Build Errors**
```bash
# Install missing dependencies
pkg install libc++ pkg-config

# Reinstall node modules
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

#### **5. Network Access Issues**
```bash
# Check your IP address
ifconfig

# Ensure firewall allows port 3000
# Some networks may block custom ports
```

### **6. Performance Issues**
```bash
# Disable source maps for better performance
echo "GENERATE_SOURCEMAP=false" > .env.local

# Use production build
npm run build
npx serve -s build
```

## 📱 Mobile Optimization Features

The app includes several mobile-specific optimizations:

- **Touch-Friendly Interface**: Large touch targets
- **Responsive Design**: Adapts to all screen sizes
- **PWA Support**: Add to home screen functionality
- **Offline Capability**: Core features work without internet
- **Battery Optimization**: Efficient resource usage
- **Gesture Support**: Swipe and touch interactions

## 🎵 Audio Features on Mobile

### Music & Sound Therapy:
- **Simulated Audio**: Visual feedback for therapeutic sounds
- **Volume Controls**: Full mixing capabilities
- **Background Play**: Continues when screen is off
- **Bluetooth Support**: Works with wireless headphones

## 📊 Data Storage

All your data is stored locally on your device:
- **Pain tracking entries**
- **Session history**
- **User preferences**
- **Achievement progress**

No data is sent to external servers - complete privacy!

## 🔄 Updates and Maintenance

### Keeping the App Updated:
```bash
# Update Termux packages
pkg update && pkg upgrade

# Update Node.js dependencies
npm update

# Rebuild if needed
npm run build
```

### Backup Your Data:
```bash
# The app stores data in localStorage
# For backup, copy the entire app folder
cp -r pain-relief-app pain-relief-app-backup
```

## 💡 Advanced Usage

### Custom Themes:
Edit `src/index.css` to customize colors and appearance.

### Adding Custom Sounds:
Add audio files to `public/sounds/` and update the sound library.

### Custom Exercises:
Modify `src/components/Exercises.tsx` to add your own routines.

## 🆘 Getting Help

### Resources:
1. **Check the app logs**: `cat app.log`
2. **Termux Documentation**: https://termux.dev/en/
3. **React Documentation**: https://reactjs.org/
4. **GitHub Issues**: Create issues for bugs/features

### Community:
- **Termux Community**: r/termux on Reddit
- **React Community**: Reactiflux Discord
- **Pain Management**: Various health communities

## 🎉 Features Showcase

### 🏠 **Dashboard**
- Real-time pain analytics
- Progress tracking
- Achievement system
- Personalized recommendations

### 🎵 **Music Therapy**
- Professional audio player interface
- Curated therapeutic playlists
- Real-time visualizations
- Custom mixing capabilities

### 🧘 **Meditation & Mindfulness**
- Guided meditation sessions
- Progressive muscle relaxation
- Body scan techniques
- RAIN technique for pain

### 💪 **Therapeutic Exercises**
- Evidence-based exercises
- Step-by-step instructions
- Progress tracking
- Safety guidelines

### 🫁 **Breathing Exercises**
- Interactive breathing patterns
- Beautiful animated guidance
- Multiple techniques
- Session analytics

### 🔊 **Sound Therapy**
- Nature sounds and white noise
- Binaural beats for healing
- Multi-sound mixing
- Therapeutic presets

### 📈 **Pain Tracker**
- Comprehensive pain logging
- Trend analysis
- Trigger identification
- Visual analytics

## 🏆 Why PainRelief Pro?

- **🎯 Evidence-Based**: All techniques backed by research
- **📱 Mobile-First**: Designed for smartphone use
- **🔒 Privacy-Focused**: All data stays on your device
- **💰 Completely Free**: No subscriptions or ads
- **🌍 Offline Capable**: Works without internet
- **♿ Accessible**: Designed for users with pain conditions
- **🎨 Beautiful UI**: Modern, calming interface

---

## 🏥 Start Your Healing Journey Today!

PainRelief Pro brings professional-grade pain management tools directly to your Android device through Termux. Take control of your pain and start your journey toward better health and wellness.

**Happy Healing! 💙**

---

*For technical support or feature requests, feel free to create an issue or contribute to the project.*