import React, { useState } from "react";
import InputComponent from "./InputComponent";
import Button from "./button";
import { depositToken2 } from "@/utils/depositToken2";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { depositToken } from "@/utils/depositTokens";

const DepositToken = () => {
  const [amount, setAmount] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const wallet: any = useAnchorWallet();
  return (
    <div className="space-y-4">
      <InputComponent
        type="text"
        label="Token Address"
        value={tokenAddress}
        onChange={setTokenAddress}
      />
      <InputComponent
        type="text"
        label="Amount"
        value={amount}
        onChange={setAmount}
      />
      <Button
        name="Deposit Token"
        onClick={async () => {
          await depositToken2(tokenAddress, amount, wallet);
        }}
      />
    </div>
  );
};

export default DepositToken;
