import { useEffect, useState } from 'react'
import { useNavigate, Outlet, Link } from 'react-router-dom'

import { getNotes } from '../api/notes.api'
import { useSession } from '../context/SessionContext'
import { useClipboard } from '../hooks/useClipboard'
import Note from '../components/Note'

function Notes() {
  const {
    session: {
      user: { id },
    },
  } = useSession()
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes(id).then((res) => {
      setNotes(res)
    })
  }, [])

  const { data } = useClipboard()

  // useEffect(() => {
  //   if (data) {
  //     setNotes((notes) => [...notes, { id: data, content: data }])
  //   }
  // }, [data])

  const navigate = useNavigate()

  return (
    <div className='p-4'>
      <ul
        className='grid gap-4 grid-flow-row-dense'
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))', gridAutoRows: '20rem' }}
      >
          <Link to='new' className='card'>New Note</Link>
        {notes?.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <Outlet />
    </div>
  )
}

export default Notes
