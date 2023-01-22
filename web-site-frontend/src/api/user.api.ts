import superbase from './supabase.api'

export const getUser = async (id: string) => {
  const { data, error } = await superbase.from('profiles').select().eq('id', id).single()
  if (error) throw error
  return data
}

export const getProfile = async () => {
  const { data, error } = await superbase.auth.getUser()
  if (error) throw error
  return data.user
}
