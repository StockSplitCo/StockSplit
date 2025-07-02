use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    sysvar::{clock::Clock, Sysvar},
};
use solana_program::{
    pubkey::Pubkey,
    program_pack::{IsInitialized, Pack, Sealed},
};


#[derive(Debug, Default)]
pub struct TokenMarket {
    pub is_initialized: bool,          
    pub token_mint: Pubkey,            
    pub usdt_mint: Pubkey,            
    pub price_per_token: u64,          
    pub authority: Pubkey,             
    pub vault_token_account: Pubkey,  
    pub vault_usdt_account: Pubkey,    
} 

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let instruction = TokenMarketInstruction::unpack(instruction_data)?;

    match instruction {
        TokenMarketInstruction::InitializeMarket { price_per_token } => {
            init_market(program_id, accounts_iter, price_per_token)
        }
        TokenMarketInstruction::BuyTokens { amount } => {
            buy_tokens(program_id, accounts_iter, amount)
        }
    }
}


fn init_market(
    program_id: &Pubkey,
    accounts: &mut std::slice::Iter<AccountInfo>,
    price_per_token: u64,
) -> ProgramResult {
    let market_account = next_account_info(accounts)?;
    let token_mint = next_account_info(accounts)?;
    let usdt_mint = next_account_info(accounts)?;
    let authority = next_account_info(accounts)?;
    let vault_token_account = next_account_info(accounts)?;
    let vault_usdt_account = next_account_info(accounts)?;
    let system_program = next_account_info(accounts)?;
    let token_program = next_account_info(accounts)?;


    if !authority.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    let mut market_data = TokenMarket::unpack_unchecked(&market_account.data.borrow())?;
    market_data.is_initialized = true;
    market_data.token_mint = *token_mint.key;
    market_data.usdt_mint = *usdt_mint.key;
    market_data.price_per_token = price_per_token;
    market_data.authority = *authority.key;
    market_data.vault_token_account = *vault_token_account.key;
    market_data.vault_usdt_account = *vault_usdt_account.key;

    TokenMarket::pack(market_data, &mut market_account.data.borrow_mut())?;

    Ok(())
}


fn buy_tokens(
    program_id: &Pubkey,
    accounts: &mut std::slice::Iter<AccountInfo>,
    amount: u64,
) -> ProgramResult {
    let market_account = next_account_info(accounts)?;
    let buyer = next_account_info(accounts)?;
    let buyer_token_account = next_account_info(accounts)?;
    let buyer_usdt_account = next_account_info(accounts)?;
    let vault_token_account = next_account_info(accounts)?;
    let vault_usdt_account = next_account_info(accounts)?;
    let token_program = next_account_info(accounts)?;

    if !buyer.is_signer {
        return Err(ProgramError::MissingRequiredSignature);
    }

    let market_data = TokenMarket::unpack(&market_account.data.borrow())?;

   
    let total_cost = market_data.price_per_token * amount;

    
    let transfer_usdt_ix = spl_token::instruction::transfer(
        token_program.key,
        buyer_usdt_account.key,
        vault_usdt_account.key,
        buyer.key,
        &[],
        total_cost,
    )?;

    
    let transfer_tokens_ix = spl_token::instruction::transfer(
        token_program.key,
        vault_token_account.key,
        buyer_token_account.key,
        &market_account.key, 
        &[],
        amount,
    )?;

    let tx = Transaction::new_with_payer(&[transfer_usdt_ix, transfer_tokens_ix], Some(buyer.key));
    tx.invoke()?;

    Ok(())
}