import { SB_URL } from './supabase.constants'

export const BASE_URL = import.meta.env.DEV ? 'https://127.0.0.1:5173' : SB_URL
