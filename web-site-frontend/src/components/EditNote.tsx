import { useLoaderData, useNavigate } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'
import { IconButton } from './common'

import NoteModal from './NoteModal'

import { updateNote, deleteNote } from '../api/notes.api'

import { Note } from '../types/notes.types'

export default function EditNote() {
  const note = useLoaderData() as Note
  const navigate = useNavigate()
  const goBack = () => navigate('..')

  // save form on close
  // underlying NoteModal will handle if values changed or not
  const handleClose = (note: Note) => {
    updateNote({ key: note.key, note }).finally(goBack)
  }

  const onDelete = () => {
    deleteNote(note.key).finally(goBack)
  }

  return (
    <NoteModal open={true} onClose={handleClose} onSubmit={handleClose} initialValues={note} submitOnClose={true}>
      <IconButton type='button' onClick={onDelete}>
        <TrashIcon className='hover:text-red-600' />
      </IconButton>
    </NoteModal>
  )
}
