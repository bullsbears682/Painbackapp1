#!/data/data/com.termux/files/usr/bin/bash

echo "🏥 PainRelief Pro - One-Click Setup"
echo "==================================="

# Install everything needed
pkg install -y nodejs git python make clang

# Create and enter app directory
mkdir -p ~/pain-relief-app
cd ~/pain-relief-app

# Create the entire app directly
echo "📦 Creating app files..."

# Package.json
cat > package.json << 'EOF'
{
  "name": "pain-relief-pro",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@types/node": "^16.18.68",
    "@types/react": "^18.2.42",
    "@types/react-dom": "^18.2.17",
    "chart.js": "^4.4.0",
    "framer-motion": "^10.16.16",
    "lucide-react": "^0.294.0",
    "react": "^18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "mobile": "BROWSER=none HOST=0.0.0.0 PORT=3000 react-scripts start"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6"
  }
}
EOF

# Tailwind config
cat > tailwind.config.js << 'EOF'
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        healing: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1'
        }
      }
    }
  },
  plugins: []
}
EOF

# PostCSS config
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# Install dependencies
echo "⚙️ Installing dependencies..."
npm install --legacy-peer-deps

# Create src directory and basic files
mkdir -p src public

# Create basic HTML
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>PainRelief Pro</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
EOF

# Create basic App
cat > src/App.tsx << 'EOF'
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-indigo-600 mb-4">
          🏥 PainRelief Pro
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Premium Pain Management Application
        </p>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">✅ Successfully Running in Termux!</h2>
          <p className="text-gray-600">
            Your pain management app is now ready for full testing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
EOF

# Create index.tsx
cat > src/index.tsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
EOF

# Create CSS
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

echo "🚀 Starting PainRelief Pro..."
echo "📱 App will be available at http://localhost:3000"
echo ""

# Start the app
npm run mobile