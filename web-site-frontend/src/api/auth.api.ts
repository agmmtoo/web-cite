import supabase from './supabase.api'

type params = {
    email: string,
}

export async function signInWithOtp({ email }: params) {
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
    })

    return { data, error }
}