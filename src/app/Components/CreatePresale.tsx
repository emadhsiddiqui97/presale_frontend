import React, { useState } from "react";
import Input from "./InputComponent";
import InputComponent from "./InputComponent";
import Button from "./button";
import { createPresale } from "@/utils/createPresale";
import { PublicKey } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
const CreatePresale = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [softcap, setSoftCap] = useState(0);
  const [hardcap, setHardCap] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [pricePerToken, setPricePerToken] = useState(0);
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
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
        type="number"
        label="softcap"
        value={softcap}
        onChange={setSoftCap}
      />
      <InputComponent
        type="number"
        label="hardcap"
        value={hardcap}
        onChange={setHardCap}
      />
      <InputComponent
        type="number"
        label="max amount"
        value={maxAmount}
        onChange={setMaxAmount}
      />
      <InputComponent
        type="number"
        label="Price per token"
        value={pricePerToken}
        onChange={setPricePerToken}
      />
      <InputComponent
        type="date"
        label="start time"
        value={startDate}
        onChange={setStartDate}
      />
      <InputComponent
        type="date"
        label="end time"
        value={endDate}
        onChange={setEndDate}
      />
      <Button
        name="Create Presale"
        onClick={async () => {
          await createPresale(
            new PublicKey(tokenAddress),
            softcap,
            hardcap,
            maxAmount,
            pricePerToken,
            new Date(startDate).getTime(),
            new Date(endDate).getTime(),
            wallet
          );
          //   console.log(
          //     tokenAddress,
          //     new Date(startDate).getTime(),
          //     new Date(endDate).getTime(),
          //     pricePerToken,
          //     maxAmount,
          //     softcap,
          //     hardcap
          //   );
        }}
      />
    </div>
  );
};

export default CreatePresale;
// 0.0000002,
//             20000,
//             10000,
//             1,
//             new Date().getTime(),
//             new Date().getTime() + 86400000,
