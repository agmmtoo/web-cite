import { Children, cloneElement } from 'react'

export default function IconButton({ children, onClick=null, className='', ...props }) {
  return (
    <button className='bg-inherit focus:outline-none' onClick={onClick} {...props}>
      {Children.map(children, (child) =>
        cloneElement(child, {
          className: `w-6 ${child.props.className}`,
        })
      )}
    </button>
  )
}
