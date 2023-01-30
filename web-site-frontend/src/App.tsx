import { Outlet, Navigate } from 'react-router-dom'

import NoteProvider from './context/NoteContext'

import { useSession } from './context/SessionContext'

import Nav from './components/Nav'

function App() {
  const { session } = useSession()

  if (!session) return <Navigate to='/auth/login' />
  return (
    <NoteProvider>
      <Nav />
      <Outlet />
    </NoteProvider>
  )
}

export default App
