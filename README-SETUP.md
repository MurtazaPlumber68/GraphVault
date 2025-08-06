# Personal Knowledge Graph - Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose (optional)
- Git

### Local Development

1. **Clone and setup:**
   ```bash
   git clone <your-repo-url>
   cd digital-memory-weaver
   npm install
   ```

2. **Setup backend:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Setup frontend (in new terminal):**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001
   - API Documentation: http://localhost:3001/api-docs

### Demo Account
- Email: `demo@pkg.ai`
- Password: `demo123`

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or run individual services
docker build -t pkg-backend .
docker build -f Dockerfile.frontend -t pkg-frontend .
```

### Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f kubernetes/

# Or use Helm
helm install pkg ./helm
```

## Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite (development) / PostgreSQL (production)
- **AI/NLP**: Natural.js + Compromise.js
- **Authentication**: JWT tokens
- **Deployment**: Docker + Kubernetes + Helm

## API Endpoints

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/graph/nodes` - Get graph nodes
- `GET /api/graph/edges` - Get graph edges
- `POST /api/search` - Semantic search
- `POST /api/ingestion/start` - Start data ingestion
- `GET /api/ingestion/status` - Get ingestion status

## Development

### Backend Development
```bash
cd server
npm run dev        # Start development server
npm run build      # Build for production
npm run test       # Run tests
```

### Frontend Development
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details