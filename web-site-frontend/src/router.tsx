import { createBrowserRouter } from 'react-router-dom'

import App from './App'
import About from './pages/About'

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
  },
])
