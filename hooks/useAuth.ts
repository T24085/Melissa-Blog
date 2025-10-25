'use client'

const DISABLED_MESSAGE = 'Firebase auth is disabled for static exports. Deploy to a dynamic host to enable admin features.'

type DisabledUser = {
  email?: string
}

export function useAuth() {
  const signIn = async (_email: string, _password: string) => {
    throw new Error(DISABLED_MESSAGE)
  }

  const signOut = async () => {
    throw new Error(DISABLED_MESSAGE)
  }

  return {
    user: null as DisabledUser | null,
    loading: false,
    signIn,
    signOut,
  }
}


