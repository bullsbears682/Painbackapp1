#!/data/data/com.termux/files/usr/bin/bash

echo "🏥 PainRelief Pro - Termux Setup"
echo "================================"

# Step 1: Install required packages
echo "📦 Installing Node.js and dependencies..."
pkg install -y nodejs git python make clang

# Step 2: Verify installation
echo "✅ Verifying installation..."
node --version
npm --version

# Step 3: Create app directory
echo "📁 Creating app directory..."
mkdir -p ~/pain-relief-app
cd ~/pain-relief-app

# Step 4: Check if app files exist
if [ ! -f "package.json" ]; then
    echo "❌ App files not found in ~/pain-relief-app"
    echo ""
    echo "📋 To transfer the app files to Termux, you can:"
    echo "1. Download the pain-relief-app-termux.tar.gz file to your device"
    echo "2. Extract it in ~/pain-relief-app directory"
    echo "3. Run this script again"
    echo ""
    echo "💡 Alternative: Use 'pkg install python' and run a simple HTTP server"
    echo "   from your computer to download files directly in Termux"
    exit 1
fi

# Step 5: Install dependencies
echo "⚙️ Installing app dependencies..."
npm install --legacy-peer-deps

# Step 6: Start the app
echo "🚀 Starting PainRelief Pro..."
echo "📱 The app will be available at:"
echo "   - http://localhost:3000"
echo "   - http://$(hostname -I | awk '{print $1}'):3000"
echo ""

npm start