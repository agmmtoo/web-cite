import { Link, useMatch } from 'react-router-dom'
import TiltCard from './common/TiltCard'
import classNames from '../utils/classNames'

export default function Note({ note }) {
  const isActive = useMatch(`${note.key}`)
  return (
    <Link
      to={`${note.key}`}
      className={classNames(
        'tile card leading-relaxed tracking-wide active:bg-green-100 hover:shadow-md break-words transition',
        isActive ? 'bg-green-100' : '',
        largeContentClassname(note.content)
      )}
    >
      <TiltCard>
        <h4 className='font-medium'>{note.title}</h4>
        <small>{note.url}</small>
        <p className='overflow-hidden'>{largeContent(note.content)}</p>
      </TiltCard>
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
