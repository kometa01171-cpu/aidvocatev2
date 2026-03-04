import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Barcha maydonlar to'ldirilishi shart" },
        { status: 400 }
      )
    }

    const sql = neon(process.env.DATABASE_URL!)
    
    // Save contact message to database
    const result = await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
      RETURNING id
    `

    const messageId = result[0].id

    // Send email via Resend if API key is configured
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Send email to admin
        await resend.emails.send({
          from: 'AI Advocate <onboarding@resend.dev>',
          to: 'kometa01171@gmail.com',
          replyTo: email,
          subject: `Yangi xabar: ${name} (#${messageId})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0f172a;">Yangi Xabar Qabul Qilindi</h2>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong style="color: #0f172a;">Yuboruvchi Nomi:</strong> ${escapeHtml(name)}</p>
                <p><strong style="color: #0f172a;">Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                <p><strong style="color: #0f172a;">Xabar ID:</strong> #${messageId}</p>
              </div>

              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                <h3 style="color: #0f172a; margin-top: 0;">Xabar Mazmuni:</h3>
                <p style="color: #475569; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
              </div>

              <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 30px;">
                AI Advocate — O'zbekiston yuridik platforma
              </p>
            </div>
          `,
        })

        console.log(`Email yuborildi: ${email} to kometa01171@gmail.com`)
      } catch (emailError) {
        console.error("Email yuborish xatosi:", emailError)
        // Email yuborilmasligi admin javobini to'slamaydi
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Xabaringiz qabul qilindi! Tez orada siz bilan bog'lanamiz.",
        messageId
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Server xatosi yuz berdi" },
      { status: 500 }
    )
  }
}

// HTML entitylarni escape qilish (XSS oldini olish)
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, char => map[char])
}
