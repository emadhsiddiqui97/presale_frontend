"use client";
import useIsMounted from "@/utils/useIsMounted";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
// import React, { useState } from "react";
// import { testFunction } from "@/utils/test";
// import { testFunction } from "@/utils/createPresale";
// import { depositToken } from "@/utils/depositTokens";
// import InputComponent from "./InputComponent";
// import { claimTokenTest } from "@/utils/claimtokenTest";
// import { updatePresale } from "@/utils/updatePresale";
// import { claimToken } from "@/utils/claimToken";
// import { PublicKey } from "@solana/web3.js";
// import { startPresale } from "@/utils/startPresale";
// import { programInfoPubKey } from "@/constants";
// import { buyToken } from "@/utils/buyToken";
// import Button from "./button";
// import { createPresale } from "@/utils/createPresale";
// import { getAdminAta, getPresalePDA } from "@/utils/helpers";
// import { withdrawSol } from "@/utils/withdrawSol";
// import { withdrawToken } from "@/utils/withdrawToken";
import TestComponent from "./TestComponent";
import BuyToken from "./BuyToken";
import { adminWallet, tokenAddress } from "@/constants";
import ClaimToken from "./ClaimToken";
import Button from "./button";
import { claimToken } from "@/utils/claimToken";

// ("./InputComponent");
// import InputComponent from "./InputComponent";

const HomePage = () => {
  // const [mintAccount, setMintAccount] = useState("");
  // const [amount, setAmount] = useState("");
  // const [tokenProgramId, settokenProgramId] = useState("");
  const mounted = useIsMounted();
  const wallet: any | AnchorWallet = useAnchorWallet();

  const admin = (wallet: AnchorWallet) => {
    return wallet.publicKey.toBase58() === adminWallet.toBase58() ? (
      <TestComponent />
    ) : (
      <div className="space-y-4">
        <BuyToken />
        {/* <ClaimToken /> */}
        <Button
          name="Claim Token"
          onClick={async () => {
            await claimToken(tokenAddress, wallet);
          }}
        />
      </div>
    );
  };

  const test = () => {
    // console.log(Date.now());
    // testFunction(
    //   "FQMQ2Damu3FfcM439nJ8n2hDmNr1g4DJfTfYBtDPnKJY",
    //   20,
    //   80,
    //   80,
    //   2,
    //   Math.floor(new Date().getTime() + 60),
    //   Math.floor(new Date().getTime() + 1800),
    //   wallet
    // );
    // DSJgN2671b1U5Lt4xatRmW2hgLME4NCmZ27uMRt6Adep;
    // wallet ? depositToken(mintAccount, parseInt(amount), wallet) : "";
    // console.log("Associated account: ", associatedAccount);
    // testFunction("4vG8bJGSbtmkDtLaq2pLzUtAxfh2URfPJJdx7ZehTQLa", wallet);
    // claimTokenTest(wallet, "HwZzAPaUtbaC6jKAqrhoS5DjMeqKbj3vAup6c26BeQqo");
    // updatePresale(
    //   "HwZzAPaUtbaC6jKAqrhoS5DjMeqKbj3vAup6c26BeQqo",
    //   5000000000,
    //   1000000000,
    //   10000000,
    //   500000000000,
    //   new Date().getTime(),
    //   new Date().getTime() + 864000,
    //   wallet
    // );
    // claimToken(tokenAddress, wallet);
    // startPresale(
    //   programInfoPubKey.toBase58(),
    //   new Date().getTime(),
    //   new Date().getTime() + 88640000,
    //   wallet
    // );
    // buyToken(wallet, 1000000000, 2000000000);
  };

  // const tokenAddress: PublicKey | any = new PublicKey(
  //   "2XbxVjY7C6WNbXs8jFynBpCdAxLBXaFExf3ZVDYb1PYW"
  // );
  return (
    <div
      className={`flex min-w-screen justify-center items-center bg-slate-900 ${
        wallet ? "min-h-screen" : ""
      }`}
    >
      <div className="flex flex-col max-w-md space-y-4 m-4 p-4 bg-slate-800 rounded-md">
        {wallet && (
          <>
            {admin(wallet)}
            {/* <TestComponent /> */}
            {/* <BuyToken /> */}
          </>
        )}
        <div className="flex justify-center">
          {mounted && <WalletMultiButton />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// <>

/* <InputComponent
              type="text"
              label="Token Address"
              onChange={setMintAccount}
              value={mintAccount}
            />
            <InputComponent
              type="number"
              label="Amount"
              value={amount}
              onChange={setAmount}
            />
            <button
              // type="submit"
              className={`w-full p-2 text-white  rounded ${
                wallet ? "hover:bg-blue-600 bg-blue-700" : "bg-slate-900"
              }`}
              onClick={test}
              disabled={wallet ? false : true}
            >
              Deposit Token
            </button>
           */

//  </>
