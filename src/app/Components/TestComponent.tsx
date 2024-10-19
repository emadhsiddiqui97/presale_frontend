import React from "react";
import Button from "./button";
import { testFunction } from "@/utils/test";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { createPresale } from "@/utils/createPresale";
import { depositToken } from "@/utils/depositTokens";
import { buyToken } from "@/utils/buyToken";
import { startPresale } from "@/utils/startPresale";
import { updatePresale } from "@/utils/updatePresale";
import { claimToken } from "@/utils/claimToken";
import { withdrawSol } from "@/utils/withdrawSol";
import { withdrawToken } from "@/utils/withdrawToken";

const TestComponent = (tokenAddress: any) => {
  const wallet: any = useAnchorWallet();
  return (
    <div className="space-y-4 m-2">
      <Button
        name="Test"
        onClick={async () => {
          await testFunction(
            "2XbxVjY7C6WNbXs8jFynBpCdAxLBXaFExf3ZVDYb1PYW",
            wallet
          );
        }}
      />
      <Button
        name="Create Presale"
        onClick={async () => {
          await createPresale(
            tokenAddress,
            200,
            20000000000000,
            10000000000000,
            1000000000,
            new Date().getTime(),
            new Date().getTime() + 8640000,
            wallet
          );
        }}
      />
      <Button
        name="Deposit Token"
        onClick={async () => {
          await depositToken(tokenAddress.toBase58(), 3000000000000000, wallet);
        }}
      />
      <Button
        name="Buy Token"
        onClick={async () => {
          await buyToken(wallet, 1000000000, 1000000000);
        }}
      />
      <Button
        name="Start Presale"
        onClick={async () => {
          await startPresale(
            new Date().getTime(),
            new Date().getTime() + 88640000,
            wallet
          );
        }}
      />
      <Button
        name="Update Presale"
        onClick={async () => {
          await updatePresale(
            // "HwZzAPaUtbaC6jKAqrhoS5DjMeqKbj3vAup6c26BeQqo",
            5000000000,
            1000000000,
            10000000,
            500000000000,
            new Date().getTime(),
            1731222192000,
            wallet
          );
        }}
      />
      <Button
        name="Claim Token"
        onClick={async () => {
          await claimToken(tokenAddress, wallet);
        }}
      />
      <Button
        name="Withdraw Sol"
        onClick={async () => {
          await withdrawSol(wallet, 2000000000);
        }}
      />
      <Button
        name="Withdraw Token"
        onClick={async () => {
          await withdrawToken(wallet, 3000000000, tokenAddress);
        }}
      />
    </div>
  );
};

export default TestComponent;
