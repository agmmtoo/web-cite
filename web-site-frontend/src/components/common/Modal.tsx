import { Dialog } from '@headlessui/react'

export default function Modal({ open, onClose, title='', description='', children }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className='fixed inset-0 bg-black/10' />
      <div className='fixed inset-0 overflow-y-scroll'>
        <div className='grid min-h-full place-items-center'>
          <Dialog.Panel className='card space-y-2 w-11/12 md:w-1/2 transform overflow-hidden rounded-2xl shadow p-6 bg-slate-100 shadow-green-100'>
            {title && <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-600'>{title}</Dialog.Title>}
            {description && <Dialog.Description>{description}</Dialog.Description>}
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
