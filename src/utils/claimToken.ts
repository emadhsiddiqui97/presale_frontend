import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  getOrCreateAssociatedTokenAccount,
  // TOKEN_2022_PROGRAM_ID,
  // TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Transaction,
  // SendTransactionError,
} from "@solana/web3.js";
import {
  // getAdminAta,
  getPresalePDA,
  getUserInfoPDA,
  getVaultPDA,
} from "./helpers";
import {
  adminKeyPair,
  connection,
  idlFile,
  // presaleAuthority,
  privateKey,
  programID,
  tokenProgramID,
} from "@/constants";
import { AnchorProvider, Program } from "@project-serum/anchor";
// import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

export const claimToken = async (
  tokenAddress: PublicKey,
  wallet: AnchorWallet
) => {
  // const tokenAta = await getAssociatedTokenAddress(
  //   tokenAddress,
  //   wallet.publicKey,
  //   true
  // );
  const [presalePDA, bump] = await getPresalePDA();
  // const tokenAta = await getAdminAta(tokenAddress);
  const tokenAta = await getAssociatedTokenAddress(
    tokenAddress,
    // tokenAddress,
    // presalePDA,
    wallet.publicKey
    // true
  );

  // console.log(tokenAta.toBase58());

  const tokenAtaInstruction = createAssociatedTokenAccountInstruction(
    wallet.publicKey,
    tokenAta,
    presalePDA,
    // tokenAddress,
    tokenAddress
    // TOKEN_PROGRAM_ID,
    // ASSOCIATED_TOKEN_PROGRAM_ID
  );

  // console.log(
  //   "tokenAta: ",
  //   tokenAta.toBase58(),
  //   "\n buyerAta: ",
  //   tokenAtaInstruction,
  //   tokenAtaInstruction.programId.toBase58()
  // );
  //   );
  // const buyerPresaleTokenAta = new PublicKey(
  //   "BcDPzpNmrnsnZZS3VxJripApoymLFSMb5LLwa4gPkBrU"
  // );
  const presalePresaleTokenAta = (
    await getOrCreateAssociatedTokenAccount(
      connection,
      privateKey,
      tokenAddress,
      // presalePDA,
      presalePDA,
      // programID
      true
    )
  ).address;

  // const presalePresaleTokenAta = await getOrCreateAssociatedTokenAccount(tokenAddress, adminKeyPair,presalePDA, true)
  const userInfoPDA = await getUserInfoPDA(wallet);
  // const [presaleVault] = await getVaultPDA();

  const provider = new AnchorProvider(connection, wallet, {});
  const program = new Program(idlFile, programID, provider);

  console.log(
    "\npresaleTokenMintAccount:",
    tokenAddress.toBase58(),
    "\nbuyerPresaleTokenAssociatedTokenAccount:",
    tokenAta.toBase58(),
    // buyerPresaleTokenAta.toBase58(),
    "\npresalePresaleTokenAssociatedTokenAccount:",
    presalePresaleTokenAta.toBase58(),
    "\nuserInfo:",
    userInfoPDA.toBase58(),
    "\npresaleInfo:",
    presalePDA.toBase58(),
    "\npresaleAuthority:",
    wallet.publicKey.toBase58(),
    "\nbuyer:",
    wallet.publicKey.toBase58(),
    "\nrent:",
    SYSVAR_RENT_PUBKEY.toBase58(),
    "\nsystemProgram:",
    SystemProgram.programId.toBase58(),
    "\ntokenProgram:",
    tokenProgramID.toBase58(),
    "\nassociatedTokenProgram:",
    ASSOCIATED_TOKEN_PROGRAM_ID.toBase58(),
    "bump: ",
    bump
  );

  // const bru = new PublicKey("BcDPzpNmrnsnZZS3VxJripApoymLFSMb5LLwa4gPkBrU");
  try {
    const transactionIns = await program.methods
      .claimToken(new anchor.BN(bump))
      .accounts({
        presaleTokenMintAccount: tokenAddress,
        buyerPresaleTokenAssociatedTokenAccount: tokenAta,
        presalePresaleTokenAssociatedTokenAccount: presalePresaleTokenAta,
        userInfo: userInfoPDA,
        presaleInfo: presalePDA,
        presaleAuthority: adminKeyPair.publicKey,
        buyer: wallet.publicKey,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: tokenProgramID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      // .rpc();
      .instruction();
    const transactions = new Transaction().add(
      // tokenAtaInstruction
      transactionIns
      // claimTokenInstruction
    );
    const confirmedTransaction = await provider.sendAndConfirm(transactions);
    console.log(
      "claim Test successful: ",
      // confirmedTransaction
      confirmedTransaction
      // `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
    );
  } catch (error: any | unknown) {
    console.error("Failed to claim Tokens: ", error.message);
    // if (error instanceof SendTransactionError) {
    //   const logs = await error.getLogs(connection);
    //   console.error("Transaction Logs:", logs);
    //   // Further process logs as needed
    // } else {
    //   // Handle other errors as before
    //   console.error("An unknown error occurred:", error.message);
    // }
  }
};
