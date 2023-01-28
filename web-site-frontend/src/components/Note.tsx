import { Link, useMatch } from 'react-router-dom'
import classNames from '../utils/classNames'

export default function Note({ note }) {
  const isActive = useMatch(`${note.key}`)
  return (
    <Link
      to={`${note.key}`}
      className={classNames(
        'leading-relaxed tracking-wide active:bg-green-100 hover:bg-green-100 shadow-green-100 card p-4 break-words transition',
        isActive ? 'bg-green-100 shadow-md' : '',
        largeContentClassname(note.content)
      )}
    >
      <div>
        <h4 className='font-medium'>{note.title}</h4>
        <small>{note.url}</small>
        <p className='overflow-hidden'>{largeContent(note.content)}</p>
      </div>
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
