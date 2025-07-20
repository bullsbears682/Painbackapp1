#!/data/data/com.termux/files/usr/bin/bash

echo "🏥 PainRelief Pro - Quick Setup"
echo "==============================="

# Step 1: Install Node.js
echo "📦 Installing Node.js..."
pkg install -y nodejs

# Step 2: Create directory
echo "📁 Creating directory..."
mkdir -p ~/pain-relief-app
cd ~/pain-relief-app

# Step 3: Create package.json manually
echo "📄 Creating package.json..."
echo '{
  "name": "pain-relief-pro",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5"
  },
  "scripts": {
    "start": "react-scripts start"
  }
}' > package.json

# Step 4: Verify package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Failed to create package.json"
    exit 1
fi

echo "✅ package.json created successfully"
cat package.json

# Step 5: Install minimal dependencies
echo "⚙️ Installing dependencies..."
npm install

# Step 6: Create basic structure
echo "📁 Creating app structure..."
mkdir -p src public

# Create HTML
echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>PainRelief Pro</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>' > public/index.html

# Create basic React app
echo 'import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f9ff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", color: "#2563eb", marginBottom: "1rem" }}>
          🏥 PainRelief Pro
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "2rem" }}>
          Premium Pain Management Application
        </p>
        <div style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          padding: "2rem",
          maxWidth: "400px"
        }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            ✅ Running Successfully in Termux!
          </h2>
          <p style={{ color: "#666" }}>
            Your pain management app is ready for testing.
          </p>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);' > src/index.js

echo "🚀 Starting app..."
echo "📱 Open http://localhost:3000 in your browser"
echo ""

# Start the app
npm start