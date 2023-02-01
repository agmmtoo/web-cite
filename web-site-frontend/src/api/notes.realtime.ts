import supabase from './supabase.api'

import { RealtimePostgresChangesPayload } from '@supabase/realtime-js'
import { Note } from '../types/notes.types'

export interface SubscribeNotesConfig {
  key: keyof Note
  value: string
}

export type NotesChangeListener = (payload: RealtimePostgresChangesPayload<Note>) => void

export const subscribeNotes = (onNotesChanges: NotesChangeListener, config: SubscribeNotesConfig | null) =>
  supabase
    .channel('any')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'notes',
        ...(config && { filter: `${config.key}=eq.${config.value}` }),
      },
      onNotesChanges
    )
    .subscribe()
