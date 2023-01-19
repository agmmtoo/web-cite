import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { signInWithOtp } from '../../api/auth.api'

export default function Login() {
  return (
    <div className='grid place-items-center w-screen h-screen'>
      <div className='w-4/5 max-w-lg p-8 bg-white rounded shadow-sm focus-within:shadow'>
        {/* <h1 className='text-2xl font-semibold text-center'>Login</h1> */}
        <Formik
          initialValues={{ email: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
          })}
          onSubmit={async ({ email }, { setSubmitting }) => {
            setSubmitting(true)
            const { error } = await signInWithOtp({ email })
            if (error) {
              console.log(error)
            }
            setSubmitting(false)
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col gap-4'>
              <Field type='email' name='email' placeholder='Email' />
              <ErrorMessage name='email' component='div' />
              <button type='submit' disabled={isSubmitting} className='p-2 bg-sky-500'>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
