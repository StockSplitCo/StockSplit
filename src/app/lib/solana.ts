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
    const provider = (window as any).solana;
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