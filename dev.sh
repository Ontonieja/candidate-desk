echo "🚀 Starting development servers..."

cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM EXIT

echo "🔧 Starting backend..."
cd server
yarn dev &

echo "🎨 Starting frontend..."
cd ../client
yarn dev &

echo ""
echo "✅ Development servers are running!"
echo "📱 Frontend: http://localhost:5173"
echo "⚙️  Backend: http://localhost:3000"
echo ""

wait