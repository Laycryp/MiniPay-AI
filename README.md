# MiniPay AI Agent

A frictionless, pay-as-you-go AI interface designed specifically for the Celo MiniPay ecosystem. 

This project eliminates the need for recurring AI subscriptions by allowing users to request AI generations through micro-transactions directly from their mobile wallets. Built for the Celo Proof of Ship builder program.

## Architecture & Tech Stack
* **Frontend:** Next.js 14 (App Router), Tailwind CSS
* **Web3 Integration:** Wagmi v2, Viem (Optimized for injected mobile wallets)
* **AI Engine:** Google Gemini (Serverless API Route)
* **Smart Contract:** Solidity (Deployed and verified on Celo Mainnet)
* **Deployment:** Vercel

## Important Links
* **Live Application:** https://mini-pay-ai.vercel.app/
* **Smart Contract (Celo Mainnet):** [0xc9d59728B0dA3a3c4C3a6C6925e49ACeAe4297e5](https://celoscan.io/address/0xc9d59728B0dA3a3c4C3a6C6925e49ACeAe4297e5)

## Local Development
Clone the repository, ensure you create a `.env.local` file with your `GEMINI_API_KEY`, install dependencies via `npm install`, and start the development server using `npm run dev`. Ensure you are using a browser with a Web3 provider for testing.
