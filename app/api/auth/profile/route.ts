import { neon } from "@neondatabase/serverless"
import { getSession, createSession } from "@/lib/auth"
import { cookies } from "next/headers"

export async function PUT(request: Request) {
  try {
    const session = await getSession()
    if (!session) {
      return Response.json({ error: "Avtorizatsiya talab qilinadi" }, { status: 401 })
    }

    const body = await request.json()
    const { full_name, phone, specialization, license_number, experience_years, office_address } = body

    const sql = neon(process.env.DATABASE_URL!)

    const result = await sql`
      UPDATE users SET
        full_name = COALESCE(${full_name || null}, full_name),
        phone = COALESCE(${phone || null}, phone),
        specialization = COALESCE(${specialization || null}, specialization),
        license_number = COALESCE(${license_number || null}, license_number),
        experience_years = COALESCE(${experience_years ? Number(experience_years) : null}, experience_years),
        office_address = COALESCE(${office_address || null}, office_address),
        updated_at = NOW()
      WHERE id = ${session.id}
      RETURNING id, full_name, email, phone, role, license_number, specialization, experience_years, office_address
    `

    if (result.length === 0) {
      return Response.json({ error: "Foydalanuvchi topilmadi" }, { status: 404 })
    }

    const user = result[0]
    const token = await createSession(user as any)

    const cookieStore = await cookies()
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return Response.json({ user })
  } catch (err: any) {
    console.error("Profile update error:", err)
    return Response.json({ error: "Server xatosi yuz berdi" }, { status: 500 })
  }
}
