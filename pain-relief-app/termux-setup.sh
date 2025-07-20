#!/bin/bash

# PainRelief Pro - Termux Setup Script
# This script automates the setup process for running the app on Termux

echo "🏥 Setting up PainRelief Pro on Termux..."
echo "================================================"

# Check if we're running on Termux
if [ ! -d "$PREFIX" ]; then
    echo "❌ This script is designed for Termux environment only!"
    exit 1
fi

echo "📦 Step 1: Updating Termux packages..."
pkg update -y && pkg upgrade -y

echo "📦 Step 2: Installing Node.js and essential packages..."
pkg install -y nodejs npm git python make clang

echo "📦 Step 3: Installing additional build tools..."
pkg install -y libc++ pkg-config

echo "🔍 Step 4: Checking installed versions..."
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Python version: $(python --version)"

echo "📱 Step 5: Setting up the app..."

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found! Make sure you're in the app directory."
    exit 1
fi

echo "📦 Step 6: Installing app dependencies..."
echo "⏳ This may take several minutes on mobile devices..."

# Set npm configuration for better compatibility
npm config set target_arch arm64
npm config set target_platform android
npm config set arch arm64

# Install dependencies with legacy peer deps flag for better compatibility
npm install --legacy-peer-deps

echo "🎨 Step 7: Setting up environment variables..."
# Create environment file for mobile optimization
cat > .env.local << EOL
# Mobile-optimized settings
GENERATE_SOURCEMAP=false
FAST_REFRESH=true
BROWSER=none

# Performance optimizations
REACT_APP_MOBILE_OPTIMIZED=true
EOL

echo "🔧 Step 8: Creating mobile-friendly scripts..."
# Create a mobile-optimized start script
cat > mobile-start.js << 'EOL'
const { spawn } = require('child_process');
const os = require('os');

console.log('🏥 Starting PainRelief Pro...');
console.log('📱 Mobile-optimized version');
console.log('🌐 The app will be available at:');
console.log('   - http://localhost:3000');
console.log('   - http://127.0.0.1:3000');

// Get local IP for network access
const networkInterfaces = os.networkInterfaces();
for (const interface in networkInterfaces) {
  const addresses = networkInterfaces[interface];
  for (const address of addresses) {
    if (address.family === 'IPv4' && !address.internal) {
      console.log(`   - http://${address.address}:3000 (network access)`);
    }
  }
}

console.log('\n🎯 Open any of these URLs in your browser');
console.log('📲 For best experience, add to home screen as PWA');
console.log('🛑 Press Ctrl+C to stop the server\n');

// Start the React app
const reactApp = spawn('npm', ['start'], {
  stdio: 'inherit',
  env: { ...process.env, BROWSER: 'none' }
});

reactApp.on('close', (code) => {
  console.log(`\n🏥 PainRelief Pro stopped with code ${code}`);
});
EOL

echo "📱 Step 9: Creating Termux widget script..."
# Create a quick launch script for Termux widget
mkdir -p ~/.shortcuts
cat > ~/.shortcuts/painrelief << 'EOL'
#!/bin/bash
cd ~/pain-relief-app
node mobile-start.js
EOL

chmod +x ~/.shortcuts/painrelief

echo "✅ Setup completed successfully!"
echo ""
echo "🚀 Quick Start Commands:"
echo "================================"
echo "1. Start the app:"
echo "   npm start"
echo "   OR"
echo "   node mobile-start.js"
echo ""
echo "2. Access the app:"
echo "   Open http://localhost:3000 in your browser"
echo ""
echo "3. For network access (other devices):"
echo "   Use the IP address shown when starting"
echo ""
echo "📱 Pro Tips for Termux:"
echo "================================"
echo "• Install Termux:Widget to add home screen shortcut"
echo "• Use 'termux-wake-lock' to prevent sleeping during use"
echo "• Install a good mobile browser for best experience"
echo "• Add the app to home screen as PWA for app-like experience"
echo ""
echo "🔧 Troubleshooting:"
echo "================================"
echo "• If npm install fails, try: npm install --legacy-peer-deps"
echo "• If port 3000 is busy, try: PORT=3001 npm start"
echo "• For memory issues, try: NODE_OPTIONS='--max-old-space-size=2048' npm start"
echo ""
echo "🏥 PainRelief Pro is ready to help manage your pain!"
echo "Enjoy your premium wellness app! 💙"