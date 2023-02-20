import { useLoaderData, useNavigate, Outlet, useMatch, Link } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'
import { IconButton } from './common'

import { Modal } from './common'

import { updateNote, deleteNote } from '../api/notes.api'

import { Note } from '../types/notes.types'
import NoteModal from './NoteModal'

export default function ReadNoe() {
  const note = useLoaderData() as Note
  const navigate = useNavigate()
  const goBack = () => navigate('..')

  const m = useMatch(String(note.key))
  console.log(m)

  // save form on close
  // underlying NoteModal will handle if values changed or not
  const handleClose = (note: Note) => {
    // updateNote({ key: note.key, note }).finally(goBack)
    goBack()
  }

  const onDelete = () => {
    deleteNote(note.key).finally(goBack)
  }

  return (
    <>
      <NoteModal open={true} onSubmit={console.log} onClose={handleClose} initialValues={note} submitOnClose={true}>
        {/* <IconButton type='button' onClick={onDelete}>
        <TrashIcon className='hover:text-red-600' />
      </IconButton> */}
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <Link to='edit'>Edit</Link>
        </div>
        {!m && <Outlet />}
      </NoteModal>
    </>
  )
}
