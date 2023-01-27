import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({ open, onClose, title = '', description = '', children }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog open={open} onClose={onClose}>
        <div className='fixed inset-0 bg-black/10' />
        <div className='fixed inset-0 overflow-y-scroll'>
          <div className='grid min-h-full place-items-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='card my-8 space-y-2 w-11/12 md:w-1/2 transform overflow-hidden shadow bg-slate-100 shadow-green-100'>
                {title && (
                  <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-600'>
                    {title}
                  </Dialog.Title>
                )}
                {description && <Dialog.Description>{description}</Dialog.Description>}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
