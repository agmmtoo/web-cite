import { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

import { getNotes } from '../api/notes.api'
import { useSession } from '../context/SessionContext'
import { useClipboard } from '../hooks/useClipboard'

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
      console.log(res)
    })
  }, [])

  const { data } = useClipboard()

  // useEffect(() => {
  //   if (data) {
  //     setNotes((notes) => [...notes, { id: data, content: data }])
  //   }
  // }, [data])

  const navigate = useNavigate()
  const handleNewNote = () => {
    navigate('/new')
  }
  const handleNoteClick = (note) => {
    navigate(`/${note.key}`)
  }

  return (
    <div className='p-4'>
      <ul
        className='grid gap-4'
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(20rem, 1fr))', gridAutoRows: 'minmax(5rem, auto)' }}
      >
        <li className='sticky top-14 bg-gray-100 card p-4 break-words cursor-pointer' onClick={handleNewNote}>
          <button onClick={handleNewNote}>New Note</button>
        </li>
        {notes?.map((note) => (
          <li key={note.id} className='card p-4 break-words cursor-pointer' onClick={() => handleNoteClick(note)}>
            {note.key}
            {note.title}
            {note.content}
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  )
}

export default Notes
