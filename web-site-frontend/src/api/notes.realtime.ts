import { RealtimePostgresInsertPayload, RealtimePostgresDeletePayload } from '@supabase/supabase-js'
import supabase from './supabase.api'
import { Note } from '../types/notes.types'

export const subscribeInsert = (onInsert: (payload: RealtimePostgresInsertPayload<Note>) => void) => {
  return supabase
    .channel('any')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notes' }, onInsert)
    .subscribe()
}

export const subscribeDelete = (onDelete: (payload: RealtimePostgresDeletePayload<Note>) => void) =>
  supabase
    .channel('any')
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'notes' }, onDelete)
    .subscribe()
