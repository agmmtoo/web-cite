import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

function Nav() {
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const nav = navRef.current
    let lastScrollTop = 0
    const handleScorll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop
      if (st > lastScrollTop) {
        nav?.classList.add('-translate-y-20')
      } else if (st < lastScrollTop) {
        nav?.classList.remove('-translate-y-20')
      }
      lastScrollTop = st <= 0 ? 0 : st
    }
    window.addEventListener('scroll', handleScorll)
    return () => window.removeEventListener('scroll', handleScorll)
  }, [])

  return (
    <nav
      ref={navRef}
      className='p-4 z-10 w-full bg-slate-50/50 transition delay-150 duration-200 box-border flex justify-between items-center sticky top-0 border-b backdrop-blur'
    >
      <div className='font-bold text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-500'>
        <NavLink to='/'>WebCite</NavLink>
      </div>
      <div className='space-x-4 text-sm font-medium'>
        <NavLink to='/me'>Profile</NavLink>
        <NavLink to='/about'>About</NavLink>
      </div>
    </nav>
  )
}

export default Nav
