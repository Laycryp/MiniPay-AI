'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useWriteContract, useChainId, useSwitchChain } from 'wagmi';
import { celo } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { parseEther } from 'viem';
import { AIPayGoABI } from '@/utils/abi';
import { useAutoConnect } from '@/hooks/useAutoConnect';

const CONTRACT_ADDRESS = '0xc9d59728B0dA3a3c4C3a6C6925e49ACeAe4297e5';

export default function Home() {
  useAutoConnect();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { writeContract, isPending } = useWriteContract();
  
  const [prompt, setPrompt] = useState('');

  // التحقق مما إذا كانت المحفظة على شبكة غير Celo
  const isWrongNetwork = chainId !== celo.id;

  const handleAction = () => {
    // إذا كانت الشبكة خاطئة، نطلب من المحفظة التبديل إلى سيلو أولاً
    if (isWrongNetwork) {
      switchChain({ chainId: celo.id });
      return;
    }

    if (!prompt.trim()) return alert('Please enter a prompt first.');
    
    // تمرير chainId بشكل صريح لتفادي أي أخطاء من المحفظة أثناء الدفع
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: AIPayGoABI,
      functionName: 'requestAI',
      args: [prompt],
      value: parseEther('0.001'),
      chainId: celo.id, 
    });
  };

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900">AI MiniPay Agent</h1>
        
        {!isConnected ? (
          <button 
            onClick={() => connect({ connector: injected() })}
            className="w-full bg-black text-white font-semibold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 text-green-700 rounded-xl text-xs break-all border border-green-200">
              Connected: {address}
            </div>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask the AI something..."
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-32 text-gray-900"
            />
            
            <button 
              onClick={handleAction}
              disabled={isPending && !isWrongNetwork}
              className={`w-full text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 ${
                isWrongNetwork ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isWrongNetwork 
                ? 'Switch to Celo Network' 
                : isPending 
                ? 'Processing...' 
                : 'Pay 0.001 CELO & Request'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}