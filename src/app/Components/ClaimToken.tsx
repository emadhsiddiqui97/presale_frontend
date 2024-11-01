import React, { useState } from "react";
import InputComponent from "./InputComponent";
import Button from "./button";
import { claimToken } from "@/utils/claimToken";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const ClaimToken = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const wallet: any = useAnchorWallet();

  return (
    <div className="max-w-md space-y-4 m-4 p-4">
      <InputComponent
        type="text"
        label="Token Address"
        value={tokenAddress}
        onChange={setTokenAddress}
      />
      <Button
        name="Deposit Token"
        onClick={async () => {
          await claimToken(tokenAddress, wallet);
        }}
      />
    </div>
  );
};

export default ClaimToken;
