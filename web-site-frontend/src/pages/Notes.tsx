import { useEffect, useState } from 'react'
import { useNavigate, Outlet, Link } from 'react-router-dom'

import { getNotes } from '../api/notes.api'
import { subscribeInsert } from '../api/notes.realtime'
import { useSession } from '../context/SessionContext'
import { useClipboard } from '../hooks/useClipboard'
import Note from '../components/Note'
import supabase from '../api/supabase.api'

function Notes() {
  const {
    session: {
      user: { id },
    },
  } = useSession()
  const [notes, setNotes] = useState([])

  const [insertChan, setInsertChan] = useState(null)

  useEffect(() => {
    getNotes(id).then((res) => {
      setNotes(res)
    })
  }, [])

  useEffect(() => {
    const onInsert = (payload) => {
      setNotes((notes) => [payload.new, ...notes])
    }
    if (!insertChan) {
      setInsertChan(subscribeInsert(onInsert))
    }

    return () => {
      insertChan?.unsubscribe()
    }
  }, [])

  const { data } = useClipboard()

  // useEffect(() => {
  //   if (data) {
  //     setNotes((notes) => [...notes, { id: data, content: data }])
  //   }
  // }, [data])

  const navigate = useNavigate()

  return (
    <>
      <ul
        className='p-4 grid gap-8 md:gap-12 grid-flow-row-dense'
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))', gridAutoRows: '20rem' }}
      >
        <Link to='new' className='card'>
          New Note
        </Link>
        {notes?.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <Outlet />
    </>
  )
}

export default Notes
