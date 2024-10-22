import { adminKeyPair, connection, privateKey, programID } from "@/constants";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
export const PRESALE_SEED = "PRESALE_SEED";
export const PRESALE_VAULT = "PRESALE_VAULT";
export const USER_SEED = "USER_SEED";

// const progId = new PublicKey("6RdWeathhyGS625o2yAMabLEhyN3WasXfAbR3Hw7CnS9");

export const getPresalePDA = async () => {
  return await PublicKey.findProgramAddressSync(
    [Buffer.from(PRESALE_SEED)],
    programID
    // progId
  );
};

export const getUserInfoPDA = async (wallet: AnchorWallet) => {
  // let walletString: string = wallet.publicKey
  //   .toBase58()
  //   .toString()
  //   .slice(0, 10);
  return (
    await PublicKey.findProgramAddressSync(
      [Buffer.from(USER_SEED), wallet.publicKey.toBuffer()],
      programID
    )
  )[0];
};

export const getVaultPDA = async () => {
  return await PublicKey.findProgramAddressSync(
    [Buffer.from(PRESALE_VAULT)],
    programID
  );
};

export async function getAdminAta(tokenAddress: PublicKey) {
  // let adminAta;
  console.log("private key: ", privateKey);
  // let adminSgner: any = wallet.publicKey;
  const adminAta = (
    await getOrCreateAssociatedTokenAccount(
      connection,
      privateKey,
      tokenAddress,
      adminKeyPair.publicKey
    )
  ).address;
  console.log("adminAta: ", adminAta.toBase58());
  return adminAta;
}
