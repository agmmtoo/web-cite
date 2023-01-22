import { useState, useEffect } from 'react'
import { getProfile } from '../api/user.api'

function Profile() {
  const [user, setUser] = useState({ id: '' })

  useEffect(() => {
    getProfile().then((res) => {
      setUser(res)
    })
  }, [])

  return <div>{user && <small>{user.id}</small>}</div>
}

export default Profile
