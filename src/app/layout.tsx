import type { Metadata } from "next";
import { Providers } from "@/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "MiniPay AI Agent",
  description: "Pay-as-you-go AI services via Celo MiniPay for Proof of Ship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="talentapp:project_verification" content="4bbe66eae2f1f5a048293f07403c7bf28ad9ceeeb4fa208461d43420dac036671b782554706d553288a1b9c74b0cf81a9425fbe4408f75c71de4c2312a61c2cf" />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
