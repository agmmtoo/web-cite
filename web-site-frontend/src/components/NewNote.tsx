import { useNavigate } from 'react-router-dom'

import { useSession } from '../context/SessionContext'
import { createNote } from '../api/notes.api'
import NoteModal from './NoteModal'

export default function NewNote() {
  const navigate = useNavigate()
  const goBack = () => navigate('..')

  // form stuff
  const initialValues = {
    title: '',
    url: '',
    content: '',
  }

  const {
    session: {
      user: { id },
    },
  } = useSession()
  const handleSubmit = async ({ content, title, url }, { setSubmitting }) => {
    setSubmitting(true)
    createNote({
      userId: id,
      content: content,
      title: title,
      url,
    })
      .catch(console.warn)
      .finally(() => setSubmitting(false))
    goBack()
  }

  return (
    <NoteModal open={true} onClose={goBack} onSubmit={handleSubmit} initialValues={initialValues}>
      New Note
    </NoteModal>
  )
}
