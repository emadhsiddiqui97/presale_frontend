import { connection, idlFile, programID } from "@/constants";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@project-serum/anchor";
import { SystemProgram } from "@solana/web3.js";
import { getPresalePDA } from "./helpers";

export const updatePresale = async (
  // presaleInfoPublicKey: string,
  maxTokenAmountPerAddress: number,
  pricePerToken: number,
  softcapAmount: number,
  hardcapAmount: number,
  startTime: number,
  endTime: number,
  wallet: AnchorWallet
) => {
  console.log("start:", startTime);
  console.log("end: ", endTime);
  const provider = new AnchorProvider(connection, wallet, {});
  const program = new Program(idlFile, programID, provider);
  const [presalePDA] = await getPresalePDA();
  try {
    const transaction = await program.methods
      .updatePresale(
        new anchor.BN(maxTokenAmountPerAddress),
        new anchor.BN(pricePerToken),
        new anchor.BN(softcapAmount),
        new anchor.BN(hardcapAmount),
        new anchor.BN(startTime),
        new anchor.BN(endTime)
      )
      .accounts({
        presaleInfo: presalePDA,
        authority: wallet.publicKey.toBase58(),
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    console.log(
      "claim Test successful: ",
      `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
    );
  } catch (error: any) {
    console.error("test faied: ", error.message);
  }
};
