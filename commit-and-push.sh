#!/bin/bash

# Personal Knowledge Graph - Git Commit and Push Script
# Run this script to commit and push all the new backend infrastructure

echo "🚀 Starting Git commit and push process..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Please run 'git init' first."
    exit 1
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "git remote add origin <your-github-repo-url>"
    exit 1
fi

# Function to commit and push with error handling
commit_and_check() {
    local message="$1"
    local files="$2"
    
    echo "📝 Committing: $message"
    
    # Add files
    git add $files
    
    # Check if there are changes to commit
    if git diff --cached --quiet; then
        echo "⚠️  No changes to commit for: $files"
        return 0
    fi
    
    # Commit
    if git commit -m "$message"; then
        echo "✅ Successfully committed: $message"
    else
        echo "❌ Failed to commit: $message"
        return 1
    fi
}

# 1. Commit Backend Infrastructure
commit_and_check "feat: add backend infrastructure with Express.js API server

- Add TypeScript Express server with authentication
- Implement SQLite database with graph schema
- Add JWT-based auth middleware
- Create API routes for graph, search, and ingestion
- Add Swagger/OpenAPI documentation
- Include NLP processing with entity extraction" "server/"

# 2. Commit Docker Configuration
commit_and_check "feat: add Docker containerization

- Add multi-stage Dockerfile for backend
- Create frontend Dockerfile with Nginx
- Add docker-compose for local development
- Configure Nginx reverse proxy" "Dockerfile* docker-compose.yml nginx*.conf"

# 3. Commit Kubernetes Manifests
commit_and_check "feat: add Kubernetes deployment manifests

- Create K8s deployments for backend, frontend, nginx
- Add services, configmaps, and persistent volumes
- Configure namespace and resource limits
- Add secrets template for sensitive data" "kubernetes/"

# 4. Commit Helm Charts
commit_and_check "feat: add Helm charts for Kubernetes deployment

- Create Helm chart with configurable values
- Add templates for all Kubernetes resources
- Include helper functions and best practices
- Support for different environments" "helm/"

# 5. Commit CI/CD Pipeline
commit_and_check "feat: add CI/CD pipeline with GitHub Actions

- Add automated testing and building
- Configure Docker image building and pushing
- Add deployment automation
- Include security scanning and linting" ".github/"

# 6. Commit Frontend Integration
commit_and_check "feat: integrate frontend with backend API

- Add API service layer with authentication
- Create useAuth hook for user management
- Add login/register forms
- Replace mock data with real API calls" "src/services/ src/hooks/ src/components/LoginForm.tsx"

# 7. Commit Updated Components
commit_and_check "feat: update components to use real backend data

- Connect SearchInterface to backend search API
- Update IngestionPanel with real ingestion status
- Add authentication flow to main app
- Implement error handling and loading states" "src/App.tsx src/pages/ src/components/SearchInterface.tsx src/components/IngestionPanel.tsx"

# 8. Commit Configuration Files
commit_and_check "feat: add project configuration and setup script

- Add Git commit automation script
- Update project documentation
- Include development and deployment instructions" "commit-and-push.sh .gitignore README-SETUP.md"

# Push all commits
echo "🚀 Pushing all commits to GitHub..."
if git push origin main; then
    echo "✅ Successfully pushed all commits to GitHub!"
    echo ""
    echo "🎉 Personal Knowledge Graph system is now on GitHub!"
    echo "📖 Check the repository for all the new backend infrastructure"
    echo "🔗 API Documentation will be available at: http://localhost:3001/api-docs"
    echo "🔐 Demo login: demo@pkg.ai / demo123"
else
    echo "❌ Failed to push to GitHub. Please check your remote repository settings."
    echo "You may need to run: git push -u origin main"
fi

echo ""
echo "📋 Summary of what was added:"
echo "  ✅ Complete backend API server with TypeScript"
echo "  ✅ SQLite database with graph schema"
echo "  ✅ JWT authentication system"
echo "  ✅ AI/NLP processing pipeline"
echo "  ✅ Docker containerization"
echo "  ✅ Kubernetes deployment manifests"
echo "  ✅ Helm charts for easy deployment"
echo "  ✅ CI/CD pipeline with GitHub Actions"
echo "  ✅ Frontend integration with real API"
echo "  ✅ Comprehensive documentation"
echo ""
echo "🚀 Ready to run: npm run dev (frontend) and cd server && npm run dev (backend)"