import { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

// api
import { getNotes } from '../api/notes.api'

// context
import { useSession } from '../context/SessionContext'
import { useNoteContext } from '../context/NoteContext'
// hooks
import useChannels from '../hooks/useNotesChannels'
// import { useClipboard } from '../hooks/useClipboard'
// components
import Note from '../components/Note'

function Notes() {
  // consume session context, get user id
  const {
    session: {
      user: { id },
    },
  } = useSession()

  // consume note context
  const { state: noteState, setNotes } = useNoteContext()

  // subscribe to realtime updates
  useChannels()

  // fetch notes
  useEffect(() => {
    getNotes(id).then((res) => setNotes(res))
  }, [])

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
