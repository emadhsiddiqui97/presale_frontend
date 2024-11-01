import {
  // commitmentLevel,
  connection,
  privateKey,
  programID,
  // systemProgram,
} from "@/constants";
import { AnchorProvider, Idl, Program } from "@project-serum/anchor";
// import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  getAssociatedTokenAddress,
  // getMint,
  getOrCreateAssociatedTokenAccount,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  // TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import {
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
} from "@solana/web3.js";
import idlFile from "./idl.json";
import * as anchor from "@project-serum/anchor";
// import { IdlType } from "@project-serum/anchor/dist/cjs/idl";
import { AnchorWallet } from "@solana/wallet-adapter-react";
// import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { getPresalePDA, getVaultPDA } from "./helpers";
import { createAta } from "./createAta";

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

export const depositToken2 = async (
  // wallet: PublicKey,
  mintAddress: string,
  amount: number,
  anchorWallet: AnchorWallet
) => {
  /* the Associated token is account is found using the spl-token library. 
  fromAssociatedTokenAccount has the user wallet public as the first argument and the mint address as the second argument. toAssociatedTokenAccount has the mint address as the first argument and the wallet public as the second argument
  */
  // let wallet = anchorWallet.publicKey;
  const idl: any | unknown = idlFile;
  //   const mintKey = new PublicKey("GSeeh73PJNmkAwcdaWpjrN1KcpBNScbk1poRBYzQoBX3");
  const mintKey: PublicKey = new PublicKey(mintAddress); //convert the mintAddress to a publicKey
  amount = amount * LAMPORTS_PER_SOL;

  const provider = new AnchorProvider(connection, anchorWallet, {});
  const program = new Program(idl, programID, provider);

  //   const adminAta = (
  //     await getOrCreateAssociatedTokenAccount(
  //       connection,
  //       privateKey,
  //       mintKey,
  //       privateKey.publicKey
  //     )
  //   ).address;
  const [presalePDA] = await getPresalePDA();
  const toAta = await getAssociatedTokenAddress(mintKey, presalePDA, true);
  const [presaleVault] = await getVaultPDA();
  let transactions = new Transaction();
  const senderAtaInstruction = await createAta(
    mintKey,
    anchorWallet.publicKey,
    anchorWallet.publicKey
  );
  !senderAtaInstruction.init && senderAtaInstruction.instruction !== undefined
    ? transactions.add(senderAtaInstruction.instruction)
    : null;
  const tokenAtaInstruction = await createAta(
    mintKey,
    presalePDA,
    anchorWallet.publicKey
  );
  //   !tokenAtaInstruction.init && tokenAtaInstruction.instruction !== undefined
  //     ? transactions.add(tokenAtaInstruction.instruction)
  //     : null;

  console.log(
    "mintKey",
    mintKey.toBase58(),
    "\n",
    "from ata",
    senderAtaInstruction.address.toBase58(),
    "\n",
    "authority",
    anchorWallet.publicKey.toBase58(),
    "\n",
    "to ata",
    // tokenAtaInstruction.address.toBase58(),
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
  const context = {
    mintAccount: mintKey,
    fromAssociatedTokenAccount: senderAtaInstruction.address,
    fromAuthority: anchorWallet.publicKey,
    toAssociatedTokenAccount: toAta,
    presaleVault: presaleVault,
    presaleInfo: presalePDA,
    admin: anchorWallet.publicKey,
    rent: anchor.web3.SYSVAR_RENT_PUBKEY,
    systemProgram: SystemProgram.programId,
    tokenProgram: TOKEN_PROGRAM_ID,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  };
  console.log(JSON.stringify(context));
  amount = amount * LAMPORTS_PER_SOL;
  try {
    let signedTx;
    let confirmedTx;
    const amountBN = new anchor.BN(JSON.stringify(amount));
    const tx = await program.methods
      .depositToken(amountBN)
      .accounts(context)
      .instruction();
    transactions.add(tx);

    const { blockhash } = await connection.getLatestBlockhash();
    transactions.recentBlockhash = blockhash;
    transactions.feePayer = anchorWallet.publicKey;
    try {
      signedTx = await anchorWallet.signTransaction(transactions);
      console.log(`${transactions.instructions.length} transactions signed`);
    } catch (error: any) {
      console.log("could not sign tx: ", error.message);
    }
    signedTx
      ? (confirmedTx = await connection.sendRawTransaction(
          signedTx.serialize()
        ))
      : null;
    console.log(
      `Tokens deposited: https://explorer.solana.com/tx/${confirmedTx}?cluster=devnet`
    );
  } catch (error: any) {
    if (error.message && error.message.includes("User rejected the request")) {
      console.log("transaction cancelled");
    } else {
      console.error("Failed to deposit tokens: ", error.message);
    }
  }
};
//   try {
//     // const transaction = await program.methods
//     //   .depositToken(new anchor.BN(amount))
//     //   .accounts({
//     //     mintAccount: mintKey,
//     //     fromAssociatedTokenAccount: adminAta,
//     //     fromAuthority: anchorWallet.publicKey,
//     //     toAssociatedTokenAccount: toAta,
//     //     presaleVault: presaleVault,
//     //     presaleInfo: presalePDA,
//     //     admin: anchorWallet.publicKey,
//     //     rent: anchor.web3.SYSVAR_RENT_PUBKEY,
//     //     systemProgram: SystemProgram.programId,
//     //     tokenProgram: TOKEN_PROGRAM_ID,
//     //     associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
//     //   })
//     //   .rpc();
//     console.log(
//       "Token deposited successfully: ",
//       `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
//     );
//   } catch (error: any | unknown) {
//     if (error) console.error("Could not deposit tokens:", error.message);
//   }
