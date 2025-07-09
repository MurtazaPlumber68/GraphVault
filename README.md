
# Autonomous AI-Powered Personal Knowledge Graph (PKG)

[![Node.js](https://img.shields.io/badge/Node.js-≥16.0-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-≥3.10-blue.svg)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://reactjs.org/)
[![Neo4j](https://img.shields.io/badge/Neo4j-5.0+-008CC1.svg)](https://neo4j.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg)](https://docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5.svg)](https://kubernetes.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An intelligent, autonomous system that transforms your scattered digital information into a unified, queryable knowledge graph. PKG automatically ingests data from multiple sources (emails, documents, calendars, repositories), extracts meaningful entities and relationships using advanced NLP, and provides semantic search capabilities with AI-powered insights—all while maintaining privacy and operating offline-first.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage Examples](#usage-examples)
- [Configuration & Customization](#configuration--customization)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

### 🔄 **Ingestion Engine**
- **Multi-source connectors**: Gmail, Google Drive, GitHub, Calendar, Slack, Discord, file systems
- **Real-time synchronization**: Event-driven updates with conflict resolution
- **Offline-first architecture**: Queue management for intermittent connectivity
- **Smart deduplication**: Content fingerprinting and merge strategies

### 🧠 **NLP & Knowledge Graph Construction**
- **Entity extraction**: Named entities, relationships, and temporal associations
- **Semantic embeddings**: Vector representations using transformer models
- **Graph construction**: Dynamic Neo4j schema evolution with relationship scoring
- **Multi-language support**: Processing for 15+ languages with translation capabilities

### 🔍 **Semantic Search & Q&A**
- **Vector similarity search**: Pinecone/Weaviate integration for contextual queries
- **Hybrid search**: Combining keyword, semantic, and graph traversal
- **Natural language Q&A**: RAG-based responses with source attribution
- **Temporal queries**: Time-aware knowledge retrieval and trending analysis

### 🤖 **Agent Layer**
- **Task automation**: Smart scheduling, email categorization, content summarization
- **Personalized insights**: Daily briefings, relationship mapping, knowledge gaps
- **Proactive notifications**: Important deadline detection, follow-up suggestions
- **Custom agent framework**: Plugin architecture for domain-specific assistants

### 📊 **Dashboard & Visualization**
- **Interactive knowledge graph**: 3D visualization with filtering and clustering
- **Analytics dashboard**: Usage patterns, knowledge growth, connection insights
- **Real-time monitoring**: Data ingestion status, processing pipeline health
- **Mobile-responsive**: Progressive web app with offline capabilities

### 🚀 **Deployment & Security**
- **Containerized microservices**: Docker + Kubernetes with Helm charts
- **Zero-trust security**: End-to-end encryption, OAuth2/OIDC integration
- **GDPR compliance**: Data anonymization, export, and deletion capabilities
- **Scalable infrastructure**: Auto-scaling, load balancing, and monitoring

## Architecture

```mermaid
graph TB
    subgraph "Data Sources"
        A[Gmail/Email] --> D[Event Bus]
        B[Google Drive] --> D
        C[GitHub Repos] --> D
        E[Calendar] --> D
        F[File System] --> D
    end
    
    subgraph "Ingestion Layer"
        D --> G[Message Queue]
        G --> H[Data Preprocessor]
        H --> I[Content Deduplicator]
    end
    
    subgraph "Processing Pipeline"
        I --> J[NLP Engine]
        J --> K[Entity Extractor]
        K --> L[Relationship Mapper]
        L --> M[Embedding Generator]
    end
    
    subgraph "Storage Layer"
        M --> N[Neo4j Graph DB]
        M --> O[Vector Store]
        I --> P[Data Lake S3]
    end
    
    subgraph "AI & Search"
        N --> Q[Graph Query Engine]
        O --> R[Vector Search]
        Q --> S[RAG Pipeline]
        R --> S
        S --> T[LLM Agent]
    end
    
    subgraph "Application Layer"
        T --> U[REST API]
        U --> V[Next.js Dashboard]
        U --> W[Mobile App]
        U --> X[CLI Tools]
    end
    
    subgraph "Infrastructure"
        Y[Kubernetes Cluster]
        Z[Monitoring Stack]
        AA[Security Layer]
    end
```

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** ≥16.0 and npm ≥8.0
- **Python** ≥3.10 with pip
- **Docker** ≥20.10 and Docker Compose ≥2.0
- **Kubernetes CLI** (kubectl) ≥1.24
- **Helm** ≥3.8
- **Cloud Account**: AWS, GCP, or Azure for production deployment

### Installation

#### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ai-knowledge-graph.git
   cd ai-knowledge-graph
   ```

2. **Start with Docker Compose**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit configuration
   nano .env
   
   # Build and start services
   docker-compose up --build
   ```

3. **Access the application**
   - Dashboard: http://localhost:3000
   - API: http://localhost:8000
   - Neo4j Browser: http://localhost:7474

#### Production Deployment

1. **Install with Helm**
   ```bash
   # Add PKG Helm repository
   helm repo add pkg-charts https://charts.pkg.ai
   helm repo update
   
   # Install in production namespace
   kubectl create namespace pkg-prod
   helm install pkg pkg-charts/knowledge-graph \
     --namespace pkg-prod \
     --values production-values.yaml
   ```

2. **Verify deployment**
   ```bash
   kubectl get pods -n pkg-prod
   kubectl port-forward -n pkg-prod svc/pkg-dashboard 3000:3000
   ```

### Environment Variables

Create a `.env` file with the following required variables:

```bash
# Core Configuration
NODE_ENV=development
API_PORT=8000
FRONTEND_PORT=3000

# Database Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_password
POSTGRES_URL=postgresql://user:pass@localhost:5432/pkgdb

# Vector Store
PINECONE_API_KEY=your_pinecone_key
PINECONE_ENVIRONMENT=us-west1-gcp

# AI Services
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
HUGGINGFACE_API_TOKEN=your_hf_token

# Authentication
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_secret

# Data Sources
GMAIL_CREDENTIALS_PATH=/app/secrets/gmail-credentials.json
GITHUB_TOKEN=your_github_personal_access_token
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token

# Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=your-pkg-data-bucket

# Monitoring
PROMETHEUS_ENABLED=true
GRAFANA_ADMIN_PASSWORD=your_grafana_password
```

## Usage Examples

### Data Ingestion

Ingest data from various sources using the REST API:

```bash
# Start Gmail ingestion
curl -X POST http://localhost:8000/api/v1/ingest/gmail \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sync_since": "2024-01-01", "include_attachments": true}'

# Ingest GitHub repositories
curl -X POST http://localhost:8000/api/v1/ingest/github \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"repositories": ["org/repo1", "org/repo2"], "include_issues": true}'

# Upload documents
curl -X POST http://localhost:8000/api/v1/ingest/documents \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -F "file=@/path/to/document.pdf" \
  -F "metadata={\"tags\": [\"research\", \"important\"]}"
```

### Semantic Search

Query your knowledge graph using natural language:

```bash
# Semantic search via API
curl -X POST http://localhost:8000/api/v1/search \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What were the key decisions made in last weeks product meetings?",
    "limit": 10,
    "include_context": true
  }'

# CLI search tool
npx pkg-cli search "Find all documents related to machine learning projects"

# Advanced graph query
curl -X POST http://localhost:8000/api/v1/graph/query \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "cypher": "MATCH (p:Person)-[:COLLABORATED_WITH]->(proj:Project) WHERE proj.name CONTAINS \"AI\" RETURN p, proj",
    "parameters": {}
  }'
```

### Dashboard Interface

![PKG Dashboard Screenshot](docs/images/dashboard-screenshot.png)

Access the interactive dashboard at `http://localhost:3000` to:
- Visualize your knowledge graph in 3D
- Monitor real-time data ingestion
- Configure source connections
- Run semantic searches with visual results
- View AI-generated insights and summaries

## Configuration & Customization

### Connector Configuration

Enable or disable data source connectors in `config/connectors.yaml`:

```yaml
connectors:
  gmail:
    enabled: true
    sync_interval: "5m"
    max_emails_per_batch: 100
    include_attachments: true
    
  github:
    enabled: true
    sync_interval: "15m"
    include_private_repos: false
    webhook_enabled: true
    
  slack:
    enabled: false
    channels: ["general", "dev-team"]
    include_dm: false
```

### NLP Model Tuning

Customize the NLP pipeline in `config/nlp.yaml`:

```yaml
nlp:
  entity_extraction:
    model: "en_core_web_lg"
    custom_entities: ["PRODUCT", "FEATURE"]
    confidence_threshold: 0.8
    
  embeddings:
    model: "sentence-transformers/all-mpnet-base-v2"
    dimension: 768
    batch_size: 32
    
  relationship_extraction:
    model: "rebel-large"
    max_relations_per_text: 10
```

### Vector Database Options

Switch between vector storage backends:

```yaml
# Pinecone (managed)
vector_store:
  provider: "pinecone"
  index_name: "pkg-embeddings"
  metric: "cosine"

# Weaviate (self-hosted)
vector_store:
  provider: "weaviate"
  host: "http://localhost:8080"
  class_name: "Document"

# Qdrant (local)
vector_store:
  provider: "qdrant"
  host: "localhost"
  port: 6333
  collection_name: "knowledge"
```

### Temporal Graph Settings

Configure time-aware knowledge representation:

```yaml
temporal:
  enabled: true
  default_ttl: "365d"
  versioning: true
  time_granularity: "day"
  decay_function: "exponential"
  decay_rate: 0.1
```

## API Documentation

Complete API documentation is available at:
- **Interactive Docs**: http://localhost:8000/docs (Swagger UI)
- **OpenAPI Spec**: http://localhost:8000/openapi.json
- **Redoc**: http://localhost:8000/redoc

Key endpoints:
- `POST /api/v1/ingest/{source}` - Trigger data ingestion
- `POST /api/v1/search` - Semantic search
- `GET /api/v1/graph/entities` - Browse entities
- `POST /api/v1/graph/query` - Execute Cypher queries
- `GET /api/v1/insights/daily` - Get AI-generated insights

## Contributing

We welcome contributions! Please follow these guidelines:

### Code Style
- **TypeScript/JavaScript**: Use Prettier + ESLint (configs in `.eslintrc.js`)
- **Python**: Use Black + isort + flake8 (see `pyproject.toml`)
- **Git hooks**: Pre-commit hooks ensure formatting compliance

### Commit Message Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
feat(ingestion): add Slack connector with thread support
fix(search): resolve embedding dimension mismatch
docs(api): update authentication examples
```

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make your changes and add tests
4. Run the test suite: `npm test && python -m pytest`
5. Submit a pull request with clear description

### Proposing New Features
- **New Connectors**: Create an issue with connector specification
- **AI Agents**: Follow the agent framework documentation
- **Integrations**: Ensure compatibility with existing architecture

## Roadmap

### Q1 2024
- [ ] **Local LLM Integration**: Self-hosted model fine-tuning dashboard
- [ ] **Mobile Voice Assistant**: iOS/Android app with voice queries
- [ ] **Advanced Analytics**: Knowledge evolution tracking and insights

### Q2 2024
- [ ] **Bot Integrations**: Native Slack and Discord bots
- [ ] **Collaborative Features**: Shared knowledge spaces and team insights
- [ ] **Enhanced Privacy**: Federated learning and differential privacy

### Q3 2024
- [ ] **GDPR Toolkit**: Complete data export, anonymization, and deletion
- [ ] **Enterprise SSO**: SAML, LDAP, and Active Directory integration
- [ ] **API Gateway**: Rate limiting, caching, and advanced authentication

### Q4 2024
- [ ] **Knowledge Marketplace**: Share and discover community knowledge graphs
- [ ] **Real-time Collaboration**: Live graph editing and synchronized views
- [ ] **Advanced AI Agents**: Industry-specific assistants and workflows



## Acknowledgments

This project builds upon the excellent work of the open-source community:

- **[Neo4j](https://neo4j.com/)** - Graph database foundation
- **[LangChain](https://langchain.com/)** - LLM orchestration framework
- **[Pinecone](https://pinecone.io/)** - Vector database and similarity search
- **[spaCy](https://spacy.io/)** - Industrial-strength NLP
- **[Sentence Transformers](https://www.sbert.net/)** - State-of-the-art embeddings
- **[React Flow](https://reactflow.dev/)** - Interactive graph visualization
- **[D3.js](https://d3js.org/)** - Data-driven visualizations

Special thanks to the contributors and maintainers who make this project possible.

---

**Ready to build your personal knowledge graph?** Start with the [Getting Started](#getting-started) guide and join our community on [Discord](https://discord.gg/pkg-ai) for support and discussions.
