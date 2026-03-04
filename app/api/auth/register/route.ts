import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { createSession } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { full_name, email, phone, password, role, license_number, specialization, experience_years, office_address, location, avatar } = body

    if (!full_name || !email || !phone || !password || !role) {
      return Response.json({ error: "Barcha maydonlar to'ldirilishi shart" }, { status: 400 })
    }

    if (password.length < 8) {
      return Response.json({ error: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" }, { status: 400 })
    }

    if (!["lawyer", "citizen"].includes(role)) {
      return Response.json({ error: "Noto'g'ri rol tanlandi" }, { status: 400 })
    }

    const sql = neon(process.env.DATABASE_URL!)

    const existing = await sql`SELECT id FROM users WHERE email = ${email}`
    if (existing.length > 0) {
      return Response.json({ error: "Bu email allaqachon ro'yxatdan o'tgan" }, { status: 409 })
    }

    const password_hash = await bcrypt.hash(password, 12)

    const result = await sql`
      INSERT INTO users (full_name, email, phone, password_hash, role, license_number, specialization, experience_years, office_address, location, avatar)
      VALUES (${full_name}, ${email}, ${phone}, ${password_hash}, ${role}, ${license_number || null}, ${specialization || null}, ${experience_years ? Number(experience_years) : null}, ${office_address || null}, ${location || null}, ${avatar || null})
      RETURNING id, full_name, email, phone, role, license_number, specialization, experience_years, office_address, location, avatar
    `

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

    return Response.json({ user: { id: user.id, full_name: user.full_name, email: user.email, phone: user.phone, role: user.role, license_number: user.license_number, specialization: user.specialization, experience_years: user.experience_years, office_address: user.office_address, location: user.location, avatar: user.avatar } })
  } catch (err: any) {
    console.error("Register error:", err)
    return Response.json({ error: "Server xatosi yuz berdi" }, { status: 500 })
  }
}
