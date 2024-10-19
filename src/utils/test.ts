import {
  connection,
  programID,
  // programInfoID,
  // systemProgram,
} from "@/constants";
import { AnchorProvider, Program } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";

import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  getMint,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import {
  AccountInfo,
  PublicKey,
  Keypair,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import idl from "./idl.json";
import { IdlType } from "@project-serum/anchor/dist/cjs/idl";
import {
  TOKEN_PROGRAM_ID,
  createMint,
  //  getAssociatedTokenAddress,
  //  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import {
  //  PublicKey,
  Connection,
  //  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  SystemProgram,
  //  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
//  import anch/or from "@coral-xyz/anchor";
//  import { Program, web3 } from "@coral-xyz/anchor";

export const testFunction = async (
  mintAddress: string,
  // presalePda: any,
  wallet: AnchorWallet
) => {
  const idlFile: any = idl;
  const provider = new AnchorProvider(connection, wallet, {});
  const program = new Program(idlFile, programID, provider);
  // Client

  // import { PalmPresale } from "../target/types/palm_presale";

  // console.log("My address:", pg.wallet.publicKey.toString());
  // const balance = await pg.connection.getBalance(pg.wallet.publicKey);
  // console.log(`My balance: ${balance / web3.LAMPORTS_PER_SOL} SOL`);

  const PRESALE_SEED = "PRESALE_SEED";
  const PRESALE_VAULT = "PRESALE_VAULT";
  const USER_SEED = "USER_SEED";
  // const program = anchor.workspace.PalmPresale as Program<PalmPresale>;
  const PROGRAM_ID = program.programId;
  Keypair;

  console.log(SYSVAR_RENT_PUBKEY.toBase58());

  const adminSecretArray = [
    150, 183, 82, 29, 204, 43, 255, 42, 136, 139, 32, 229, 15, 159, 189, 170,
    94, 196, 234, 81, 228, 79, 124, 40, 62, 93, 165, 81, 133, 12, 124, 17, 213,
    255, 9, 215, 73, 53, 67, 156, 12, 134, 148, 168, 35, 236, 133, 132, 255,
    213, 170, 186, 102, 125, 249, 48, 252, 196, 18, 68, 170, 124, 151, 41,
  ];
  const admin = Keypair.fromSecretKey(Uint8Array.from(adminSecretArray));
  const adminPubkey = admin.publicKey;
  // console.log(adminPubkey.toBase58());

  const getPresalePDA = async () => {
    return await PublicKey.findProgramAddressSync(
      [Buffer.from(PRESALE_SEED)],
      PROGRAM_ID
    );
  };

  // const connection = new Connection(
  //   "https://denny-wuerxw-fast-devnet.helius-rpc.com/",
  //   "confirmed"
  // );

  async function getAdminAta(mintAddress: any, admin: any) {
    let adminAta;
    let adminSgner: any = adminPubkey;
    adminAta = (
      await getOrCreateAssociatedTokenAccount(
        connection,
        adminSgner,
        mintAddress,
        adminPubkey
      )
    ).address;
    return adminAta;
  }

  async function createPresale() {
    const mintAddress: PublicKey = new PublicKey(
      "2XbxVjY7C6WNbXs8jFynBpCdAxLBXaFExf3ZVDYb1PYW"
    );
    const walletAddress: PublicKey = new PublicKey(
      "FQMQ2Damu3FfcM439nJ8n2hDmNr1g4DJfTfYBtDPnKJY"
    );
    const [presalePDA] = await getPresalePDA();
    const to_associatedTokenAddress = await getAssociatedTokenAddress(
      mintAddress,
      presalePDA,
      true
    );
    const getVaultPDA = async () => {
      return await PublicKey.findProgramAddressSync(
        [Buffer.from(PRESALE_VAULT)],
        PROGRAM_ID
      );
    };
    const getUserInfoPDA = async () => {
      return (
        await PublicKey.findProgramAddressSync(
          [Buffer.from(USER_SEED)],
          PROGRAM_ID
        )
      )[0];
    };

    // const getPresalePDA = async () => {
    //   return await PublicKey.findProgramAddressSync(
    //     [Buffer.from(PRESALE_SEED)],
    //     PROGRAM_ID
    //   );
    // };
    const buuer_ata = await getAssociatedTokenAddress(
      mintAddress,
      walletAddress,
      true
    );
    const userinfoaddress = await getUserInfoPDA();
    const [presaleVault, bump] = await getVaultPDA();
    // const presaleInfoPDA = await getPresalePDA();
    const [presalePDA2] = await getPresalePDA();
    const adminAta = await getAdminAta(mintAddress, wallet);

    const presalePresaleTokenAssociatedTokenAccount =
      await getAssociatedTokenAddress(mintAddress, presalePDA, true);

    console.log("to_ata: ", to_associatedTokenAddress.toBase58());
    console.log("adminAta: ", adminAta.toBase58());
    console.log("Vault pda", presaleVault.toBase58());
    console.log("userInfo pda", userinfoaddress.toBase58());
    console.log("vault bump: ", bump);
    console.log("buyer ata: ", buuer_ata.toBase58());
    console.log("presaleInfoPDA: ", presalePDA2.toBase58());
    console.log(
      "presalePresaleTokenAssociatedTokenAccount: ",
      presalePresaleTokenAssociatedTokenAccount.toBase58()
    );
  }

  await createPresale();
};
