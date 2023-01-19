import { createBrowserRouter } from 'react-router-dom'

import App from './App'
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
        path: 'about',
        element: <About />,
      },
    ],
    errorElement: <NotFound />,
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
