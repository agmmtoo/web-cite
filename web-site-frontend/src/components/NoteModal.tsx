import { useRef, useLayoutEffect, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, FormikProps } from 'formik'
import * as Yup from 'yup'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Modal, Input, IconButton } from './common/'
import { Note } from '../types/notes.types'

export default function NoteModal({
  initialValues = {
    title: '',
    url: '',
    content: '',
  },
  open,
  onClose,
  onSubmit,
  children,
  // clicking outside triggers onSubmit?
  submitOnClose = false,
}) {
  // dom refs
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<FormikProps<Note>>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  
  // effect to set the height of the textarea
  useLayoutEffect(() => {
    setHeight()
  }, [])
  const setHeight = () => {
    const elem = inputRef.current
    // IMPROVE: render on every change
    if (elem) elem.style.height = elem.scrollHeight + 'px'
  }

  // close on escape key press
  useLayoutEffect(() => {
    const escapeEvent = ({ key }) => {
      if (key === 'Escape') cancelButtonRef.current.click()
    }
    document.addEventListener('keydown', escapeEvent)
    return () => document.removeEventListener('keydown', escapeEvent)
  }, [])

  // form stuff
  const validationSchema = Yup.object({
    content: Yup.string().required('Required'),
  })

  const navigate = useNavigate()
  const goBack = () => navigate('..')

  return (
    <Modal open={open} onClose={submitOnClose ? () => onSubmit(formRef.current.values) : onClose}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} innerRef={formRef}>
        {({ handleChange }) => (
          <Form className='flex flex-col gap-4'>
            <Field name='title' as={Input} placeholder='Title' />
            <Field name='url' as={Input} placeholder='Source' />
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
              <IconButton type='reset' onClick={goBack} btnRef={cancelButtonRef}>
                <XMarkIcon className='hover:text-red-600' />
              </IconButton>
              {children}
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
