"use client"

import { Mail, Phone, Send, MapPin, ArrowRight, Loader2, CheckCircle } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { useState } from "react"

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "kometa01171@gmail.com",
    href: "mailto:kometa01171@gmail.com",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+998 88 303 93 32",
    href: "tel:+998883039332",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "@AIAdvocateUZ",
    href: "https://t.me/AIAdvocateUZ",
  },
]

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Xatolik yuz berdi")
        setLoading(false)
        return
      }

      setSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError("Server bilan bog'lanishda xatolik")
    } finally {
      setLoading(false)
    }
  }
  return (
    <section id="kontakt" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Kontakt
            </span>
            <h2 className="mt-3 font-mono text-3xl font-bold text-foreground sm:text-4xl">
              {"Biz bilan bog'laning"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {"Savollaringiz bormi? Biz bilan bog'laning — tez orada javob beramiz"}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ScrollReveal delay={100}>
            <div className="space-y-6">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <contact.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      {contact.label}
                    </p>
                    <p className="mt-0.5 font-mono text-sm font-semibold text-foreground">
                      {contact.value}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </a>
              ))}

              <div className="flex items-center gap-5 rounded-xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Manzil
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-foreground">
                    {"Toshkent, O'zbekiston"}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-lg font-bold text-foreground">
                {"Xabar qoldiring"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {"Formani to'ldiring, biz siz bilan 24 soat ichida bog'lanamiz"}
              </p>

              {submitted && (
                <div className="mt-6 flex items-center gap-3 rounded-lg border border-green-200/30 bg-green-50/10 p-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-green-600 font-medium">
                    {"Xabaringiz muvaffaqiyatli yuborildi!"}
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-6 rounded-lg border border-red-200/30 bg-red-50/10 p-4">
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}

              <form
                className="mt-6 space-y-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Ismingiz
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ismingizni kiriting"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={loading}
                    className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                    className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    Xabar
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Xabaringizni yozing..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={loading}
                    className="w-full resize-none rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Yuborilmoqda..." : "Yuborish"}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
