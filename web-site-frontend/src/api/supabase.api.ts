import { createClient } from '@supabase/supabase-js'

// config
import { SB_URL, SB_ANON_KEY } from '../constants/supabase.constants'

// Create a single supabase client for interacting with database
const supabase = createClient(SB_URL, SB_ANON_KEY)

export default supabase
