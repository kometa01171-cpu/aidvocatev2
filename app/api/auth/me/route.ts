import { getSession } from "@/lib/auth"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const user = await getSession()
    if (!user) {
      return Response.json({ user: null }, { status: 401 })
    }
    return Response.json({ user })
  } catch {
    return Response.json({ user: null }, { status: 401 })
  }
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  return Response.json({ success: true })
}
