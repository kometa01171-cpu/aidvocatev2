import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "ai-advocate-secret-key-change-in-production"
)

export interface UserPayload {
  id: number
  email: string
  full_name: string
  role: "lawyer" | "citizen"
  phone: string
  specialization?: string | null
  license_number?: string | null
  experience_years?: number | null
  office_address?: string | null
}

export async function createSession(user: UserPayload): Promise<string> {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    phone: user.phone,
    specialization: user.specialization,
    license_number: user.license_number,
    experience_years: user.experience_years,
    office_address: user.office_address,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)

  return token
}

export async function verifySession(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as UserPayload
  } catch {
    return null
  }
}

export async function getSession(): Promise<UserPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value
  if (!token) return null
  return verifySession(token)
}
