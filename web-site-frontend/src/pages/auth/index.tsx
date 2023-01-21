import { Navigate, Outlet } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import { useSession } from '../../context/SessionContext'

export default function AuthGuard() {
  const { section } = useSession()

  if (section) return <Navigate to='/' replace />

  return <Outlet />
}

export { Login, Register }
