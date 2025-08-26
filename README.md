# 🚀 AI Document Generator with Blockchain Integration

[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-green)](https://nodejs.org/)
[![Internet Computer](https://img.shields.io/badge/Blockchain-DFX-orange)](https://internetcomputer.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**AI-powered document generator with blockchain integration for security, transparency, and immutable storage.**

---

## 📋 Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [API Reference](#api-reference)
- [Security Best Practices](#security-best-practices)
- [Performance Tips](#performance-tips)
- [Changelog](#changelog)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Support](#support)

---

## ✨ Features

- 🤖 **AI Document Generation** – Generate contracts and agreements from natural language prompts.
- ⛓️ **Blockchain Integration** – Upload and verify documents on-chain.
- 📄 **PDF Export** – Professional PDF output with consistent formatting.
- 🚦 **Rate Limiting** – Built-in queue system to prevent `429` errors.
- 🔄 **Auto Retry** – Automatic retries with exponential backoff on failures.
- 💾 **Secure Storage** – Encrypted and immutable document storage via blockchain.

---

## 🏗️ System Architecture

Frontend (React) ←→ AI Proxy Server (Port 3001) ←→ OpenRouter API
↓
PDF Generator Server (Port 4000) ←→ Blockchain Network

markdown
Copy
Edit

---

## 📦 Prerequisites

Make sure your system has the following:

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0 or **yarn**
- **DFX SDK** (for Internet Computer blockchain deployment)
- **Git**
- **OpenRouter API Key** (free at [OpenRouter.ai](https://openrouter.ai))

### Version Check

```bash
node --version    # >= 18.0.0
npm --version     # >= 8.0.0
dfx --version     # >= 0.15.0
🛠️ Installation & Setup
1. Clone Repository
bash
Copy
Edit
git clone <repository-url>
cd ai-document-generator
2. Install Dependencies
Backend Servers

bash
Copy
Edit
# AI Proxy Server
cd ai-proxy-server
npm install express node-fetch cors dotenv

# PDF Generator Server
cd ../pdf-generator-server
npm install express cors node-fetch pdfkit dotenv
Frontend

bash
Copy
Edit
cd ../frontend
npm install
# or
yarn install
3. Configure Environment Variables
Create .env files in each server:

ai-proxy-server/.env

env
Copy
Edit
OPENROUTER_API_KEY=your_openrouter_api_key_here
NODE_ENV=development
PORT=3001
pdf-generator-server/.env

env
Copy
Edit
OPENROUTER_API_KEY=your_openrouter_api_key_here
NODE_ENV=development
PORT=4000
Obtain your API key from OpenRouter.ai → Dashboard → API Keys.

4. Setup Blockchain (DFX)
Install DFX:

bash
Copy
Edit
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
Run local network and deploy:

bash
Copy
Edit
dfx start --background --clean
dfx deploy
Production deployment:

bash
Copy
Edit
dfx deploy --network ic
🚀 Running the Application
Option 1: Manual (3 separate terminals)
bash
Copy
Edit
# Terminal 1: AI Proxy Server
cd ai-proxy-server && npm start

# Terminal 2: PDF Generator Server
cd pdf-generator-server && npm start

# Terminal 3: Frontend React App
cd frontend && npm start
Option 2: Using Concurrently (recommended)
bash
Copy
Edit
npm install -g concurrently
Add to root package.json:

json
Copy
Edit
{
  "scripts": {
    "dev": "concurrently \"cd ai-proxy-server && npm start\" \"cd pdf-generator-server && npm start\" \"cd frontend && npm start\"",
    "start:ai": "cd ai-proxy-server && npm start",
    "start:pdf": "cd pdf-generator-server && npm start",
    "start:frontend": "cd frontend && npm start"
  }
}
Run:

bash
Copy
Edit
npm run dev
Verify Services
bash
Copy
Edit
curl http://localhost:3001/health   # AI Proxy Server
curl http://localhost:4000/health   # PDF Generator Server
open http://localhost:3000          # Frontend
📖 Usage
1. Generate Documents with AI
Open http://localhost:3000

Select AI Document Generator

Enter a detailed prompt, e.g.:

sql
Copy
Edit
Create a one-year rental agreement between
John Doe (tenant) and Jane Smith (landlord),
rent: $500/month, location: 123 Liberty St, New York.
Click Generate PDF → wait for processing

A PDF will be automatically downloaded

2. Upload Documents to Blockchain
Click Upload to Blockchain

Select your generated PDF file

File will be encrypted & stored on-chain

Receive transaction hash for verification

3. Prompt Tips
✅ Good Prompt:

yaml
Copy
Edit
Create a permanent employment contract:
- Name: Michael Johnson
- Position: Software Engineer
- Salary: $5,000/month
- Start Date: January 1, 2024
- Company: Tech Innovators Inc.
❌ Poor Prompt:

css
Copy
Edit
Create a job contract
🔧 Troubleshooting
Rate Limit 429
The app includes a queue system + auto-retry

Check queue status: http://localhost:3001/queue-status

Server Port Conflicts
bash
Copy
Edit
lsof -i :3001
lsof -i :4000
lsof -i :3000
kill -9 <PID>
API Key Error
Ensure .env exists in both server folders

Validate API key on OpenRouter.ai

Restart servers

DFX Issues
bash
Copy
Edit
dfx stop
dfx start --background --clean
dfx deploy
Frontend Build Error
bash
Copy
Edit
rm -rf node_modules package-lock.json
npm install
# or with yarn
rm -rf node_modules yarn.lock
yarn install
📡 API Reference
AI Proxy Server (Port 3001)
Health Check

http
Copy
Edit
GET /health
json
Copy
Edit
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00Z",
  "hasApiKey": true,
  "queueLength": 0
}
Chat/Generate

http
Copy
Edit
POST /chat
Content-Type: application/json
{
  "prompt": "Your prompt here"
}
PDF Generator Server (Port 4000)
Generate Text

http
Copy
Edit
POST /generate-text
json
Copy
Edit
{
  "prompt": "Document request"
}
Generate PDF

http
Copy
Edit
POST /generate-pdf
Content-Type: application/json
{
  "aiText": "Document content"
}
Response: PDF download
```

🛣️ Roadmap

 Premium templates untuk dokumen legal

 Verifikasi dokumen berbasis NFT

 Integrasi DAO & multi-sig signing

 Marketplace dokumen legal siap pakai
