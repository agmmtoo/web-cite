import { useEffect, useRef, useState } from 'react'
import './TiltCard.css'

export default function TiltCard({ children }) {
  const ref = useRef<HTMLDivElement>(null)
  const [point, setPoint] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // https://stackoverflow.com/a/10109204/12632314
    const rect = e.currentTarget.getBoundingClientRect()
    // setPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    // const x = e.clientX - rect.left
    // const y = e.clientY - rect.top
    const x = (100 / rect.width) * (e.clientX - rect.left)
    const y = (100 / rect.height) * (e.clientY - rect.top)
    setPoint({ x, y })
    // ref.current.style.setProperty('--mouse-x', x + 'deg')
    // ref.current.style.setProperty('--mouse-y', y + 'deg')

    // TODO: extract into hook
  }

  useEffect(() => {
    if (ref.current) {
    }
  }, [])
  return (
    <div ref={ref} onMouseMove={handleMouseMove} className='h-full'>
      <div>
        x: {point.x} y: {point.y}
      </div>
      <div className='tilt h-full'>{children}</div>
    </div>
  )
}
