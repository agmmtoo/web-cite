import supabase from './supabase.api'

export const getNotes = async (userId: string) => {
  const { error, data } = await supabase.from('notes').select().eq('user_id', userId)
  if (error) throw error
  return data
}

export const createNote = async ({ userId, title, content }) => {
  const { error, data } = await supabase.from('notes').insert({ user_id: userId, title, content })
  if (error) throw error
  return data
}
