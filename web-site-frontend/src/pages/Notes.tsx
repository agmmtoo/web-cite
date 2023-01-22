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

  return (
    <>
    <button onClick={handleNewNote}>New Note</button>
    <ul>
      {notes?.map((note) => (
        <li key={note.id}>
          {note.key}
          {note.title}
          {note.content}
        </li>
      ))}
    </ul>
    <Outlet />
    </>
  )
}

export default Notes
