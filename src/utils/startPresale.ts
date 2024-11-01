import { connection, idlFile, programID } from "@/constants";
import * as anchor from "@project-serum/anchor";
// import { AuthorityType } from "@solana/spl-token";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { getPresalePDA } from "./helpers";

export const startPresale = async (
  startTime: number,
  endTime: number,
  wallet: AnchorWallet
) => {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program(idlFile, programID, provider);
  const [presalePDA] = await getPresalePDA();
  try {
    const transaction = await program.methods
      .startPresale(new anchor.BN(startTime), new anchor.BN(endTime))
      .accounts({
        presaleInfo: presalePDA,
        authority: wallet.publicKey,
      })
      .rpc();
    console.log(
      "Presale: ",
      `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
    );
  } catch (error: any | unknown) {
    console.error("test faied: ", error.message);
  }
};
