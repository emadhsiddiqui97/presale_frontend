import {
  commitmentLevel,
  connection,
  programID,
  // systemProgram,
} from "@/constants";
import { AnchorProvider, Idl, Program } from "@project-serum/anchor";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  getAssociatedTokenAddress,
  getMint,
  getOrCreateAssociatedTokenAccount,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import idlFile from "./idl.json";
import * as anchor from "@project-serum/anchor";
import { IdlType } from "@project-serum/anchor/dist/cjs/idl";
import { AnchorWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { getPresalePDA, getVaultPDA } from "./helpers";

// const PRESALE_VAULT = "PRESALE_VAULT";

// async function getTokenMint(token: String) {
//   const tokenAddress: PublicKey = new PublicKey(token);
//   const mint = getMint(connection, tokenAddress);
//   console.log(mint);
// }

// async function getTokenProgramID(tokenAddress: PublicKey) {
//   const tokenProgram = await connection.getAccountInfo(tokenAddress);
//   console.log("Token Program: ", tokenProgram?.owner.toBase58());
//   return tokenProgram?.owner;
// }

// async function getVaultAccount(wallet: PublicKey, tokenAddress: PublicKey) {
//   const accountInfo = await connection.getAccountInfo(tokenAddress);
//   console.log(accountInfo);

//   const vault = await PublicKey.findProgramAddressSync(
//     [Buffer.from(PRESALE_VAULT), wallet.toBuffer()],
//     systemProgram
//   );
//   return vault[0];
// }
// async function getAssociatedtokenProgram(
//   walletAddress: PublicKey,
//   TokenMintAddress: PublicKey
// ) {
//   const associatedTokenProgram = findProgramAddressSync(
//     [walletAddress.toBuffer(), TokenMintAddress.toBuffer()],
//     systemProgram
//   );
//   return associatedTokenProgram[0];
// }

// async function getRent() {
//   const rent = await connection.getMinimumBalanceForRentExemption(107);
//   return anchor.BN(rent);
// }

export const depositToken = async (
  // wallet: PublicKey,
  mintAddress: string,
  amount: number,
  anchorWallet: AnchorWallet
) => {
  /* the Associated token is account is found using the spl-token library. 
  fromAssociatedTokenAccount has the user wallet public as the first argument and the mint address as the second argument. toAssociatedTokenAccount has the mint address as the first argument and the wallet public as the second argument
  */
  let wallet = anchorWallet.publicKey;
  let idl: any = idlFile;
  let mintKey: PublicKey = new PublicKey(mintAddress); //convert the mintAddress to a publicKey
  // let fromAssociatedTokenAccount: PublicKey = await getAssociatedTokenAddress(
  //   wallet,
  //   mintKey
  // );
  // let fromAuthority: PublicKey = wallet;
  // let toAssociatedTokenAccount: PublicKey = await getAssociatedTokenAddress(
  //   mintKey,
  //   wallet
  // );
  // // const presaleVault;
  // let presaleInfo = programID;
  // const tokenProgramId: PublicKey | undefined = await getTokenProgramID(
  //   mintKey
  // );
  // // const tokenProgramId = new PublicKey(
  // //   "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
  // // );
  // let associatedTokenProgram: PublicKey = await getAssociatedtokenProgram(
  //   wallet,
  //   // new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
  //   // new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb")
  //   mintKey
  // );
  // let vaultAccount: PublicKey = await getVaultAccount(wallet, mintKey);
  // let adminAccount = wallet;
  // const rentExemption = await connection.getMinimumBalanceForRentExemption(107);
  // let rent = tokenProgramId;
  const provider = new AnchorProvider(connection, anchorWallet, {});
  const program = new Program(idl, programID, provider);
  // console.log(typeof )

  // let fromAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
  //   connection,
  //   anchorWallet,
  //   wallet,
  //   mintKey,
  //   true,
  //   commitmentLevel,
  //   {},
  //   tokenProgramId,
  //   associatedTokenProgram
  // );
  // let toAssociatedTokenAccount = await getOrCreateAssociatedTokenAccount(
  //   connection,
  //   anchorWallet,
  //   mintKey,
  //   wallet,
  //   mintKey,
  //   true,
  //   commitmentLevel,
  //   {},
  //   tokenProgramId,
  //   associatedTokenProgram
  // );

  // mintKey = new anchor.BN(mintKey);
  // fromAssociatedTokenAccount = new anchor.BN(fromAssociatedTokenAccount);
  // fromAuthority = new anchor.BN(fromAuthority);
  // toAssociatedTokenAccount = new anchor.BN(toAssociatedTokenAccount);
  // vaultAccount = new anchor.BN(vaultAccount);
  // presaleInfo = new anchor.BN(presaleInfo);
  // adminAccount = new anchor.BN(adminAccount);
  // rent = new anchor.BN(rent);
  // let systemProgramid = new anchor.BN(systemProgram);
  // let tokenProgramIdbn = new anchor.BN(tokenProgramId);
  // associatedTokenProgram = new anchor.BN(associatedTokenProgram);
  const walletSigner: any = anchorWallet.publicKey;
  // const walletSigner: any = new PublicKey(
  //   "4axqzGngUCF1wf9Qkhjge7j64TXCDrRK4shtYek8xFQb"
  // ).toBase58();

  const adminAta = (
    await getOrCreateAssociatedTokenAccount(
      connection,
      walletSigner,
      mintKey,
      anchorWallet.publicKey
    )
  ).address;
  const [presalePDA] = await getPresalePDA();
  const toAta = await getAssociatedTokenAddress(mintKey, presalePDA, true);
  const [presaleVault, bump] = await getVaultPDA();

  console.log(
    "mintKey",
    mintKey.toBase58(),
    "\n",
    "from ata",
    adminAta.toBase58(),
    "\n",
    "authority",
    anchorWallet.publicKey.toBase58(),
    "\n",
    "to ata",
    toAta.toBase58(),
    "\n",
    "vault",
    presaleVault.toBase58(),
    "\n",
    "presale info",
    presalePDA.toBase58(),
    "\n",
    "admin account",
    anchorWallet.publicKey.toBase58(),
    "\n",
    "rent",
    anchor.web3.SYSVAR_RENT_PUBKEY.toBase58(),
    // rent.toBase58(),
    "\n",
    "SystemId: ",
    SystemProgram.programId.toBase58(),
    "\n",
    "token program",
    TOKEN_PROGRAM_ID.toBase58(),
    "\n",
    "associated token program",
    ASSOCIATED_TOKEN_PROGRAM_ID.toBase58()
  );

  try {
    const transaction = await program.methods
      .depositToken(new anchor.BN(amount))
      .accounts({
        mintAccount: mintKey.toBase58(),
        fromAssociatedTokenAccount: adminAta,
        fromAuthority: anchorWallet.publicKey,
        toAssociatedTokenAccount: toAta,
        presaleVault: presaleVault,
        presaleInfo: presalePDA,
        admin: anchorWallet.publicKey,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      })
      .rpc();
    console.log(
      "Token deposited successfully: ",
      `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
    );
  } catch (error: any) {
    if (error) console.error("Could not deposit tokens:", error.message);
  }
};
