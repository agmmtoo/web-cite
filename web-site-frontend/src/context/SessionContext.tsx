import { createContext, useContext, useState, useEffect } from 'react'

import supabase from '../api/supabase.api'
import { getSession } from '../api/auth.api'

import useLocalStorage from '../hooks/useLocalStorage'
import { SB_LOCAL_STORAGE_KEY } from '../constants/supabase.constants'

import { Session } from '@supabase/supabase-js'

interface SessionContext {
  session: Session | null
  setSession: (session: Session | null) => void
}

export const SessionContext = createContext<SessionContext>({
  session: null,
  setSession: () => {},
})

export const useSession = () => useContext(SessionContext)

export default function SessionProvider({ children }: { children: React.ReactNode }) {
  const [storedSession, _] = useLocalStorage<Session>(SB_LOCAL_STORAGE_KEY, null)
  const [session, setSession] = useState<Session | null>(storedSession)

  useEffect(() => {
    getSession().then((session) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>
}
