# GEO-Chain

**AI Search Visibility Platform for Web3 Projects**

> Detect how AI engines (ChatGPT, Perplexity, Gemini, Grok) describe your Web3 project — and optimize for accuracy, ranking, and sentiment. Built on BNB Chain.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built on BNB Chain](https://img.shields.io/badge/Built%20on-BNB%20Chain-F0B90B)](https://www.bnbchain.org/)
[![Powered by DGrid](https://img.shields.io/badge/Powered%20by-DGrid%20AI-7c3aed)](https://dgrid.ai/)

---

## Problem

70%+ of users now ask AI instead of Google. But most Web3 projects have **zero visibility** in AI search engines — information is outdated, inaccurate, or completely missing. Traditional SEO tools don't cover AI engines. There is no "GEO for Web3" product on the market.

## Solution

GEO-Chain provides:

- **4-Engine Detection** — Query ChatGPT, Perplexity, Gemini & Grok simultaneously
- **GEO Score (0-100)** — Composite score measuring mention rate, accuracy, ranking, sentiment, and source coverage
- **AI Optimization Suggestions** — Actionable recommendations to improve AI search visibility
- **On-Chain NFT** — Optimization suggestions minted as NFT on BNB Chain
- **Chrome Extension** — See GEO Scores directly on four.meme project pages
- **Contract Address Input** — Precise project identification via BNB Chain contract address

## Architecture

```
┌───────────────────┐     ┌──────────────────────────────────────┐
│ Chrome Extension  │     │  Web App (Next.js 14)                │
│ (four.meme)       │────>│  Landing | Scan | Report | Extension │
└───────────────────┘     └──────────────┬───────────────────────┘
                                         │
┌────────────────────────────────────────┴───────────────────────┐
│  GEO Detection Pipeline                                       │
│  Query Generation → 4-Engine Parallel Query → AI Analysis     │
│  → GEO Score Calculation → Optimization Suggestions           │
│                                                               │
│  Powered by DGrid AI Gateway                                  │
│  ChatGPT | Perplexity | Gemini | Grok                         │
└──────────┬──────────────────────────────────┬─────────────────┘
           │                                  │
┌──────────┴──────────┐        ┌──────────────┴─────────────────┐
│  Data Layer          │        │  BNB Chain (BSC)               │
│  Supabase + Redis    │        │  PaymentRouter.sol             │
│                      │        │  GEOSuggestionNFT.sol (ERC-721)│
└──────────────────────┘        └────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, TailwindCSS, shadcn/ui |
| Wallet | wagmi v2, RainbowKit |
| AI Gateway | DGrid AI Gateway (ChatGPT, Perplexity, Gemini, Grok) |
| Database | Supabase (PostgreSQL) |
| Cache | Upstash Redis |
| Smart Contracts | Solidity, Hardhat (BNB Chain) |
| Storage | IPFS (Pinata) |
| Deployment | Vercel |
| Extension | Chrome Extension (Manifest V3) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask wallet (with BSC Testnet configured)

### Installation

```bash
# Clone the repository
git clone https://github.com/FengRay/geo-chain.git
cd geo-chain

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your API keys in .env.local
# DGRID_API_KEY=your_dgrid_api_key
# SUPABASE_URL=your_supabase_url
# SUPABASE_ANON_KEY=your_supabase_key
# NEXT_PUBLIC_BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.bnbchain.org:8545

# Run development server
npm run dev
```

### Smart Contract Deployment

```bash
cd contracts

# Install Hardhat dependencies
npm install

# Deploy to BSC Testnet
npx hardhat run scripts/deploy.ts --network bscTestnet
```

### Chrome Extension

```bash
cd extension

# Build extension
npm run build

# Load in Chrome:
# 1. Go to chrome://extensions
# 2. Enable Developer Mode
# 3. Click "Load unpacked"
# 4. Select the extension/dist folder
```

## Project Structure

```
geo-chain/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── api/                # API routes
│   │   └── app/                # App pages (dashboard, scan, results)
│   ├── components/             # React components
│   ├── lib/
│   │   ├── dgrid.ts            # DGrid AI Gateway client
│   │   ├── pipeline/           # GEO detection pipeline
│   │   │   ├── query-generator.ts
│   │   │   ├── engine-querier.ts
│   │   │   ├── response-analyzer.ts
│   │   │   └── score-calculator.ts
│   │   ├── contracts/          # Contract ABIs and helpers
│   │   └── supabase.ts         # Database client
│   └── types/                  # TypeScript types
├── contracts/
│   ├── PaymentRouter.sol       # Multi-token payment contract
│   ├── GEOSuggestionNFT.sol    # ERC-721 NFT for suggestions
│   └── test/                   # Contract tests
├── extension/
│   ├── manifest.json           # Chrome Extension manifest (V3)
│   ├── content.ts              # Content script for four.meme
│   └── popup/                  # Extension popup UI
├── .env.example
├── README.md
└── LICENSE
```

## GEO Score Methodology

The GEO Score (0-100) is a weighted composite of 5 dimensions:

| Dimension | Weight | Description |
|-----------|--------|-------------|
| Mention Rate | 30% | How often the project is mentioned across AI queries |
| Accuracy | 25% | Correctness of AI-generated descriptions vs on-chain data |
| Ranking | 20% | Position when AI lists projects in a category |
| Sentiment | 15% | Positive, neutral, or negative tone in AI responses |
| Source Coverage | 10% | Number and quality of sources AI engines cite |

## Business Model

- **Free**: GEO detection report (score, engine comparison, problem list)
- **Paid ($3)**: AI optimization suggestions, minted as NFT
- **Payment**: $FOUR, $DGAI (recommended), BNB, USDT

## Roadmap

- **Q2 2026 (Now)**: MVP — 4-engine detection, Chrome Extension for four.meme, NFT minting
- **Q3 2026**: Chrome Web Store listing, auto-monitoring, pump.fun support
- **Q4 2026**: SaaS model, open API, multi-chain support
- **2027+**: GEO Score as industry standard, enterprise analytics

## Hackathon

Built for the [Four.Meme AI Sprint](https://dorahacks.io/hackathon/fourmemeaisprint) hackathon on DoraHacks.

- **Prize Pool**: $50,000
- **Bounty**: DGrid AI Gateway Challenge ($3,000)
- **Ecosystem**: BNB Chain

## Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- **Live Demo**: [geo-chain.vercel.app](https://geo-chain.vercel.app)
- **Twitter**: [@Feng21671868](https://x.com/Feng21671868)
- **DoraHacks**: [BUIDL Submission](https://dorahacks.io/hackathon/fourmemeaisprint)

---

Built with &#9889; by [catfish ai notes](https://x.com/Feng21671868)
