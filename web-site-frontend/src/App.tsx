import { Outlet, Navigate } from 'react-router-dom'

import { useSession } from './context/SessionContext'

import Nav from './components/Nav'

function App() {
    const { session } = useSession()

    if (!session) return <Navigate to='/auth/login' />
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}

export default App
