import useSWR from "swr"

export interface User {
  id: number
  full_name: string
  email: string
  phone: string
  role: "lawyer" | "citizen"
  license_number?: string | null
  specialization?: string | null
  experience_years?: number | null
  office_address?: string | null
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  return data.user ?? null
}

export function useUser() {
  const { data: user, error, mutate, isLoading } = useSWR<User | null>("/api/auth/me", fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  })

  async function logout() {
    await fetch("/api/auth/me", { method: "DELETE" })
    mutate(null, false)
  }

  return {
    user: user ?? null,
    isLoading,
    isError: !!error,
    mutate,
    logout,
  }
}
