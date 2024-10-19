import { connection, idlFile, presaleAuthority, programID } from "@/constants";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { getPresalePDA, getUserInfoPDA, getVaultPDA } from "./helpers";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import * as anchor from "@project-serum/anchor";

export const buyToken = async (
  wallet: AnchorWallet,
  tokenAmount: number,
  quoteAmount: number
) => {
  //token amount and quote amount are in lamport. token amount will be cliamed by the user in the claimToken function
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program(idlFile, programID, provider);
  const userInfo = await getUserInfoPDA();
  const [presaleVault] = await getVaultPDA();
  const [presalePDA] = await getPresalePDA();
  //   const presaleVault = new PublicKey(
  //     "H4uzxtotpayuE2a3jpSKc61bDwQ4CU7Hf176MTa7oeD1"
  //   );
  console.log(
    "\npresaleInfo:",
    presalePDA.toBase58(),
    "\npresaleAuthority:",
    presaleAuthority.toBase58(), //use the wallet that created the presale.
    "\nuserInfo:",
    userInfo.toBase58(),
    "\npresaleVault:",
    presaleVault.toBase58(),
    "\nbuyer:",
    wallet.publicKey.toBase58(), // the user that is buying the tokens
    "\nrent:",
    SYSVAR_RENT_PUBKEY.toBase58(),
    "\nsystemProgram:",
    SystemProgram.programId.toBase58(),
    "\ntokenProgram:",
    TOKEN_PROGRAM_ID.toBase58(),
    "\nassociatedTokenProgram:",
    ASSOCIATED_TOKEN_PROGRAM_ID.toBase58()
  );
  try {
    const transaction = await program.methods
      .buyToken(
        new anchor.BN(tokenAmount * LAMPORTS_PER_SOL),
        new anchor.BN(quoteAmount * LAMPORTS_PER_SOL)
      )
      .accounts({
        presaleInfo: presalePDA,
        presaleAuthority: presaleAuthority, //use the wallet that created the presale.
        userInfo: userInfo,
        presaleVault: presaleVault,
        buyer: wallet.publicKey, // the user that is buying the tokens
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .rpc();
    console.log(
      "claim Test successful: ",
      `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
    );
  } catch (error: any) {
    console.error("could not buy tokens: ", error.message);
  }
};
