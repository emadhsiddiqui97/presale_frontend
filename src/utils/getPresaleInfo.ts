import { connection, idlFile, programID } from "@/constants";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { getPresalePDA, getUserInfoPDA } from "./helpers";
import * as anchor from "@project-serum/anchor";

export const getPresaleInfo = async (wallet: AnchorWallet) => {
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = new anchor.Program(idlFile, programID, provider);
  const [presalePDA] = await getPresalePDA();
  const userInfo = await getUserInfoPDA(wallet);

  console.log("");
  try {
    const transaction = await program.methods
      .getPresaleInfo()
      .accounts({
        presaleInfo: presalePDA,
        userInfo: userInfo,
      })
      .rpc();
    console.log(
      "Logged data: ",
      `https://explorer.solana.com/tx/${transaction}?cluster=devnet`
    );
  } catch (error: any | unknown) {
    console.error("could not log data: ", error.message);
  }
};
