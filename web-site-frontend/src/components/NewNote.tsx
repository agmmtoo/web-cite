import { useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSession } from '../context/SessionContext'
import { createNote } from '../api/notes.api'
import NoteModal from './NoteModal'

export default function NewNote() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  useLayoutEffect(() => {
    inputRef.current?.focus()
  }, [])
  const setHeight = () => {
    const elem = inputRef.current
    // IMPROVE: render on every change
    elem.style.height = elem.scrollHeight + 'px'
  }
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
  const handleSubmit = async ({ content, title }, { setSubmitting }) => {
    setSubmitting(true)
    createNote({
      userId: id,
      content: content,
      title: title,
    })
      .then(console.log)
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
