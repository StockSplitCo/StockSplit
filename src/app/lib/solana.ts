import {
    Connection,
    clusterApiUrl,
    Keypair,
    SystemProgram,
    Transaction,
    PublicKey,
  } from '@solana/web3.js';
  import {
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    MintLayout,
    createInitializeMintInstruction,
    createAssociatedTokenAccountInstruction,
    getAssociatedTokenAddress,
    createMintToInstruction,
    createTransferInstruction,
    getAccount,
  } from '@solana/spl-token';
  import {
    PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
    createCreateMetadataAccountV3Instruction,
  } from '@metaplex-foundation/mpl-token-metadata';
  import { supabase } from './supabase';

  interface TokenMetadata {
    name: string;
    symbol: string;
    uri: string;
  }
  
  export default async function createToken(
    decimals: number, 
    amount: number,
    metadata: TokenMetadata
  ): Promise<string> {
    const provider = window.solana;
    if (!provider?.isPhantom) {
      throw new Error('Phantom wallet not found');
    }
  
    await provider.connect();
    const wallet = provider.publicKey;
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  
    const mintKeypair = Keypair.generate();
    const mintPubkey = mintKeypair.publicKey;
  
    const lamports = await connection.getMinimumBalanceForRentExemption(MintLayout.span);
  
    const tx = new Transaction();
  
    tx.add(
      SystemProgram.createAccount({
        fromPubkey: wallet,
        newAccountPubkey: mintPubkey,
        space: MintLayout.span,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(
        mintPubkey,
        decimals,
        wallet,      
        null         
      )
    );
  
    const ata = await getAssociatedTokenAddress(
      mintKeypair.publicKey,
      wallet,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
  
    tx.add(
      createAssociatedTokenAccountInstruction(
        wallet,        
        ata,           
        wallet,       
        mintPubkey  
      )
    );

    
    const [metadataAddress] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mintPubkey.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    );

    const metadataInstruction = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataAddress,
        mint: mintPubkey,
        mintAuthority: wallet,
        payer: wallet,
        updateAuthority: wallet,
      },
      {
        createMetadataAccountArgsV3: {
          data: {
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
          },
          isMutable: true,
          collectionDetails: null,
        },
      }
    );

    tx.add(metadataInstruction);
  
    tx.feePayer = wallet;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    tx.partialSign(mintKeypair);
  
    const signedTx = await provider.signTransaction(tx);
    const txid = await connection.sendRawTransaction(signedTx.serialize());
    await connection.confirmTransaction(txid, 'confirmed');
  
    const mintIx = createMintToInstruction(
        mintPubkey,
        ata,
        wallet, 
        amount * Math.pow(10, decimals)
      );
  
      const mintTx = new Transaction().add(mintIx);
      mintTx.feePayer = wallet;
      mintTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      
      const signedMintTx = await provider.signTransaction(mintTx);
      const mintTxId = await connection.sendRawTransaction(signedMintTx.serialize());
      await connection.confirmTransaction(mintTxId, 'confirmed');
      
      console.log('Tokens minted! Tx ID:', mintTxId);

      
      const { error } = await supabase
        .from('tokens')
        .insert([
          {
            token_address: mintPubkey.toBase58(),
            token_name: metadata.name,
            token_symbol: metadata.symbol,
            creator_address: wallet.toBase58(),
          },
        ]);

      if (error) {
        console.error('Error storing token data:', error);
      }
      
    return mintPubkey.toBase58();
  }

  export async function transferTokens(
  tokenAddress: string,
  amount: number,
  decimals: number,
  recipientAddress: PublicKey 
): Promise<boolean> {
  const provider = window.solana;
  if (!provider?.isPhantom) {
    throw new Error('Phantom wallet not found');
  }

  await provider.connect();
  const senderWallet = provider.publicKey;
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  try {
    const mintPubkey = new PublicKey(tokenAddress);
    
    
    const senderAta = await getAssociatedTokenAddress(
      mintPubkey,
      senderWallet,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    console.log(senderAta)
    
    const recipientAta = await getAssociatedTokenAddress(
      mintPubkey,
      recipientAddress, 
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    console.log(recipientAta)
    try {
      await getAccount(connection, recipientAta);
    } catch {
      const createAtaIx = createAssociatedTokenAccountInstruction(
        senderWallet, 
        recipientAta,
        recipientAddress, 
        mintPubkey
      );

      const createAtaTx = new Transaction().add(createAtaIx);
      createAtaTx.feePayer = senderWallet;
      createAtaTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      const signedCreateAtaTx = await provider.signTransaction(createAtaTx);
      const createAtaTxId = await connection.sendRawTransaction(signedCreateAtaTx.serialize());
      await connection.confirmTransaction(createAtaTxId, 'confirmed');
    }

    
    const transferIx = createTransferInstruction(
      senderAta,
      recipientAta,
      senderWallet, 
      amount * Math.pow(10, decimals)
    );

    const transferTx = new Transaction().add(transferIx);
    transferTx.feePayer = senderWallet;
    transferTx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    const signedTransferTx = await provider.signTransaction(transferTx);
    const transferTxId = await connection.sendRawTransaction(signedTransferTx.serialize());
    await connection.confirmTransaction(transferTxId, 'confirmed');

    console.log('Tokens transferred! Tx ID:', transferTxId);
    return true;
  } catch (error) {
    console.error('Error transferring tokens:', error);
    return false;
  }
}