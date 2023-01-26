import { useLoaderData, useNavigate } from 'react-router-dom'

import NoteModal from './NoteModal'

import { updateNote } from '../api/notes.api'

import { Note } from '../types/notes.types'

export default function EditNote() {
  const note = useLoaderData() as Note
  const navigate = useNavigate()
  const goBack = () => navigate('..')
  const handleClose = (note) => {
    updateNote({ key: note.key, note }).finally(goBack)
  }
  return (
    <NoteModal open={true} onClose={handleClose} onSubmit={handleClose} initialValues={note} submitOnClose={true}>
      <h1>Edit Note</h1>
    </NoteModal>
  )
}
