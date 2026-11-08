#!/bin/bash

# Install Backend dependencies
echo "📦 Installing Backend dependencies..."
cd Backend && npm install

# Install Frontend dependencies  
echo "📦 Installing Frontend dependencies..."
cd ../Frontend && npm install

# Build Frontend
echo "🔨 Building Frontend..."
npm run build

echo "✅ Build completed successfully!"
