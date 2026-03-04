import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)

    const messages = await sql`
      SELECT 
        id, 
        sender_id, 
        sender_name,
        message as content, 
        created_at as timestamp
      FROM sos_messages
      ORDER BY created_at ASC
    `

    return NextResponse.json({
      messages: messages.map((m: any) => ({
        id: m.id,
        sender: m.sender_id === 'sosadmin' ? 'sosadmin' : 'user',
        senderName: m.sender_name,
        content: m.content,
        timestamp: m.timestamp, // Bu string bo'lib boradi
      })),
    })
  } catch (error) {
    console.error("Error fetching SOS messages:", error)
    return NextResponse.json({ messages: [] })
  }
}

export async function POST(req: Request) {
  try {
    const { message, userId, userName } = await req.json()

    if (!message || !userId || !userName) {
      return NextResponse.json(
        { error: "Barcha maydonlar talab qilinadi" },
        { status: 400 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)

    // Xabarni saqlash
    await sql`
      INSERT INTO sos_messages (sender_id, sender_name, message)
      VALUES (${userId}, ${userName}, ${message})
    `

    // Yangilangan ro'yxatni olish
    const messages = await sql`
      SELECT 
        id, 
        sender_id, 
        sender_name,
        message as content, 
        created_at as timestamp
      FROM sos_messages
      ORDER BY created_at ASC
    `

    return NextResponse.json({
      messages: messages.map((m: any) => ({
        id: m.id,
        sender: m.sender_id === 'sosadmin' ? 'sosadmin' : 'user',
        senderName: m.sender_name,
        content: m.content,
        timestamp: m.timestamp,
      })),
    })
  } catch (error) {
    console.error("Error posting SOS message:", error)
    return NextResponse.json(
      { error: "Xabar yuborishda xatolik" },
      { status: 500 }
    )
  }
}