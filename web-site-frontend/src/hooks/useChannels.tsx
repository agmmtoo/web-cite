import { useEffect, useState } from 'react'
// import { RealtimeChannel } from '@supabase/realtime-js'
import { RealtimeChannel } from '@supabase/supabase-js'

// import { subscribeInsert, subscribeDelete, subscribeInsertAnon } from '../api/notes.realtime-lib'
import { subscribeNotes } from '../api/notes.realtime'

export default function useChannels({ onNotesChange }) {
  const [notesChan, setNotesChan] = useState<RealtimeChannel>(null)

  useEffect(() => {
    if (!notesChan) setNotesChan(subscribeNotes(onNotesChange))

    return () => {
      notesChan?.unsubscribe()
      setNotesChan(null)
    }
  }, [])
}
