"use client";

import { ExternalLink, Award } from "lucide-react";

interface NFTResultProps {
  tokenId: string;
  txHash: string;
  projectName: string;
  score: number;
}

export function NFTResult({
  tokenId,
  txHash,
  projectName,
  score,
}: NFTResultProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
      <div className="flex items-center gap-2 mb-4">
        <Award size={18} className="text-purple-500" />
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          On-Chain NFT Credential
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">NFT Token ID</p>
          <p className="text-sm font-mono font-semibold text-gray-800">
            #{tokenId}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Transaction Hash</p>
          <a
            href={`https://bscscan.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
          >
            {txHash.slice(0, 10)}...{txHash.slice(-8)}
            <ExternalLink size={12} />
          </a>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Project</p>
          <p className="text-sm font-semibold text-gray-800">{projectName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">GEO Score</p>
          <p className="text-sm font-semibold text-gray-800">{score} / 100</p>
        </div>
      </div>
    </div>
  );
}
