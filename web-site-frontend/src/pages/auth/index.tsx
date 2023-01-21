import { Navigate, Outlet } from 'react-router-dom'

import { useSession } from '../../context/SessionContext'

export default function AuthGuard() {
  const { session } = useSession()

  if (session) return <Navigate to='/' replace />

  return <Outlet />
}
