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

export const getNote = async ({ getBy, value, signal }) => {
  const { data, error } = await supabase.from('notes').select().eq(getBy, value).abortSignal(signal).single()
  if (error) throw error
  return data
}

export const getNoteByKey = async (key: string, signal) => await getNote({ getBy: 'key', value: key, signal })
