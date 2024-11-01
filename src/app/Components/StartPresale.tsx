import React, { useState } from "react";
import InputComponent from "./InputComponent";
import Button from "./button";
import { startPresale } from "@/utils/startPresale";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const StartPresale = () => {
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
      <Button
        name="Start Presale"
        onClick={async () => {
          await startPresale(
            new Date().getTime(),
            new Date().getTime() + 86400000,
            wallet
          );
        }}
      />
    </div>
  );
};

export default StartPresale;
