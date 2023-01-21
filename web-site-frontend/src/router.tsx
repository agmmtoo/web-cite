import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import Notes from './pages/Notes'
import Profile from './pages/Profile'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import About from './pages/About'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Notes />,
        index: true,
      },
      {
        path: 'me',
        element: <Profile />,
      }
    ],
    errorElement: <NotFound />,
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
])
