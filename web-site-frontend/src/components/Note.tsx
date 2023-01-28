import { Link, useMatch } from 'react-router-dom'

import classNames from '../utils/classNames'
import useTilt from '../hooks/useTilt'

import './Note.css'

export default function Note({ note }) {
  const isActive = useMatch(`${note.key}`)
  // "style" can be used directly
  // but externall class is used in favour of element's cleaness
  const { elemRef, style } = useTilt()
  return (
    <Link
      // style={style}
      ref={elemRef}
      to={`${note.key}`}
      className={classNames(
        'tilt card leading-relaxed tracking-wide active:bg-green-100 hover:border-green-400 hover:shadow-md break-words transition',
        isActive ? 'bg-green-100' : '',
        largeContentClassname(note.content)
      )}
    >
      <h4 className='font-medium'>{note.title}</h4>
      <small>{note.url}</small>
      <p className='overflow-hidden'>{largeContent(note.content)}</p>
    </Link>
  )
}

const largeContentClassname = (text: string): string => {
  const length = text.length
  if (length > 300) {
    return 'md:col-span-2 row-span-2 md:row-span-1'
  }
}

const largeContent = (content: string): string => {
  const length = content.length
  if (length > 300) {
    return content.slice(0, 600) + '...'
  }
  return content
}
