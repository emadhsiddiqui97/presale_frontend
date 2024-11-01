import React from "react";
import Button from "./button";
import { testFunction } from "@/utils/test";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
// import { PublicKey } from "@solana/web3.js";
import { createPresale } from "@/utils/createPresale";
import { depositToken } from "@/utils/depositTokens";
import { buyToken } from "@/utils/buyToken";
import { startPresale } from "@/utils/startPresale";
import { updatePresale } from "@/utils/updatePresale";
import { claimToken } from "@/utils/claimToken";
import { withdrawSol } from "@/utils/withdrawSol";
import { withdrawToken } from "@/utils/withdrawToken";
import { tokenAddress } from "@/constants";
import { getPresaleInfo } from "@/utils/getPresaleInfo";
import CreatePresale from "./CreatePresale";
import DepositToken from "./DepositToken";
import StartPresale from "./StartPresale";

const TestComponent = () => {
  // const tokenAddress:PublicKey = tokenAddress;
  const wallet: any = useAnchorWallet();
  // console.log("token address: ", tokenAddress.toBase58());
  return (
    <div className="space-y-4 m-2">
      <Button
        name="Test"
        onClick={async () => {
          // await testFunction(tokenAddress.toBase58(), wallet);
        }}
      />
      <Button
        name="Log Data"
        onClick={async () => {
          await getPresaleInfo(wallet);
        }}
      />

      {/* <Button
        name="Create Presale"
        onClick={async () => {
          await createPresale(
            tokenAddress,
            0.0000002,
            20000,
            10000,
            1,
            new Date().getTime(),
            new Date().getTime() + 2630016000,
            wallet
          );
        }}
      /> */}
      <CreatePresale />
      {/* <Button
        name="Deposit Token"
        onClick={async () => {
          await depositToken(tokenAddress.toBase58(), 5000, wallet);
        }}
      /> */}
      <DepositToken />
      <Button
        name="Buy Token"
        onClick={async () => {
          await buyToken(wallet, 1);
        }}
      />
      {/* <Button
        name="Start Presale"
        onClick={async () => {
          await startPresale(
            new Date().getTime(),
            new Date().getTime() + 2630016000,
            wallet
          );
        }}
      /> */}
      <StartPresale />
      <Button
        name="Update Presale"
        onClick={async () => {
          await updatePresale(
            10000,
            1,
            0.0000002,
            5000,
            new Date().getTime(),
            // new Date().getTime(),
            // new Date().getTime() + 2630016000,
            1761660603000,
            wallet
          );
        }}
      />
      <Button
        name="End Presale"
        onClick={async () => {
          await updatePresale(
            10000,
            1,
            0.0000002,
            5000,
            new Date().getTime(),
            new Date().getTime(),
            // new Date().getTime() + 2630016000,
            // 1761660603000,
            wallet
          );
        }}
      />
      <Button
        name="Claim Token"
        onClick={async () => {
          await claimToken(JSON.stringify(tokenAddress), wallet);
        }}
      />
      <Button
        name="Withdraw Sol"
        onClick={async () => {
          await withdrawSol(wallet, 4);
        }}
      />
      <Button
        name="Withdraw Token"
        onClick={async () => {
          await withdrawToken(wallet, 4000, tokenAddress);
        }}
      />
    </div>
  );
};

export default TestComponent;
