import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { BASE_URL } from '../../constants/base.constants'
import { signInWithOtp } from '../../api/auth.api'

export default function Login() {
  const initialValues = { email: '' }
  const [success, setSuccess] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  })

  const handleSubmit = async ({ email }, { setSubmitting }) => {
    setSubmitting(true)
    const { user } = await signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${BASE_URL}`,
      },
    })
    alert(JSON.stringify(user))
    setSubmitting(false)
    setSuccess(true)
  }

  return (
    <div className='grid place-items-center w-screen h-screen'>
      <div className='w-4/5 max-w-lg p-8 bg-white rounded shadow-sm focus-within:shadow'>
        {success ? (
          <div className='text-green-500 font-medium text-center'>Check your email for a magic link.</div>
        ) : (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className='flex flex-col gap-4'>
                <label htmlFor='email' className='text-gray-700 font-medium'>
                  Send me a magic link.
                </label>
                <Field id='email' type='email' name='email' placeholder='Email' className='input-field' />
                <ErrorMessage name='email' component='div' className='text-red-500 font-medium text-sm' />
                <button type='submit' disabled={isSubmitting} className='btn btn'>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  )
}
