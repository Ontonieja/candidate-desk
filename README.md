# Teamtailor Candidates App

Full-stack application for displaying and exporting candidate data from Teamtailor API. Built with Node.js/Express and React, contenerized with Docker.

## 🚀 Quick Start

Choose your preferred setup method:

### Option 1: Docker (Recommended)

#### 1. Clone the repository
```bash
git clone https://github.com/Ontonieja/candidates-desk.git
cd candidates-desk
```

#### 2. Set up environment variables
```bash
# Make the script executable (macOS/Linux)
chmod +x start.sh

# Run the setup script. It will create .env file based on env.example. 
./start.sh
```

#### 3. Configure your environment
Edit `server/.env` with your credentials:

```env
# Port for the server application
PORT=3000

# Your Teamtailor API key
TEAMTAILOR_API_KEY=your_actual_api_key_here

# Teamtailor API version
TEAMTAILOR_API_VERSION=20240404

# Frontend URL
CLIENT_URL="http://localhost:5173"
```

#### 4. Run with Docker
```bash
# After env configuration start the script once again. 
./start.sh
```

### Option 2: Local Development (No Docker)

#### 1. Prerequisites
- Node.js 18+ and npm

#### 2. Clone and setup
```bash
git clone https://github.com/Ontonieja/candidates-desk.git
cd candidates-desk

# Make the script executable (macOS/Linux)
chmod +x install.sh

# Run the setup script. It will install packages for client and server and copy env based on .env.example. 
./install.sh
```

#### 3. Configure environment
Edit `server/.env`:

```env
PORT=3000
TEAMTAILOR_API_KEY=your_actual_api_key_here
TEAMTAILOR_API_VERSION=20240404
CLIENT_URL="http://localhost:5173"
```

#### 4. Run locally
```bash
# Make the script executable (macOS/Linux)
chmod +x dev.sh

# Run the dev script. It will start both backend and client servers.
./dev.sh
```

## 🌐 Access the Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000](http://localhost:3000)
  
## 📚 API Endpoints

### Candidates
- `GET /api/v1/candidates` - Get paginated candidates
  - Query params: `pageSize`, `page`,`search`.
- `GET /api/v1/candidates/export` - Export all candidates to CSV

### Example API Usage
```bash
# Get first page with 10 candidates
curl "http://localhost:3000/api/v1/candidates?pageSize=10&page=1&search=hugo"

# Export CSV
curl "http://localhost:3000/api/v1/candidates/export" -o candidates.csv
```


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
