import { useState, useEffect } from 'react'
import { useSession } from '../context/SessionContext'
import { getUser } from '../api/user.api'

function Profile() {
  const { session } = useSession()
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser(session.user.id).then(setUser)
  }, [session])

  return <div>{user && <small>{user.id}</small>}</div>
}

export default Profile
