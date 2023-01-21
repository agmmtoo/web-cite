import { useEffect, useState } from 'react'

import { getNotes } from '../api/notes.api'

import { useSession } from '../context/SessionContext'

function Notes() {
    const {
        session: {
            user: { id },
        },
    } = useSession()
    const [notes, setNotes] = useState([])

    useEffect(() => {
        getNotes(id).then((res) => {
            console.log(res)
            setNotes(res)
        })
    }, [])
    return (
        <ul>
            {notes?.map((note) => (
                <li key={note.id}>
                    {note.key}
                    {note.body}
                </li>
            ))}
        </ul>
    )
}

export default Notes
