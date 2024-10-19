"use client";
import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { buyToken } from "@/utils/buyToken";
import Button from "./button";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

const BuyToken = () => {
  const [tokenAmount, setTokenAmount] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const wallet: any = useAnchorWallet();

  const tokenAddress: PublicKey = new PublicKey(
    "2XbxVjY7C6WNbXs8jFynBpCdAxLBXaFExf3ZVDYb1PYW"
  );

  return (
    <div className="max-w-md space-y-4 m-4 p-4">
      <InputComponent
        type="text"
        label="Token Amount"
        onChange={setTokenAmount}
        value={tokenAmount}
      />
      <InputComponent
        type="number"
        label="Quote Amount"
        value={quoteAmount}
        onChange={setQuoteAmount}
      />
      <Button
        // type="submit"
        //   className={`w-full p-2 text-white  rounded ${
        //     wallet ? "hover:bg-blue-600 bg-blue-700" : "bg-slate-900"
        //   }`}
        name="Buy Tokens"
        onClick={() => {
          buyToken(wallet, parseInt(tokenAmount), parseInt(quoteAmount));
        }}
        //   disabled={wallet ? false : true}
      />
    </div>
  );
};

export default BuyToken;
