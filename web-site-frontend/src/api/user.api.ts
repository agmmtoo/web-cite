import superbase from './supabase.api'

export const getUser = async (id: Number) => {
  const { data, error } = await superbase.from('profiles').select().eq('id', id).single()
  if (error) throw error
  return data
}
