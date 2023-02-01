import { useEffect, useState } from 'react'
import { RealtimeChannel } from '@supabase/supabase-js'

// context
import { useSession } from '../context/SessionContext'
import { useNoteContext } from '../context/NoteContext'

import { subscribeNotes, SubscribeNotesConfig, NotesChangeListener } from '../api/notes.realtime'

export default function useChannels() {
  const [notesChan, setNotesChan] = useState<RealtimeChannel>(null)

  // consume note context
  const { addNote, removeNote, updateNote } = useNoteContext()

  // change handlers
  const onNotesChange: NotesChangeListener = (payload) => {
    switch (payload.eventType) {
      case 'INSERT':
        addNote(payload.new)
        break
      case 'DELETE':
        removeNote(payload.old)
        break
      case 'UPDATE':
        updateNote(payload.new)
        break
    }
  }

  const { session } = useSession()
  const subscribeNotesConfig: SubscribeNotesConfig = {
    key: 'user_id',
    value: session?.user?.id,
  }

  useEffect(() => {
    if (!notesChan) setNotesChan(subscribeNotes(onNotesChange, subscribeNotesConfig))

    return () => {
      notesChan?.unsubscribe()
      setNotesChan(null)
    }
  }, [])
}
