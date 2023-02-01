import { createClient } from '@supabase/supabase-js'
import { RealtimeClient } from '@supabase/realtime-js'

// config
import { SB_URL, SB_ANON_KEY, SB_REALTIME_URL } from '../constants/supabase.constants'

// Create a single supabase client for interacting with database
const supabase = createClient(SB_URL, SB_ANON_KEY)

export const anonClient = new RealtimeClient(SB_REALTIME_URL, {
  params: {
    apiKey: SB_ANON_KEY,
  },
})

export const getRealtimeClient = (apiKey = SB_ANON_KEY, eventsPerSecond = 10) =>
  new RealtimeClient(SB_REALTIME_URL, {
    params: {
      apiKey,
      eventsPerSecond,
    },
  })

export default supabase
