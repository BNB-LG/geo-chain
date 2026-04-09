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

- **Live Site**: [geo-chain.vercel.app](https://geo-chain.vercel.app)
- **Demo**：[fourmeme-hackathon-plan.pages.dev/demo](https://fourmeme-hackathon-plan.pages.dev/demo)
- **Twitter**: [@Melo_Tsai](https://x.com/Melo_Tsai)
- **DoraHacks**: [BUIDL Submission](https://dorahacks.io/hackathon/fourmemeaisprint)

---

Built with &#9889; by [Melo](https://x.com/Melo_Tsai)

# GEO-Chain

**Web3 项目的 AI 搜索可见性检测与优化平台**

> 检测你的 Web3 项目在 ChatGPT、Perplexity、Gemini、Grok 中的表现 — 并优化准确性、排名和情感倾向。基于 BNB Chain 构建。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built on BNB Chain](https://img.shields.io/badge/Built%20on-BNB%20Chain-F0B90B)](https://www.bnbchain.org/)
[![Powered by DGrid](https://img.shields.io/badge/Powered%20by-DGrid%20AI-7c3aed)](https://dgrid.ai/)

---

## 问题

超过 70% 的用户已经开始用 AI 代替 Google 搜索。但大多数 Web3 项目在 AI 搜索引擎中的**可见性为零** — 信息过时、不准确、甚至完全缺失。传统 SEO 工具无法覆盖 AI 引擎。市场上不存在"Web3 专属的 GEO 产品"。

## 解决方案

GEO-Chain 提供：

- **4 引擎检测** — 同时查询 ChatGPT、Perplexity、Gemini 和 Grok
- **GEO 评分 (0-100)** — 综合提及率、准确性、排名、情感和来源覆盖的评分
- **AI 优化建议** — 可执行的优化方案，付费 $3 解锁（支持 $FOUR / $DGAI / BNB）
- **链上 NFT** — 优化建议铸造为 BNB Chain 上的 NFT
- **Chrome 插件** — 在 four.meme 页面上直接查看项目的 GEO 评分
- **合约地址输入** — 通过 BNB Chain 合约地址精确识别项目

## 系统架构

```
┌───────────────────┐     ┌──────────────────────────────────────┐
│ Chrome Extension  │     │  Web App (Next.js 14)                │
│ (four.meme)       │────>│  Landing | Scan | Report | Extension │
└───────────────────┘     └──────────────┬───────────────────────┘
                                         │
┌────────────────────────────────────────┴───────────────────────┐
│  GEO 检测 Pipeline                                            │
│  查询生成 → 4引擎并行查询 → AI 分析 → GEO 评分 → 优化建议     │
│                                                               │
│  由 DGrid AI Gateway 驱动                                     │
│  ChatGPT | Perplexity | Gemini | Grok                         │
└──────────┬──────────────────────────────────┬─────────────────┘
           │                                  │
┌──────────┴──────────┐        ┌──────────────┴─────────────────┐
│  数据层              │        │  BNB Chain (BSC)               │
│  Supabase + Redis   │        │  PaymentRouter.sol             │
│                     │        │  GEOSuggestionNFT.sol (ERC-721)│
└─────────────────────┘        └────────────────────────────────┘
```

## 技术栈

| 层次 | 技术 |
|------|------|
| 前端框架 | Next.js 14, TypeScript, TailwindCSS |
| 钱包连接 | wagmi v2, RainbowKit |
| AI 网关 | DGrid AI Gateway (ChatGPT, Perplexity, Gemini, Grok) |
| 数据库 | Supabase (PostgreSQL) |
| 缓存 | Upstash Redis |
| 智能合约 | Solidity, Hardhat (BNB Chain) |
| 存储 | IPFS (Pinata) |
| 部署 | Vercel |
| 浏览器插件 | Chrome Extension (Manifest V3) |

## 快速开始

### 前置要求

- Node.js 18+
- npm
- MetaMask 钱包（配置 BSC Testnet）

### 安装

```bash
git clone https://github.com/BNB-LG/geo-chain.git
cd geo-chain
npm install
cp .env.example .env.local
# 在 .env.local 中填入你的 API Key
npm run dev
```

### 智能合约部署

```bash
cd contracts
npm install
npx hardhat run scripts/deploy.ts --network bscTestnet
```

### Chrome 插件安装

1. 打开 `chrome://extensions`
2. 开启「开发者模式」
3. 点击「加载已解压的扩展程序」
4. 选择 `extension/` 文件夹

## 项目结构

```
geo-chain/
├── contracts/                # Solidity 智能合约
│   ├── PaymentRouter.sol     #   多代币支付路由
│   ├── GEOSuggestionNFT.sol  #   ERC-721 NFT
│   ├── scripts/deploy.ts     #   部署脚本
│   └── test/                 #   合约测试
├── extension/                # Chrome 浏览器插件
├── src/
│   ├── app/                  # Next.js 页面
│   │   ├── page.tsx          #   Landing Page
│   │   ├── scan/page.tsx     #   扫描 + 结果页
│   │   ├── extension/        #   插件下载页
│   │   └── api/              #   API 路由
│   ├── components/scan/      # React 组件
│   ├── lib/
│   │   ├── dgrid.ts          #   DGrid AI Gateway 客户端
│   │   ├── bscscan.ts        #   BSC RPC 代币查询
│   │   └── pipeline/         #   GEO 检测 Pipeline
│   └── types/geo.ts          # TypeScript 类型定义
├── .env.example              # 环境变量模板
├── LICENSE                   # MIT
└── README.md
```

## GEO 评分方法论

GEO Score (0-100) 由 5 个维度加权计算：

| 维度 | 权重 | 说明 |
|------|------|------|
| 提及率 | 30% | 项目在多少 AI 查询中被主动提及 |
| 准确性 | 25% | AI 描述与链上/官方数据的匹配度 |
| 排名 | 20% | 在类别查询中被提及的顺序 |
| 情感 | 15% | AI 回答中对项目的正面/中性/负面态度 |
| 来源 | 10% | AI 引用了多少权威来源 |

## 商业模式

- **免费**：GEO 检测报告（评分、引擎对比、问题列表）
- **付费 $3**：AI 优化建议，铸造为 NFT
- **支付方式**：$FOUR、$DGAI（推荐）、BNB、USDT

## 路线图

- **2026 Q2（当前）**：MVP — 4 引擎检测、Chrome 插件 (four.meme)、NFT 铸造
- **2026 Q3**：Chrome Web Store 上架、自动监控、pump.fun 支持
- **2026 Q4**：SaaS 订阅模式、开放 API、多链支持
- **2027+**：GEO Score 成为行业标准指数、企业级分析

## 黑客松

本项目为 [Four.Meme AI Sprint](https://dorahacks.io/hackathon/fourmemeaisprint) 黑客松参赛作品。

- **奖金池**：$50,000
- **赏金**：DGrid AI Gateway Challenge ($3,000)
- **生态**：BNB Chain

## 链接

- **在线 Demo**：[geo-chain.vercel.app](https://geo-chain.vercel.app)
- **产品演示**：[Demo Walkthrough](https://fourmeme-hackathon-plan.pages.dev/demo.html)
- **Twitter**：[@Melo_Tsai](https://x.com/Melo_Tsai)
- **DoraHacks**：[BUIDL 提交页](https://dorahacks.io/hackathon/fourmemeaisprint)

## 许可证

本项目基于 MIT 许可证开源 — 详见 [LICENSE](LICENSE) 文件。

---

Built with ⚡ by [Melo](https://x.com/Melo_Tsai)
