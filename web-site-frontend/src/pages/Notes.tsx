import { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

// api
import { getNotes } from '../api/notes.api'
import { subscribeInsert, subscribeDelete } from '../api/notes.realtime'
// context
import { useSession } from '../context/SessionContext'
import { useNoteContext } from '../context/NoteContext'
// hooks
// import { useClipboard } from '../hooks/useClipboard'
// components
import Note from '../components/Note'

// types
import { RealtimeChannel, RealtimePostgresInsertPayload, RealtimePostgresDeletePayload } from '@supabase/supabase-js'
import { Note as TNote } from '../types/notes.types'

function Notes() {
  // consume session context, get user id
  const {
    session: {
      user: { id },
    },
  } = useSession()

  // consume note context
  const { state: noteState, setNotes, addNote, removeNote } = useNoteContext()

  // realtime channels
  const [insertChan, setInsertChan] = useState<RealtimeChannel>(null)
  const [deleteChan, setDeleteChan] = useState<RealtimeChannel>(null)

  // fetch notes
  useEffect(() => {
    getNotes(id).then((res) => setNotes(res))
  }, [])

  // subscribe to realtime insert events
  useEffect(() => {
    const onInsert = (payload: RealtimePostgresInsertPayload<TNote>) => {
      addNote(payload.new)
    }
    if (!insertChan) {
      setInsertChan(subscribeInsert(onInsert))
    }

    return () => {
      insertChan?.unsubscribe()
    }
  }, [insertChan])

  // ERROR: seems like realtime channel are racing
  // not working whem more than one listener

  // subscribe to realtime delete events
  // useEffect(() => {
  //   const onDelete = (payload: RealtimePostgresDeletePayload<TNote>) => {
  //     removeNote(payload.old)
  //   }

  //   if (!deleteChan) {
  //     setDeleteChan(subscribeDelete(onDelete))
  //   }

  //   return () => {
  //     deleteChan?.unsubscribe()
  //   }
  // }, [])

  return (
    <>
      <ul
        className='p-4 grid gap-8 md:gap-12 grid-flow-row-dense'
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))', gridAutoRows: '20rem' }}
      >
        <Link to='new' className='card'>
          New Note
        </Link>
        {noteState.notes?.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <Outlet />
    </>
  )
}

export default Notes
