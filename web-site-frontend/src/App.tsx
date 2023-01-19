import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { getNotes } from './api/notes.api'

function App() {
  useEffect(() => {
    getNotes().then((res) => {
      console.log(res)
    })
  }, [])
  return (
    <>
      <div></div>
      <Outlet />
    </>
  )
}

export default App
