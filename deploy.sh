#!/bin/bash

echo "🚀 Starting deployment process..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first!"
    exit 1
fi

echo "🔍 Checking for existing containers..."
# Stop and remove existing containers if they exist
docker-compose down 2>/dev/null || true

# echo "🧹 Cleaning up old images..."
# Remove old images (optional, uncomment if needed)
# docker system prune -f

echo "📦 Building new Docker images..."
docker-compose build

echo "🌟 Starting up new containers..."
docker-compose up -d

echo "⏳ Waiting for services to start..."
sleep 5

echo "🔍 Checking container status..."
docker-compose ps

echo "✅ Deployment completed successfully!"
echo "🌐 Application is now running!"
