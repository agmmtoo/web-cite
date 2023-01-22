import { useRef, useLayoutEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useSession } from '../context/SessionContext'
import { Modal, Input, IconButton } from './common/'
import { createNote } from '../api/notes.api'

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
    source: '',
    content: '',
  }
  const validationSchema = Yup.object({
    content: Yup.string().required('Required'),
  })

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
    <Modal open={true} onClose={goBack}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ handleChange }) => (
          <Form className='flex flex-col gap-4'>
            <Field name='title' as={Input} placeholder='Title' />
            <Field name='source' as={Input} placeholder='Source' />
            <Field
              name='content'
              as='textarea'
              innerRef={inputRef}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setHeight()
                handleChange(e)
              }}
              className='p-0 border-none focus:ring-0 resize-none bg-inherit'
              placeholder='Type your note here...'
              rows={5}
            />
            <ErrorMessage name='content' component='div' className='text-red-500 font-medium text-sm' />

            <div className='flex gap-2 justify-between items-center'>
              <IconButton type='reset' onClick={goBack}>
                <XMarkIcon className='hover:text-red-600' />
              </IconButton>
              <IconButton type='submit'>
                <CheckIcon className='hover:text-green-600' />
              </IconButton>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
