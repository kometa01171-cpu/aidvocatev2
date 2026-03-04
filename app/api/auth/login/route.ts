import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { createSession } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json({ error: "Email va parol kiritilishi shart" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    const result = await sql`
      SELECT id, full_name, email, phone, password_hash, role, license_number, specialization, experience_years, office_address
      FROM users WHERE email = ${email}
    `

    if (result.length === 0) {
      return Response.json({ error: "Email yoki parol noto'g'ri" }, { status: 401 })
    }

    const user = result[0]
    const passwordValid = await bcrypt.compare(password, user.password_hash)

    if (!passwordValid) {
      return Response.json({ error: "Email yoki parol noto'g'ri" }, { status: 401 })
    }

    const token = await createSession(user as any)

    const cookieStore = await cookies()
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return Response.json({
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        license_number: user.license_number,
        specialization: user.specialization,
        experience_years: user.experience_years,
        office_address: user.office_address,
      },
    })
  } catch (err: any) {
    console.error("Login error:", err)
    return Response.json({ error: "Server xatosi yuz berdi" }, { status: 500 })
  }
}
