import { useLoaderData, useNavigate } from 'react-router-dom'

import NoteModal from './NoteModal'
import { Note } from '../types/notes.types'

export default function EditNote() {
  const note = useLoaderData() as Note
  const navigate = useNavigate()
  const goBack = () => navigate('..')
  const handleClose = () => {
    goBack()
  }
  return (
    <NoteModal open={true} onClose={console.log} onSubmit={console.log} initialValues={note}>
      <h1>Edit Note</h1>
    </NoteModal>
  )
}
