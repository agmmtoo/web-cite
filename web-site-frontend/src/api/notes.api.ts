import sb from './supabase.api'

export const getNotes = async () => {
  const notes = await sb.from('notes').select()
  return notes
}
