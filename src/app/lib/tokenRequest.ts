import { supabase } from './supabase';

export interface TokenRequest {
  id?: number;
  token_id: number;
  requester_address: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}

export async function requestTokens(tokenId: number, requesterAddress: string): Promise<TokenRequest | null> {
  try {
    const { data, error } = await supabase
      .from('token_requests')
      .insert([
        {
          token_id: tokenId,
          requester_address: requesterAddress,
          status: 'pending'
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error requesting tokens:', error);
    return null;
  }
}

export async function getTokenRequests(tokenId: number): Promise<TokenRequest[]> {
  try {
    const { data, error } = await supabase
      .from('token_requests')
      .select('*')
      .eq('token_id', tokenId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching token requests:', error);
    return [];
  }
}