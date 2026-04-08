import type { GEOScanResult } from "@/types/geo";

export const MOCK_SCAN_STEPS = [
  "Initializing scan engine",
  "Generating AI queries",
  "Querying ChatGPT",
  "Querying Perplexity",
  "Querying Gemini",
  "Querying Grok",
  "Analyzing mentions & accuracy",
  "Computing sentiment scores",
  "Calculating GEO Score",
  "Generating optimization report",
] as const;

export const CATEGORIES = [
  "DeFi",
  "DEX",
  "Meme Launchpad",
  "NFT",
  "GameFi",
  "Infrastructure",
  "Layer 2",
  "Wallet",
  "Lending",
  "Yield Aggregator",
] as const;

const pancakeSwapResult: GEOScanResult = {
  id: "scan-pancakeswap-001",
  projectName: "PancakeSwap",
  contractAddress: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  tokenInfo: {
    name: "PancakeSwap Token",
    symbol: "CAKE",
    decimals: 18,
    totalSupply: "750,000,000",
    contractAddress: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    website: "https://pancakeswap.finance",
  },
  category: "DEX",
  geoScore: {
    total: 78,
    mention: 85,
    accuracy: 72,
    ranking: 80,
    sentiment: 76,
    sources: 68,
    engines: [
      {
        engine: "ChatGPT",
        score: 82,
        mentioned: true,
        sentiment: "positive",
        keyIssue: "Occasionally confuses V2 and V3 liquidity models",
      },
      {
        engine: "Perplexity",
        score: 85,
        mentioned: true,
        sentiment: "positive",
        keyIssue: "Cites outdated TVL figures from 2023",
      },
      {
        engine: "Gemini",
        score: 70,
        mentioned: true,
        sentiment: "neutral",
        keyIssue: "Lacks detail on BNB Chain-specific features",
      },
      {
        engine: "Grok",
        score: 65,
        mentioned: true,
        sentiment: "neutral",
        keyIssue: "Minimal coverage of recent governance proposals",
      },
    ],
  },
  queries: [
    { query: "What is PancakeSwap?", category: "brand" },
    { query: "Best DEX on BNB Chain", category: "category" },
    { query: "PancakeSwap vs Uniswap", category: "comparison" },
    {
      query: "How to swap tokens on BNB Chain cheaply",
      category: "scenario",
    },
    { query: "Top DeFi protocols 2024", category: "general" },
  ],
  analyses: [
    {
      engine: "chatgpt",
      query: "What is PancakeSwap?",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 88,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: [
        "PancakeSwap",
        "Uniswap",
        "SushiSwap",
        "Trader Joe",
      ],
      sourceUrls: [
        "https://pancakeswap.finance",
        "https://docs.pancakeswap.finance",
      ],
      rawResponse:
        "PancakeSwap is the leading decentralized exchange (DEX) on BNB Chain, offering token swaps, yield farming, and lottery features. It uses an automated market maker (AMM) model and has processed over $500B in cumulative trading volume since launch.",
    },
    {
      engine: "perplexity",
      query: "What is PancakeSwap?",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 90,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: ["PancakeSwap", "Uniswap", "Curve"],
      sourceUrls: [
        "https://pancakeswap.finance",
        "https://coinmarketcap.com/currencies/pancakeswap",
      ],
      rawResponse:
        "PancakeSwap is the most popular decentralized exchange on the BNB Smart Chain. It allows users to swap BEP-20 tokens, provide liquidity, and earn CAKE rewards through farming and staking. The protocol has expanded to support multiple chains including Ethereum and Arbitrum.",
    },
    {
      engine: "gemini",
      query: "What is PancakeSwap?",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 75,
      accuracyIssues: ["Does not mention multi-chain expansion"],
      sentiment: "neutral",
      competitorRanking: ["Uniswap", "PancakeSwap", "SushiSwap"],
      sourceUrls: ["https://pancakeswap.finance"],
      rawResponse:
        "PancakeSwap is a decentralized exchange built on BNB Chain. Users can trade tokens, provide liquidity to earn fees, and participate in initial farm offerings. The platform's native token is CAKE.",
    },
    {
      engine: "grok",
      query: "What is PancakeSwap?",
      mentionDetected: true,
      mentionPosition: 1,
      accuracyScore: 68,
      accuracyIssues: [
        "TVL figure is outdated",
        "Missing V3 concentrated liquidity info",
      ],
      sentiment: "neutral",
      competitorRanking: ["Uniswap", "PancakeSwap"],
      sourceUrls: [],
      rawResponse:
        "PancakeSwap is a popular DEX on the Binance Smart Chain. It offers swapping, farming, and staking features, with CAKE as its governance and utility token. The platform has around $2B in TVL.",
    },
    {
      engine: "chatgpt",
      query: "Best DEX on BNB Chain",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 82,
      accuracyIssues: ["Minor: lists some defunct protocols"],
      sentiment: "positive",
      competitorRanking: [
        "PancakeSwap",
        "Biswap",
        "Thena",
        "BabySwap",
      ],
      sourceUrls: [],
      rawResponse:
        "The best DEX on BNB Chain is widely considered to be PancakeSwap, which dominates with the highest TVL and trading volume. Other notable options include Biswap, Thena, and DODO.",
    },
    {
      engine: "perplexity",
      query: "Best DEX on BNB Chain",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 86,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: [
        "PancakeSwap",
        "Thena",
        "Biswap",
        "DODO",
      ],
      sourceUrls: [
        "https://defillama.com/chain/BSC",
        "https://pancakeswap.finance",
      ],
      rawResponse:
        "PancakeSwap remains the top DEX on BNB Chain by trading volume and total value locked (TVL). According to DefiLlama, PancakeSwap accounts for over 60% of all DEX volume on the chain.",
    },
    {
      engine: "gemini",
      query: "Best DEX on BNB Chain",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 70,
      accuracyIssues: ["Outdated competitor list"],
      sentiment: "neutral",
      competitorRanking: [
        "PancakeSwap",
        "BakerySwap",
        "Biswap",
      ],
      sourceUrls: [],
      rawResponse:
        "PancakeSwap is the leading decentralized exchange on BNB Chain. It offers competitive fees and a wide range of trading pairs. BakerySwap and Biswap are alternatives worth considering.",
    },
    {
      engine: "grok",
      query: "Best DEX on BNB Chain",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 65,
      accuracyIssues: ["Missing recent DEX entrants"],
      sentiment: "positive",
      competitorRanking: ["PancakeSwap", "Biswap"],
      sourceUrls: [],
      rawResponse:
        "PancakeSwap is the go-to DEX on BNB Chain. It has the most liquidity and trading pairs. If you're looking to trade on BSC, PancakeSwap is probably your best bet.",
    },
    {
      engine: "chatgpt",
      query: "PancakeSwap vs Uniswap",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 85,
      accuracyIssues: [],
      sentiment: "neutral",
      competitorRanking: ["Uniswap", "PancakeSwap"],
      sourceUrls: [],
      rawResponse:
        "PancakeSwap and Uniswap are both leading DEXs but serve different ecosystems. PancakeSwap dominates BNB Chain with lower fees, while Uniswap leads on Ethereum. PancakeSwap offers more gamified features like lottery and prediction markets.",
    },
    {
      engine: "perplexity",
      query: "PancakeSwap vs Uniswap",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 88,
      accuracyIssues: [],
      sentiment: "neutral",
      competitorRanking: ["Uniswap", "PancakeSwap"],
      sourceUrls: [
        "https://defillama.com",
      ],
      rawResponse:
        "Both are AMM-based DEXs. Uniswap pioneered the model on Ethereum, while PancakeSwap adapted it for BNB Chain with lower gas fees. Uniswap has higher TVL overall, but PancakeSwap leads in BNB Chain ecosystem.",
    },
    {
      engine: "gemini",
      query: "PancakeSwap vs Uniswap",
      mentionDetected: true,
      mentionPosition: 1,
      accuracyScore: 72,
      accuracyIssues: ["Missing fee comparison details"],
      sentiment: "neutral",
      competitorRanking: ["Uniswap", "PancakeSwap"],
      sourceUrls: [],
      rawResponse:
        "Uniswap is the largest DEX by volume globally. PancakeSwap is the top DEX on BNB Chain. Both use AMM models but differ in fee structures and available features.",
    },
    {
      engine: "grok",
      query: "PancakeSwap vs Uniswap",
      mentionDetected: true,
      mentionPosition: 1,
      accuracyScore: 60,
      accuracyIssues: ["Oversimplified comparison"],
      sentiment: "neutral",
      competitorRanking: ["Uniswap", "PancakeSwap"],
      sourceUrls: [],
      rawResponse:
        "Uniswap is king on Ethereum, PancakeSwap rules BNB Chain. If you want lower fees, go PancakeSwap. For more liquidity and pairs, Uniswap.",
    },
    {
      engine: "chatgpt",
      query: "How to swap tokens on BNB Chain cheaply",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 80,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: ["PancakeSwap", "1inch", "Biswap"],
      sourceUrls: [],
      rawResponse:
        "To swap tokens cheaply on BNB Chain, use PancakeSwap. BNB Chain already has low gas fees (typically under $0.10), and PancakeSwap offers competitive swap fees starting at 0.25%. You can also use aggregators like 1inch for the best rates.",
    },
    {
      engine: "perplexity",
      query: "How to swap tokens on BNB Chain cheaply",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 84,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: ["PancakeSwap", "1inch", "ParaSwap"],
      sourceUrls: [],
      rawResponse:
        "The cheapest way to swap tokens on BNB Chain is through PancakeSwap, which charges 0.25% in fees. Gas costs on BNB Chain are minimal, typically under $0.05. For optimal routing, consider using 1inch aggregator which checks multiple DEXs for the best rate.",
    },
    {
      engine: "gemini",
      query: "How to swap tokens on BNB Chain cheaply",
      mentionDetected: false,
      mentionPosition: -1,
      accuracyScore: 65,
      accuracyIssues: ["Does not mention PancakeSwap by name"],
      sentiment: "neutral",
      competitorRanking: ["1inch", "Biswap"],
      sourceUrls: [],
      rawResponse:
        "BNB Chain offers low-cost token swapping. Use a DEX aggregator to find the best rates across multiple decentralized exchanges. Gas fees are typically under $0.10 per transaction.",
    },
    {
      engine: "grok",
      query: "How to swap tokens on BNB Chain cheaply",
      mentionDetected: true,
      mentionPosition: 1,
      accuracyScore: 62,
      accuracyIssues: ["Fee info slightly inaccurate"],
      sentiment: "neutral",
      competitorRanking: ["PancakeSwap"],
      sourceUrls: [],
      rawResponse:
        "BNB Chain is one of the cheapest chains for token swaps. PancakeSwap is the main DEX there. Connect your wallet, pick your tokens, and swap. Fees are very low.",
    },
    {
      engine: "chatgpt",
      query: "Top DeFi protocols 2024",
      mentionDetected: true,
      mentionPosition: 2,
      accuracyScore: 78,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: [
        "Aave",
        "Uniswap",
        "PancakeSwap",
        "Lido",
        "MakerDAO",
      ],
      sourceUrls: [],
      rawResponse:
        "The top DeFi protocols in 2024 include Aave (lending), Uniswap (Ethereum DEX), Lido (liquid staking), MakerDAO (stablecoin), and PancakeSwap (BNB Chain DEX). These protocols collectively manage tens of billions in TVL.",
    },
    {
      engine: "perplexity",
      query: "Top DeFi protocols 2024",
      mentionDetected: true,
      mentionPosition: 3,
      accuracyScore: 82,
      accuracyIssues: [],
      sentiment: "neutral",
      competitorRanking: [
        "Lido",
        "Aave",
        "Uniswap",
        "PancakeSwap",
        "Curve",
      ],
      sourceUrls: ["https://defillama.com"],
      rawResponse:
        "According to DefiLlama, the top DeFi protocols by TVL in 2024 are Lido ($30B+), Aave ($20B+), Uniswap, Curve, and PancakeSwap. PancakeSwap remains the dominant DEX on BNB Chain.",
    },
    {
      engine: "gemini",
      query: "Top DeFi protocols 2024",
      mentionDetected: false,
      mentionPosition: -1,
      accuracyScore: 60,
      accuracyIssues: [
        "Does not mention PancakeSwap",
        "Outdated TVL figures",
      ],
      sentiment: "neutral",
      competitorRanking: [
        "Aave",
        "Uniswap",
        "Lido",
        "MakerDAO",
        "Compound",
      ],
      sourceUrls: [],
      rawResponse:
        "The top DeFi protocols include Aave, Uniswap, Lido, MakerDAO, and Compound. These protocols have proven track records and significant total value locked.",
    },
    {
      engine: "grok",
      query: "Top DeFi protocols 2024",
      mentionDetected: false,
      mentionPosition: -1,
      accuracyScore: 55,
      accuracyIssues: [
        "No mention of PancakeSwap",
        "Very brief list",
      ],
      sentiment: "neutral",
      competitorRanking: ["Aave", "Uniswap", "Lido"],
      sourceUrls: [],
      rawResponse:
        "Top DeFi protocols right now: Aave for lending, Uniswap for swapping, Lido for staking. These are the big three that dominate the space.",
    },
  ],
  suggestions: [
    {
      priority: "high",
      title: "Submit structured data to Gemini and Grok",
      description:
        "Both Gemini and Grok lack updated information about PancakeSwap. Submit structured project data, feature lists, and recent updates to improve AI model knowledge.",
      category: "content",
    },
    {
      priority: "high",
      title: "Publish comparison content on authoritative sites",
      description:
        "Create detailed comparison articles (PancakeSwap vs Uniswap, vs Trader Joe) on medium and high-authority crypto media outlets to improve ranking in comparison queries.",
      category: "authority",
    },
    {
      priority: "medium",
      title: "Update TVL and volume data across documentation",
      description:
        "Multiple AI engines cite outdated TVL figures. Ensure docs.pancakeswap.finance and blog posts contain current, machine-readable metrics.",
      category: "technical",
    },
    {
      priority: "medium",
      title: "Amplify V3 concentrated liquidity messaging",
      description:
        "Grok and some ChatGPT responses miss V3 features. Create educational content specifically about concentrated liquidity positions and deploy across social channels.",
      category: "social",
    },
    {
      priority: "low",
      title: "Add Schema.org structured data to website",
      description:
        "Implement JSON-LD structured data on pancakeswap.finance to help AI engines better parse and reference project information.",
      category: "technical",
    },
    {
      priority: "low",
      title: "Expand multi-chain narrative in content strategy",
      description:
        "Many AI responses only associate PancakeSwap with BNB Chain. Create content highlighting Ethereum, Arbitrum, and other chain deployments.",
      category: "content",
    },
  ],
  reportHash: "0x7a3b...e4f2",
  createdAt: "2024-12-15T10:30:00Z",
};

const fourMemeResult: GEOScanResult = {
  id: "scan-fourmeme-001",
  projectName: "Four.Meme",
  contractAddress: "0x4a846aDe8C8b6B6b8e1067C9C4E8A56F4E1FaC72",
  tokenInfo: {
    name: "Four.Meme Token",
    symbol: "FOUR",
    decimals: 18,
    totalSupply: "1,000,000,000",
    contractAddress: "0x4a846aDe8C8b6B6b8e1067C9C4E8A56F4E1FaC72",
    website: "https://four.meme",
  },
  category: "Meme Launchpad",
  geoScore: {
    total: 42,
    mention: 35,
    accuracy: 40,
    ranking: 30,
    sentiment: 55,
    sources: 48,
    engines: [
      {
        engine: "ChatGPT",
        score: 45,
        mentioned: true,
        sentiment: "neutral",
        keyIssue: "Limited knowledge of platform features",
      },
      {
        engine: "Perplexity",
        score: 52,
        mentioned: true,
        sentiment: "neutral",
        keyIssue: "Only references launch event, not ongoing activity",
      },
      {
        engine: "Gemini",
        score: 30,
        mentioned: false,
        sentiment: "negative",
        keyIssue: "Not recognized as a distinct platform",
      },
      {
        engine: "Grok",
        score: 58,
        mentioned: true,
        sentiment: "positive",
        keyIssue: "Good X/Twitter coverage but lacks technical depth",
      },
    ],
  },
  queries: [
    { query: "What is Four.Meme?", category: "brand" },
    { query: "Best meme coin launchpad on BNB Chain", category: "category" },
    { query: "Four.Meme vs Pump.fun", category: "comparison" },
    { query: "How to launch a meme coin on BSC", category: "scenario" },
    { query: "Top meme launchpads 2024", category: "general" },
  ],
  analyses: [
    {
      engine: "chatgpt",
      query: "What is Four.Meme?",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 50,
      accuracyIssues: [
        "Confuses with other meme platforms",
        "Incomplete feature description",
      ],
      sentiment: "neutral",
      competitorRanking: ["Pump.fun", "Four.Meme"],
      sourceUrls: [],
      rawResponse:
        "Four.Meme is a meme coin launchpad on BNB Chain that allows users to create and launch meme tokens. It's similar to Pump.fun but operates on the Binance Smart Chain ecosystem.",
    },
    {
      engine: "perplexity",
      query: "What is Four.Meme?",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 60,
      accuracyIssues: ["Missing bonding curve details"],
      sentiment: "neutral",
      competitorRanking: ["Pump.fun", "Four.Meme"],
      sourceUrls: ["https://four.meme"],
      rawResponse:
        "Four.Meme is a BNB Chain-based meme coin launchpad that enables anyone to create a meme token with a bonding curve mechanism. It gained traction as a BSC alternative to Solana's Pump.fun.",
    },
    {
      engine: "gemini",
      query: "What is Four.Meme?",
      mentionDetected: false,
      mentionPosition: -1,
      accuracyScore: 20,
      accuracyIssues: [
        "Does not recognize the platform",
        "Returns generic meme coin info",
      ],
      sentiment: "negative",
      competitorRanking: [],
      sourceUrls: [],
      rawResponse:
        "I don't have specific information about 'Four.Meme.' It may be a newer meme coin platform. I'd recommend checking recent cryptocurrency news sources for the latest information.",
    },
    {
      engine: "grok",
      query: "What is Four.Meme?",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 65,
      accuracyIssues: ["Slightly outdated user count"],
      sentiment: "positive",
      competitorRanking: ["Four.Meme", "Pump.fun"],
      sourceUrls: [],
      rawResponse:
        "Four.Meme is a meme coin creation platform on BNB Chain that's been gaining serious traction. It lets anyone launch a meme token with built-in liquidity mechanics. Think of it as BNB Chain's answer to Pump.fun.",
    },
    {
      engine: "chatgpt",
      query: "Best meme coin launchpad on BNB Chain",
      mentionDetected: true,
      mentionPosition: 1,
      accuracyScore: 45,
      accuracyIssues: ["Lists outdated platforms"],
      sentiment: "neutral",
      competitorRanking: ["Pump.fun (Solana)", "Four.Meme", "PinkSale"],
      sourceUrls: [],
      rawResponse:
        "For meme coin launches on BNB Chain, popular options include PinkSale and Four.Meme. Four.Meme has recently emerged as a Pump.fun-style platform specifically for BNB Chain.",
    },
    {
      engine: "perplexity",
      query: "Best meme coin launchpad on BNB Chain",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 58,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: ["Four.Meme", "GemPad", "PinkSale"],
      sourceUrls: ["https://four.meme"],
      rawResponse:
        "Four.Meme has become the leading meme coin launchpad on BNB Chain, processing thousands of token launches. It uses a bonding curve model similar to Pump.fun and has attracted significant trading volume.",
    },
    {
      engine: "gemini",
      query: "Best meme coin launchpad on BNB Chain",
      mentionDetected: false,
      mentionPosition: -1,
      accuracyScore: 30,
      accuracyIssues: [
        "Does not mention Four.Meme",
        "Lists only legacy platforms",
      ],
      sentiment: "neutral",
      competitorRanking: ["PinkSale", "GemPad"],
      sourceUrls: [],
      rawResponse:
        "For launching meme coins on BNB Chain, platforms like PinkSale and GemPad offer token creation and initial offering tools. These platforms provide auditing and marketing support.",
    },
    {
      engine: "grok",
      query: "Best meme coin launchpad on BNB Chain",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 62,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: ["Four.Meme", "PinkSale"],
      sourceUrls: [],
      rawResponse:
        "Four.Meme is currently the hottest meme coin launchpad on BNB Chain. It's basically Pump.fun for BSC and has been generating a lot of buzz on CT (Crypto Twitter).",
    },
    {
      engine: "chatgpt",
      query: "Four.Meme vs Pump.fun",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 48,
      accuracyIssues: ["Missing fee comparison"],
      sentiment: "neutral",
      competitorRanking: ["Pump.fun", "Four.Meme"],
      sourceUrls: [],
      rawResponse:
        "Pump.fun operates on Solana with very fast and cheap token launches. Four.Meme brings a similar concept to BNB Chain. Both use bonding curve mechanics, but Pump.fun has a larger user base and more established track record.",
    },
    {
      engine: "perplexity",
      query: "Four.Meme vs Pump.fun",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 55,
      accuracyIssues: [],
      sentiment: "neutral",
      competitorRanking: ["Pump.fun", "Four.Meme"],
      sourceUrls: [],
      rawResponse:
        "Pump.fun and Four.Meme are competing meme coin launchpads on different chains. Pump.fun dominates Solana while Four.Meme is the BNB Chain equivalent. Key differences include gas costs (BSC is slightly higher) and user base size.",
    },
    {
      engine: "gemini",
      query: "Four.Meme vs Pump.fun",
      mentionDetected: false,
      mentionPosition: -1,
      accuracyScore: 25,
      accuracyIssues: [
        "Only discusses Pump.fun",
        "No mention of Four.Meme",
      ],
      sentiment: "negative",
      competitorRanking: ["Pump.fun"],
      sourceUrls: [],
      rawResponse:
        "Pump.fun is a popular meme coin creation platform on Solana. I don't have detailed information about Four.Meme to provide a comprehensive comparison.",
    },
    {
      engine: "grok",
      query: "Four.Meme vs Pump.fun",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 60,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: ["Four.Meme", "Pump.fun"],
      sourceUrls: [],
      rawResponse:
        "Both are meme coin launchpads. Pump.fun = Solana, Four.Meme = BNB Chain. Four.Meme has been catching up fast. Lower barrier to entry on BSC since gas is cheap. The culture around each is different - Pump.fun is more degen, Four.Meme is growing its own community.",
    },
    {
      engine: "chatgpt",
      query: "How to launch a meme coin on BSC",
      mentionDetected: true,
      mentionPosition: 2,
      accuracyScore: 42,
      accuracyIssues: ["Outdated launch process"],
      sentiment: "neutral",
      competitorRanking: ["PancakeSwap", "Four.Meme"],
      sourceUrls: [],
      rawResponse:
        "To launch a meme coin on BSC: 1) Write a BEP-20 token contract, 2) Deploy on BSC using Remix or Hardhat, 3) Create liquidity on PancakeSwap, or use a launchpad like Four.Meme for a simpler bonding curve approach.",
    },
    {
      engine: "perplexity",
      query: "How to launch a meme coin on BSC",
      mentionDetected: true,
      mentionPosition: 1,
      accuracyScore: 52,
      accuracyIssues: [],
      sentiment: "neutral",
      competitorRanking: ["Four.Meme", "PinkSale"],
      sourceUrls: [],
      rawResponse:
        "The easiest way to launch a meme coin on BSC is through Four.Meme, which handles token creation, bonding curve pricing, and automatic liquidity. Alternatively, you can manually deploy a BEP-20 contract and list on PancakeSwap.",
    },
    {
      engine: "gemini",
      query: "How to launch a meme coin on BSC",
      mentionDetected: false,
      mentionPosition: -1,
      accuracyScore: 35,
      accuracyIssues: [
        "Only mentions manual deployment",
        "No launchpad recommendations",
      ],
      sentiment: "neutral",
      competitorRanking: [],
      sourceUrls: [],
      rawResponse:
        "To launch a meme coin on BSC, you'll need to create a BEP-20 token smart contract, deploy it to the Binance Smart Chain, and then list it on a decentralized exchange by providing initial liquidity.",
    },
    {
      engine: "grok",
      query: "How to launch a meme coin on BSC",
      mentionDetected: true,
      mentionPosition: 0,
      accuracyScore: 58,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: ["Four.Meme"],
      sourceUrls: [],
      rawResponse:
        "Just go to Four.Meme, connect your wallet, upload an image, set a name and ticker, and launch. It's that simple. No coding required. The bonding curve handles pricing and liquidity automatically.",
    },
    {
      engine: "chatgpt",
      query: "Top meme launchpads 2024",
      mentionDetected: true,
      mentionPosition: 2,
      accuracyScore: 45,
      accuracyIssues: ["Incomplete list"],
      sentiment: "neutral",
      competitorRanking: [
        "Pump.fun",
        "BOME",
        "Four.Meme",
      ],
      sourceUrls: [],
      rawResponse:
        "Top meme coin launchpads in 2024 include Pump.fun (Solana), BOME ecosystem, and Four.Meme (BNB Chain). Pump.fun leads with the most token launches and trading volume.",
    },
    {
      engine: "perplexity",
      query: "Top meme launchpads 2024",
      mentionDetected: true,
      mentionPosition: 1,
      accuracyScore: 55,
      accuracyIssues: [],
      sentiment: "neutral",
      competitorRanking: [
        "Pump.fun",
        "Four.Meme",
        "Moonshot",
      ],
      sourceUrls: [],
      rawResponse:
        "The dominant meme launchpads in 2024 are Pump.fun (Solana) and Four.Meme (BNB Chain). Both use bonding curve mechanics for fair token launches. Moonshot has also gained traction as a mobile-first platform.",
    },
    {
      engine: "gemini",
      query: "Top meme launchpads 2024",
      mentionDetected: false,
      mentionPosition: -1,
      accuracyScore: 28,
      accuracyIssues: [
        "Only mentions Pump.fun",
        "Missing Four.Meme entirely",
      ],
      sentiment: "neutral",
      competitorRanking: ["Pump.fun"],
      sourceUrls: [],
      rawResponse:
        "Pump.fun on Solana has been the most notable meme coin launchpad in 2024, enabling rapid creation and trading of meme tokens through bonding curves.",
    },
    {
      engine: "grok",
      query: "Top meme launchpads 2024",
      mentionDetected: true,
      mentionPosition: 1,
      accuracyScore: 58,
      accuracyIssues: [],
      sentiment: "positive",
      competitorRanking: [
        "Pump.fun",
        "Four.Meme",
      ],
      sourceUrls: [],
      rawResponse:
        "Pump.fun is #1 on Solana, Four.Meme is the rising star on BNB Chain. Both have created a whole new meta in crypto - fair launch meme coins with bonding curves. Four.Meme is growing fast and could challenge Pump.fun's dominance.",
    },
  ],
  suggestions: [
    {
      priority: "high",
      title: "Establish presence in Gemini's knowledge base",
      description:
        "Gemini has zero recognition of Four.Meme. Submit platform documentation, create Wikipedia-style content, and publish on high-authority domains to build AI model awareness.",
      category: "content",
    },
    {
      priority: "high",
      title: "Create comprehensive comparison content",
      description:
        "Publish detailed Four.Meme vs Pump.fun comparisons on crypto media outlets. Include metrics, features, and user experience differences to dominate comparison queries.",
      category: "authority",
    },
    {
      priority: "high",
      title: "Build technical documentation portal",
      description:
        "Create detailed developer and user documentation at docs.four.meme with API references, tutorials, and guides. This helps AI engines extract accurate technical information.",
      category: "technical",
    },
    {
      priority: "medium",
      title: "Amplify X/Twitter presence for Grok coverage",
      description:
        "Grok shows the best sentiment due to X/Twitter data. Double down on Twitter Spaces, threads, and community engagement to strengthen this advantage.",
      category: "social",
    },
    {
      priority: "medium",
      title: "Publish launch statistics and metrics",
      description:
        "Make platform metrics (total launches, volume, users) publicly available and machine-readable. This addresses accuracy issues where AI engines lack concrete data.",
      category: "technical",
    },
    {
      priority: "low",
      title: "Partner with BNB Chain ecosystem projects",
      description:
        "Co-marketing with PancakeSwap, BNB Chain official channels, and other BSC projects will increase cross-references in AI training data.",
      category: "authority",
    },
  ],
  reportHash: "0x3c9a...b7d1",
  createdAt: "2024-12-15T14:00:00Z",
};

export const MOCK_RESULTS: Record<string, GEOScanResult> = {
  pancakeswap: pancakeSwapResult,
  fourmeme: fourMemeResult,
};

export function getMockResult(
  projectName?: string,
  contractAddress?: string
): GEOScanResult {
  if (
    contractAddress?.toLowerCase().includes("0e09") ||
    projectName?.toLowerCase().includes("pancake")
  ) {
    return pancakeSwapResult;
  }
  return fourMemeResult;
}
