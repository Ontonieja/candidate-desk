
echo "🚀 Installing candidates-app dependencies..."


echo "📦 Installing backend dependencies..."
cd server
cp .env.example .env
yarn install

echo "📦 Installing frontend dependencies..."
cd ../client
yarn install

echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "1. Edit server/.env with your API key"
echo "2. Run './dev.sh' to start development servers"