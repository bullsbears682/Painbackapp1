# 📱 Testing PainRelief Pro in Termux

## Quick Setup Steps

### 1. Install Required Packages in Termux
```bash
pkg install nodejs git python make clang
```

### 2. Transfer App Files
You have several options to get the app files to your device:

**Option A: Download Archive**
1. Download `pain-relief-app-termux.tar.gz` to your device
2. Copy it to Termux storage: `cp /sdcard/Download/pain-relief-app-termux.tar.gz ~/`
3. Extract: `tar -xzf pain-relief-app-termux.tar.gz`
4. Move to app directory: `mv pain-relief-app/* ~/pain-relief-app/`

**Option B: Create Directory and Copy Files**
```bash
mkdir -p ~/pain-relief-app
cd ~/pain-relief-app
# Copy individual files here
```

### 3. Run Installation Script
```bash
cd ~/pain-relief-app
./termux-install.sh
```

### 4. Manual Installation (if script fails)
```bash
cd ~/pain-relief-app
npm install --legacy-peer-deps
npm start
```

## 🌐 Accessing the App

Once running, the app will be available at:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

## 📋 App Features Available for Testing

✅ **Dashboard**: Pain analytics and mood tracking  
✅ **Music Therapy**: Built-in audio player with healing tracks  
✅ **Breathing Exercises**: Interactive guided breathing  
✅ **Meditation**: Step-by-step meditation sessions  
✅ **Exercises**: Therapeutic movement routines  
✅ **Sound Therapy**: Ambient and binaural sounds  
✅ **Pain Tracker**: Detailed pain logging and analytics  

## 🔧 Troubleshooting

- **Permission errors**: Run `pkg install nodejs` first
- **Build errors**: Use `npm install --legacy-peer-deps`
- **Port issues**: Try `npm start -- --port 8080`
- **Storage issues**: Clear Termux cache with `apt clean`

## 📱 Mobile Optimization

The app is fully responsive and optimized for mobile use:
- Touch-friendly interfaces
- Swipe gestures
- Offline functionality
- Local data storage

---
**Note**: This is a premium-quality pain management application with no external API dependencies, designed for complete offline use.