"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import LawyersCarousel from "@/components/lawyers-carousel"
import {
  X,
  Scale,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Sparkles,
  ChevronDown,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "ai"
  content: string
  timestamp: Date
  lawyerId?: string // highlight lawyer if present
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "ai",
    content:
      "Assalomu alaykum! Men AI Advocate — sizning shaxsiy yuridik yordamchingizman. O'zbekiston qonunchiligi bo'yicha istalgan savolingizni bering.",
    timestamp: new Date(),
  },
]

const AI_RESPONSES: Record<string, string> = {
  ish: "Mehnat kodeksining 236-moddasiga ko'ra, ish haqi oyiga kamida bir marta to'lanishi shart. Ish beruvchi ish haqini kechiktirsa, siz:\n\n1. Ish beruvchiga yozma ariza bering (2 nusxada)\n2. Mehnat inspeksiyasiga shikoyat qiling\n3. Sudga da'vo ariza bering\n\nKechiktirilgan har bir kun uchun 0.1% miqdorida kompensatsiya olish huquqingiz bor (MK 236-modda).\n\nHujjat tayyorlashni xohlaysizmi?",
  nikoh: "Oila kodeksining 38-40-moddalariga ko'ra, nikohni buzish ikki yo'l bilan amalga oshiriladi:\n\n1. FHDYO organlari orqali — ikkala tomon rozi bo'lsa va voyaga yetmagan farzandlar bo'lmasa\n2. Sud orqali — bir tomon rozi bo'lmasa yoki farzandlar bo'lsa\n\nSud nikohni buzishda mol-mulk taqsimoti va farzandlar masalasini ham ko'rib chiqadi.\n\nBatafsil maslahat uchun savolingizni aniqlashtiring.",
  ijara: "Fuqarolik kodeksining 535-557-moddalariga ko'ra, uy-joy ijarasi shartnomasi yozma ravishda tuzilishi kerak. Ijara beruvchi:\n\n1. Shartnoma muddati tugamasdan turib chiqarib yubora olmaydi\n2. Ijarani bir tomonlama oshira olmaydi\n3. Yashash uchun yaroqli sharoit yaratishi shart\n\nAgar shartnoma buzilsa, sud orqali kompensatsiya talab qilishingiz mumkin.",
  mehnat: "Mehnat kodeksining asosiy moddalariga ko'ra, ishchining huquqlari quyidagilar:\n\n1. Belgilangan vaqtda ish haqi olish (MK 154-modda)\n2. Xavfsiz mehnat sharoitlari (MK 211-modda)\n3. Yillik haq to'lanadigan ta'til — kamida 15 ish kuni (MK 134-modda)\n4. Asossiz ishdan bo'shatilmaslik huquqi (MK 100-modda)\n\nQaysi masala bo'yicha batafsil ma'lumot kerak?",
}

function getAIResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes("ish haq") || lower.includes("oylik") || lower.includes("maosh") || lower.includes("ish beruvchi")) return AI_RESPONSES.ish
  if (lower.includes("nikoh") || lower.includes("ajrashish") || lower.includes("oila")) return AI_RESPONSES.nikoh
  if (lower.includes("ijara") || lower.includes("uy-joy") || lower.includes("kvartira") || lower.includes("uy")) return AI_RESPONSES.ijara
  if (lower.includes("mehnat") || lower.includes("ishchi") || lower.includes("ta'til") || lower.includes("ishdan")) return AI_RESPONSES.mehnat
  return "Savolingiz qabul qilindi. Men O'zbekiston qonunchiligi asosida tahlil qilyapman.\n\nIltimos, savolingizni batafsilroq yozing — masalan, qaysi soha (mehnat, oila, uy-joy, jinoyat huquqi) bo'yicha yordam kerak?\n\nMen sizga aniq qonun moddalari va amaliy maslahatlar bera olaman."
}

const QUICK_TOPICS = [
  { label: "Mehnat huquqi", query: "Mehnat huquqi bo'yicha maslahat kerak" },
  { label: "Oila huquqi", query: "Oila huquqi bo'yicha savol bor" },
  { label: "Uy-joy", query: "Uy-joy masalasi bo'yicha yordam kerak" },
  { label: "Ish haqi", query: "Ish haqi muammosi bor" },
]

interface ChatWindowProps {
  isOpen: boolean
  onClose: () => void
  mode?: 'normal' | 'emergency'
}

export function ChatWindow({ isOpen, onClose, mode = 'normal' }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  useEffect(() => {
    const el = scrollAreaRef.current
    if (!el) return
    const handleScroll = () => {
      const distBottom = el.scrollHeight - el.scrollTop - el.clientHeight
      setShowScrollBtn(distBottom > 120)
    }
    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isOpen) return null

  async function sendToAI(text: string) {
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      return { reply: data?.reply ?? getAIResponse(text), lawyerId: data?.lawyer?.id };
    } catch (err) {
      return { reply: getAIResponse(text), lawyerId: undefined };
    }
  }

  async function handleSend(e?: FormEvent) {
    e?.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isTyping) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Reset textarea height
    if (inputRef.current) inputRef.current.style.height = "auto"

    const { reply, lawyerId } = await sendToAI(trimmed)
    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      role: "ai",
      content: reply,
      timestamp: new Date(),
      lawyerId,
    }
    setMessages((prev) => [...prev, aiMsg])
    setIsTyping(false)
  }

  function handleQuickTopic(query: string) {
    if (isTyping) return
    setInput(query)
    setTimeout(() => {
      handleSendDirect(query)
    }, 100)
  }

  async function handleSendDirect(text: string) {
    if (isTyping) return
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    const { reply, lawyerId } = await sendToAI(text)
    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      role: "ai",
      content: reply,
      timestamp: new Date(),
      lawyerId,
    }
    setMessages((prev) => [...prev, aiMsg])
    setIsTyping(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleTextareaInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    const el = e.target
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 120) + "px"
  }

  const showQuickTopics = messages.length <= 1 && !isTyping

  const wrapperClass = isFullscreen
    ? "fixed inset-0 z-[90] flex flex-col bg-background"
    : "fixed bottom-20 right-4 z-[90] flex h-[min(85vh,700px)] w-[min(95vw,420px)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/30 sm:bottom-6 sm:right-6"

  return (
    <>
      {/* Backdrop on mobile */}
      {!isFullscreen && (
        <div
          className="fixed inset-0 z-[89] bg-black/40 backdrop-blur-sm sm:hidden"
          onClick={onClose}
        />
      )}

      <div className={wrapperClass}>
        {/* Header */}
        <div className={`relative flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4 ${mode === 'emergency' ? 'bg-destructive/10 border-b border-destructive/30' : ''}`}>
          <div className={`absolute inset-0 ${mode === 'emergency' ? 'bg-gradient-to-r from-destructive/15 via-destructive/5 to-transparent' : 'bg-gradient-to-r from-primary/15 via-primary/5 to-transparent'}`} />
          <div className="relative flex items-center gap-3">
            <div className="relative">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-md ${mode === 'emergency' ? 'bg-destructive shadow-destructive/20' : 'bg-primary shadow-primary/20'}`}>
                <Scale className={`h-5 w-5 ${mode === 'emergency' ? 'text-destructive-foreground' : 'text-primary-foreground'}`} />
              </div>
              <div className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-sm font-bold text-foreground">
                  {mode === 'emergency' ? '🚨 SOS' : 'AI Advocate'}
                </h3>
                {mode === 'emergency' && (
                  <span className="text-[10px] font-semibold text-destructive uppercase tracking-wider">Favqulotta</span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <div className={`h-1.5 w-1.5 rounded-full ${mode === 'emergency' ? 'bg-destructive animate-pulse' : 'bg-emerald-400'}`} />
                <span className="text-[11px] text-muted-foreground">
                  {mode === 'emergency' ? 'Navbatchilar Yurist' : 'Tayyor'} | 24/7
                </span>
              </div>
            </div>
          </div>
          <div className="relative flex items-center gap-0.5">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label={isFullscreen ? "Kichiklashtirish" : "Kattalashtirish"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Chatni yopish"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Messages */}
        <div
          ref={scrollAreaRef}
          className="relative flex-1 overflow-y-auto scroll-smooth px-4 py-4 sm:px-5"
        >
          <div className="flex flex-col gap-5">

            {messages.map((msg, idx) => (
              <div key={msg.id} className={`flex flex-col gap-1`}>
                <div className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "ai" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                    </div>
                  )}
                  <div className={`flex max-w-[85%] flex-col gap-1 ${msg.role === "user" ? "items-end" : ""}`}>
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md bg-secondary/80 text-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>
                    <span className="px-1 text-[10px] text-muted-foreground/50">
                      {msg.timestamp.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
                {/* Show recommended lawyer carousel after each AI reply if present */}
                {msg.role === "ai" && msg.lawyerId && (
                  <div className="mt-2 mb-2">
                    <LawyersCarousel highlightId={msg.lawyerId} />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="rounded-2xl rounded-bl-md bg-secondary/80 px-4 py-3">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "0ms" }} />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "150ms" }} />
                    <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick Topics (only at start) */}
            {showQuickTopics && (
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">Tez mavzular</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_TOPICS.map((t) => (
                    <button
                      key={t.label}
                      onClick={() => handleQuickTopic(t.query)}
                      className="rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-95"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />

          {/* Scroll to bottom */}
          {showScrollBtn && (
            <button
              onClick={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="sticky bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary border border-border shadow-lg transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-card/50 px-3 py-3 sm:px-4">
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <div className="flex-1 rounded-xl border border-border bg-input/60 transition-colors focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleTextareaInput}
                onKeyDown={handleKeyDown}
                placeholder="Savolingizni yozing..."
                disabled={isTyping}
                rows={1}
                className="block w-full resize-none bg-transparent px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none disabled:opacity-40"
                style={{ maxHeight: "120px" }}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 transition-all hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:shadow-none"
              aria-label="Yuborish"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 text-center text-[10px] text-muted-foreground/40">
            {"AI Advocate — O'zbekiston qonunchiligi asosida ishlaydi"}
          </p>
        </div>
      </div>
    </>
  )
}
