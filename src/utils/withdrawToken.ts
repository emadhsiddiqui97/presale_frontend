import { connection, idlFile, programID } from "@/constants";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { getAdminAta, getPresalePDA, getVaultPDA } from "./helpers";
import * as anchor from "@project-serum/anchor";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  // TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";

export const withdrawToken = async (
  wallet: AnchorWallet,
  amount: number,
  tokenAddress: PublicKey
) => {
  amount = amount * LAMPORTS_PER_SOL;
  const [presalePDA, bump] = await getPresalePDA();
  // const [vaultPDA] = await getVaultPDA();
  const provider = new AnchorProvider(connection, wallet, {});
  const program = new Program(idlFile, programID, provider);
  const presaleAta = await getAssociatedTokenAddress(
    tokenAddress,
    presalePDA,
    true
  );
  const adminAta = await getAdminAta(tokenAddress);
  try {
    const transaction = await program.methods
      .withdrawToken(new anchor.BN(amount), new anchor.BN(bump))
      .accounts({
        mintAccount: tokenAddress,
        adminAssociatedTokenAccount: adminAta,
        presaleAssociatedTokenAccount: presaleAta,
        presaleTokenMintAccount: tokenAddress,
        presaleInfo: presalePDA,
        adminAuthority: wallet.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .rpc();
    console.log(
      "token withdrawn successfully: ",
      `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
    );
  } catch (error: any | unknown) {
    console.error("test faied: ", error.message);
  }
};
