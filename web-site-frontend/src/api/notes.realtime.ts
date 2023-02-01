import supabase from './supabase.api'

export const subscribeNotes = (onNotesChanges) =>
  supabase
    .channel('any')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'notes' }, onNotesChanges)
    .subscribe()
