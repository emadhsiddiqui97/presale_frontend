import { connection, idlFile, programID } from "@/constants";
import { AnchorProvider, Program } from "@project-serum/anchor";
// import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export const claimTokenTest = async (
  wallet: AnchorWallet,
  presaleInfo: string
) => {
  const provider = new AnchorProvider(connection, wallet, {});
  const program = new Program(idlFile, programID, provider);
  // const presaleInfopubkey = new PublicKey(presaleInfo);
  //   console.log(presaleInfo, wallet.publicKey.toBase58());
  try {
    const transaction = await program.methods
      .claimTokenTest()
      .accounts({ presaleInfo: presaleInfo })
      .rpc();
    console.log(
      "claim Test successful: ",
      `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
    );
  } catch (error: any) {
    console.error("test faied: ", error.message);
  }
};
