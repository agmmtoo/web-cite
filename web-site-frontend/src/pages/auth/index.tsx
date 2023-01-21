import { Navigate, Outlet } from 'react-router-dom'

import { useSession } from '../../context/SessionContext'

export default function AuthGuard() {
  const { section } = useSession()

  if (section) return <Navigate to='/' replace />

  return <Outlet />
}
