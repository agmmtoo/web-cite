import { RealtimePostgresInsertPayload } from '@supabase/supabase-js'
import supabase from './supabase.api'

export const subscribeInsert = (onInsert: {
  (payload: any): void
  (payload: RealtimePostgresInsertPayload<{ [key: string]: any }>): void
}) => {
  return supabase
    .channel('any')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notes' }, onInsert)
    .subscribe()
}
