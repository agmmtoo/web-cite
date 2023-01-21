import sb from './supabase.api'

export const getNotes = async (userId: string) => {
    const { error, data } = await sb.from('notes').select().eq('user_id', userId)
    if (error) throw error
    return data
}
