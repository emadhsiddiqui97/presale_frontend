import { connection, idlFile, programID } from "@/constants";
import { AnchorProvider, Program } from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
// import idl from "./idl.json";
// import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { getPresalePDA } from "./helpers";

export async function createPresale(
  tokenMintAddress: PublicKey,
  softcapAmount: number,
  hardcapAmount: number,
  maxTokenAmountPerAddress: number,
  pricePerToken: number,
  startTime: number,
  endTime: number,
  authority: AnchorWallet
) {
  softcapAmount = softcapAmount * LAMPORTS_PER_SOL;
  hardcapAmount = hardcapAmount * LAMPORTS_PER_SOL;
  maxTokenAmountPerAddress = maxTokenAmountPerAddress * LAMPORTS_PER_SOL;
  pricePerToken = pricePerToken * LAMPORTS_PER_SOL;

  // const PRESALE_SEED = "NEW_UNIQUE_PRESALE_SEED";
  // let idlFile: any = idl;
  const provider = new AnchorProvider(connection, authority, {});
  const program = new Program(idlFile, programID, provider);
  // const [newPresaleInfo] = await findProgramAddressSync(
  //   [Buffer.from(PRESALE_SEED)],
  //   program.programId
  // );
  // console.log(newPresaleInfo.toBase58());
  try {
    // Ensure the addresses are PublicKey instances
    // const tokenMintPubkey = new PublicKey(tokenMintAddress);
    // const authorityPubkey = new PublicKey(authority ? authority : globalWallet);
    // const authorityPubkey: PublicKey = authority.publicKey;

    // Convert amounts to anchor.BN if needed
    const softcapBN = new anchor.BN(JSON.stringify(softcapAmount));
    const hardcapBN = new anchor.BN(JSON.stringify(hardcapAmount));
    const maxTokenBN = new anchor.BN(JSON.stringify(maxTokenAmountPerAddress));
    const priceBN = new anchor.BN(JSON.stringify(pricePerToken));

    // Convert startTime and endTime to anchor.BN
    const startTimeBN = new anchor.BN(JSON.stringify(startTime));
    const endTimeBN = new anchor.BN(JSON.stringify(endTime));

    console.log(
      tokenMintAddress.toBase58(),
      "\n",
      softcapBN.toString(),
      "\n",
      hardcapBN.toString(),
      "\n",
      maxTokenBN.toString(),
      "\n",
      priceBN.toString(),
      "\n",
      startTimeBN.toString(),
      "\n",
      endTimeBN.toString(),
      "\n",
      authority.publicKey.toBase58()
    );
    // const newSigner = new Keypair();
    // console.log(provider.wallet);
    // Create presale transaction using Anchor
    const [presalePDA] = await getPresalePDA();
    console.log("presale info: ", presalePDA.toBase58());
    const transaction = await program.methods
      .createPresale(
        tokenMintAddress,
        softcapBN,
        hardcapBN,
        maxTokenBN,
        priceBN,
        startTimeBN,
        endTimeBN
      )
      .accounts({
        presaleInfo: presalePDA,
        authority: authority.publicKey,
        systemProgram: SystemProgram.programId,
      })
      // .transaction()
      // const signature = await provider.sendAndConfirm(transaction)
      // console.log(signature)
      .rpc();
    // toast.success(`Transaction successful: ${transaction}`);
    console.log(
      "Presale created successfully: ",
      `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
    );
  } catch (e: any | unknown) {
    // toast.error(`Error during presale creation: ${e.message}`);
    console.error("Error during presale creation:", e.message);
  }
}
