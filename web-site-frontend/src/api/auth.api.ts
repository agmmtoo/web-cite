import supabase from './supabase.api'

type params = {
    email: string,
    options?: any,
}

export async function signInWithOtp({ email, options }: params) {
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options,
    })

    return { data, error }
}

export async function getSession() {
    const session = await supabase.auth.getSession()

    if (session.error) throw session.error

    return session.data.session
}