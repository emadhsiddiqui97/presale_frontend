import { connection, idlFile, programID } from "@/constants";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { getPresalePDA, getVaultPDA } from "./helpers";
import * as anchor from "@project-serum/anchor";
import { SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const withdrawSol = async (wallet: AnchorWallet, amount: number) => {
  const [presalePDA] = await getPresalePDA();
  const [vaultPDA, bump] = await getVaultPDA();
  const provider = new AnchorProvider(connection, wallet, {});
  const program = new Program(idlFile, programID, provider);
  amount = amount * LAMPORTS_PER_SOL;
  try {
    const transaction = await program.methods
      .withdrawSol(new anchor.BN(amount), new anchor.BN(bump))
      .accounts({
        presaleInfo: presalePDA,
        presaleVault: vaultPDA,
        admin: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    console.log(
      "sol withdrawn successfully: ",
      `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
    );
  } catch (error: any | unknown) {
    console.error("test faied: ", error.message);
  }
};
