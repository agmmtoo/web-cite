import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import Notes from './pages/Notes'
import Profile from './pages/Profile'
import Auth from './pages/auth'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import About from './pages/About'
import NotFound from './pages/NotFound'
import NewNote from './components/NewNote'
import EditNote from './components/EditNote'

import { noteLoader } from './helpers/dataLoaders'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Notes />,
        children: [
          {
            path: 'new',
            element: <NewNote />,
          },
          {
            path: ':key',
            element: <EditNote />,
            loader: noteLoader,
          }
        ],
      },
      {
        path: 'me',
        element: <Profile />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: '/auth',
    element: <Auth />,
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
