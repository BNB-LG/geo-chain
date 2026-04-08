// Token info via direct BSC RPC calls (BSCScan V1 deprecated, V2 requires paid plan)
import type { TokenInfo } from "@/types/geo";

const BSC_RPC = process.env.NEXT_PUBLIC_BSC_MAINNET_RPC || "https://bsc-dataseed1.bnbchain.org";

// ERC-20 function selectors
const NAME_SELECTOR = "0x06fdde03";     // name()
const SYMBOL_SELECTOR = "0x95d89b41";   // symbol()
const DECIMALS_SELECTOR = "0x313ce567"; // decimals()
const TOTAL_SUPPLY_SELECTOR = "0x18160ddd"; // totalSupply()

async function ethCall(to: string, data: string): Promise<string> {
  const res = await fetch(BSC_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_call",
      params: [{ to, data }, "latest"],
      id: 1,
    }),
  });
  const json = await res.json();
  return json.result || "0x";
}

function decodeString(hex: string): string {
  if (!hex || hex === "0x" || hex.length < 66) return "";
  try {
    const data = hex.slice(2);
    const offset = parseInt(data.slice(0, 64), 16) * 2;
    const length = parseInt(data.slice(offset, offset + 64), 16);
    if (length === 0 || length > 1000) return "";
    const strHex = data.slice(offset + 64, offset + 64 + length * 2);
    return Buffer.from(strHex, "hex").toString("utf-8");
  } catch {
    return "";
  }
}

function decodeUint(hex: string): string {
  if (!hex || hex === "0x") return "0";
  try {
    return BigInt(hex).toString();
  } catch {
    return "0";
  }
}

export async function getTokenInfo(contractAddress: string): Promise<TokenInfo | null> {
  try {
    // Check if it's actually a contract (not EOA)
    const codeRes = await fetch(BSC_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getCode",
        params: [contractAddress, "latest"],
        id: 1,
      }),
    });
    const codeJson = await codeRes.json();
    if (!codeJson.result || codeJson.result === "0x") {
      return null; // Not a contract
    }

    // Parallel calls for name, symbol, decimals, totalSupply
    const [nameHex, symbolHex, decimalsHex, supplyHex] = await Promise.all([
      ethCall(contractAddress, NAME_SELECTOR),
      ethCall(contractAddress, SYMBOL_SELECTOR),
      ethCall(contractAddress, DECIMALS_SELECTOR),
      ethCall(contractAddress, TOTAL_SUPPLY_SELECTOR),
    ]);

    const name = decodeString(nameHex);
    const symbol = decodeString(symbolHex);
    const decimals = decimalsHex && decimalsHex !== "0x"
      ? parseInt(decimalsHex, 16)
      : 18;

    if (!name && !symbol) {
      return {
        name: "Unknown Contract",
        symbol: "???",
        decimals: 18,
        totalSupply: "0",
        contractAddress,
      };
    }

    return {
      name: name || "Unknown",
      symbol: symbol || "???",
      decimals,
      totalSupply: decodeUint(supplyHex),
      contractAddress,
    };
  } catch (error) {
    console.error("RPC token info error:", error);
    return null;
  }
}

export async function isValidContract(address: string): Promise<boolean> {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) return false;
  try {
    const res = await fetch(BSC_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getCode",
        params: [address, "latest"],
        id: 1,
      }),
    });
    const data = await res.json();
    return data.result && data.result !== "0x";
  } catch {
    return false;
  }
}
