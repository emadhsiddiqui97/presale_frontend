"use client";
// import { depositToken } from "@/utils/depositTokens";
// import Image from "next/image";
// import { useEffect, useState } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { endPoint } from "../constants";
import HomePage from "./Components/HomePage";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const phantomWallet: any = new PhantomWalletAdapter();

  return (
    <ConnectionProvider endpoint={endPoint}>
      <WalletProvider wallets={[phantomWallet]}>
        <WalletModalProvider>
          <HomePage />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
