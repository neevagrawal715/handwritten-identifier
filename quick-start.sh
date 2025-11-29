#!/bin/bash

# Quick Start Script for Handwritten Number Identifier
# This script sets up and runs the application locally

echo "🚀 Handwritten Number Identifier - Quick Start"
echo "================================================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Install from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo ""

# Check for .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found"
    echo "Creating .env.local template..."
    cat > .env.local << 'EOF'
# Get your free API key from: https://ai.google.dev/
VITE_GEMINI_API_KEY=your_gemini_api_key_here
EOF
    echo "📝 Created .env.local - Please add your Gemini API key"
    echo "   Get it from: https://ai.google.dev/"
    echo ""
    read -p "Enter your Gemini API key (or press Enter to skip): " api_key
    if [ ! -z "$api_key" ]; then
        sed -i '' "s/your_gemini_api_key_here/$api_key/" .env.local
        echo "✅ API key added to .env.local"
    fi
else
    echo "✅ .env.local found"
fi

echo ""
echo "🏗️  Building project..."
npm run build
echo ""

echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npx vite"
echo ""
echo "Then open: http://localhost:5173/"
echo ""
