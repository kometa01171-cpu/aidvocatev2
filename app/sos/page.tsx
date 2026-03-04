"use client"

import { useState, useEffect, useRef, type FormEvent } from "react"
import { ArrowLeft, AlertTriangle, Send, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { useUser } from "@/hooks/use-user"

interface Message {
  id: string
  sender: 'user' | 'sosadmin'
  senderName: string
  content: string
  timestamp: Date
}

export default function SOSPage() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/sos/chat")
        if (!res.ok) throw new Error("Xabarlarni yuklashda xatolik")
        const data = await res.json()
        setMessages(data.messages || [])
        setError("")
      } catch (err) {
        console.error(err)
        setError("SOS xizmatiga ulanishda xatolik. Qayta urinib ko'ring.")
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const handleSend = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || sending || !user) return

    setSending(true)
    try {
      const res = await fetch("/api/sos/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input.trim(),
          userId: user.id,
          userName: user.full_name,
        }),
      })

      if (!res.ok) throw new Error("Xabar yuborish muvaffaqiyatsiz")

      const data = await res.json()
      setMessages(data.messages || [])
      setInput("")
      setError("")

      // Focus back to input
      setTimeout(() => inputRef.current?.focus(), 100)
    } catch (err) {
      console.error(err)
      setError("Xabar yuborishda xatolik yuz berdi")
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend(e as any)
    }
  }

  return (
    <main className="min-h-screen bg-background pt-20 lg:pt-24">
      <Navbar onOpenAuth={() => {}} user={user} onOpenProfile={() => {}} />

      {/* SOS Header */}
      <div className="relative border-b border-border bg-gradient-to-b from-destructive/5 via-transparent to-transparent py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Orqaga qaytish
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                🚨 SOS Favqulotta Yordam
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              24/7 navbatchi yurist bilan to'g'ridan-to'g'ri bog'laning va darhol maslahat oling.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Chat Container */}
          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden flex flex-col h-[600px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
                    <p className="text-muted-foreground">Xabarlar yuklanyapti...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              {!loading && messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <AlertTriangle className="h-12 w-12 text-destructive/50 mx-auto" />
                    <p className="text-muted-foreground">
                      Hozircha xabar yo'q. Birinchi xabaringizni yozing.
                    </p>
                  </div>
                </div>
              )}

              {!loading && messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-destructive text-destructive-foreground"
                  }`}>
                    {msg.senderName.charAt(0).toUpperCase()}
                  </div>
                  <div className={`max-w-xs ${msg.sender === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <p className="text-xs font-semibold text-muted-foreground">
                      {msg.senderName}
                    </p>
                    <p className={`rounded-lg px-4 py-2 text-sm ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground border border-border"
                    }`}>
                      {msg.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString('uz-UZ')}
                    </p>
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Divider */}
            <div className="h-px bg-border" />

            {/* Input */}
            {user ? (
              <form onSubmit={handleSend} className="h-24 p-4 sm:p-5 border-t border-border bg-gradient-to-t from-secondary/20">
                <div className="flex gap-3 h-full">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Xabaringizni yozing..."
                    className="flex-1 bg-background rounded-lg border border-border px-4 py-3 text-sm resize-none focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || sending}
                    className="flex items-center justify-center h-full w-12 rounded-lg bg-destructive text-destructive-foreground transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Yuborish"
                  >
                    {sending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="h-24 p-4 sm:p-5 border-t border-border flex items-center justify-center bg-secondary/20">
                <p className="text-muted-foreground text-sm">
                  SOS xabarlarni yuborish uchun <Link href="/" className="text-primary hover:underline font-semibold">ro'yxatdan o'ting</Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
