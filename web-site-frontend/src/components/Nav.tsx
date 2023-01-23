import { NavLink } from 'react-router-dom'

function Nav() {
  return (
    <nav className='w-full box-border p-2 flex justify-between items-center sticky top-0 border-b backdrop-blur'>
      <div className='font-bold text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-500'>
        <NavLink to='/'>WebCite</NavLink>
      </div>
      <div className='space-x-4'>
        <NavLink to='/me'>Profile</NavLink>
        <NavLink to='/about'>About</NavLink>
      </div>
    </nav>
  )
}

export default Nav
