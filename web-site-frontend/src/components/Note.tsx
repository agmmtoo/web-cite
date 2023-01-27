import { Link, useMatch } from 'react-router-dom'
import classNames from '../utils/classNames'

export default function Note({ note }) {
  const isActive = useMatch(`/${note.key}`)
  return (
    <Link
      to={`${note.key}`}
      className={classNames(
        'overflow-hidden leading-relaxed tracking-wide hover:shadow shadow-green-400 card p-4 break-words transition',
        isActive ? 'shadow' : '',
        // TODO: predicate to determine big note
        note.key % 2 === 0 ? 'md:col-span-2 row-span-2 md:row-span-1' : ''
      )}
    >
      <div>
        <h4 className='font-medium'>{note.title}</h4>
        <small>{note.url}</small>
        <p className='overflow-hidden'>{note.content}</p>
      </div>
    </Link>
  )
}
