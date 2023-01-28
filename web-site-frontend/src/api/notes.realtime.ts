import supabase from './supabase.api'

export const subscribeInsert = (onInsert) => {
  return supabase
    .channel('any')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notes' }, onInsert)
    .subscribe()
}
