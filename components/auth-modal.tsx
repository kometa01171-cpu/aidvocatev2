"use client"

import { useState, useEffect, type FormEvent } from "react"
import {
  X, Scale, Eye, EyeOff, User, Mail, Lock, Phone,
  Briefcase, Users, Award, MapPin, Hash, ChevronRight, Loader2
} from "lucide-react"
import type { User as UserType } from "@/hooks/use-user"

type AuthTab = "login" | "register"
type UserRole = "lawyer" | "citizen"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: AuthTab
  onSuccess: (user: UserType) => void
}

export function AuthModal({ isOpen, onClose, defaultTab = "register", onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<AuthTab>(defaultTab)
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form fields
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [experienceYears, setExperienceYears] = useState("")
  const [officeAddress, setOfficeAddress] = useState("")
  const [location, setLocation] = useState("")
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>("")

  useEffect(() => {
    setTab(defaultTab)
  }, [defaultTab])

  useEffect(() => {
    if (!isOpen) {
      setRole(null)
      setError("")
      setLoading(false)
      setFullName("")
      setEmail("")
      setPhone("")
      setPassword("")
      setPasswordConfirm("")
      setLicenseNumber("")
      setSpecialization("")
      setExperienceYears("")
      setOfficeAddress("")
      setLocation("")
      setAvatarFile(null)
      setAvatarPreview("")
    }
  }, [isOpen])

  if (!isOpen) return null

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")

    if (tab === "register") {
      if (!role) { setError("Iltimos, foydalanuvchi turini tanlang"); return }
      if (password !== passwordConfirm) { setError("Parollar mos kelmadi"); return }
      if (password.length < 8) { setError("Parol kamida 8 ta belgidan iborat bo'lishi kerak"); return }

      setLoading(true)
      try {
        let avatar = null
        if (role === "lawyer" && avatarFile) {
          const reader = new FileReader()
          avatar = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(avatarFile)
          })
        }
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: fullName,
            email,
            phone,
            password,
            role,
            license_number: role === "lawyer" ? licenseNumber : null,
            specialization: role === "lawyer" ? specialization : null,
            experience_years: role === "lawyer" && experienceYears ? Number(experienceYears) : null,
            office_address: role === "lawyer" ? officeAddress : null,
            location: role === "lawyer" ? location : null,
            avatar,
          }),
        })
        const data = await res.json()
        if (!res.ok) { setError(data.error || "Xatolik yuz berdi"); setLoading(false); return }
        onSuccess(data.user)
        onClose()
      } catch {
        setError("Server bilan bog'lanishda xatolik")
      }
      setLoading(false)
    } else {
      setLoading(true)
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
        const data = await res.json()
        if (!res.ok) { setError(data.error || "Xatolik yuz berdi"); setLoading(false); return }
        onSuccess(data.user)
        onClose()
      } catch {
        setError("Server bilan bog'lanishda xatolik")
      }
      setLoading(false)
    }
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose()
  }

  const inputClass = "w-full rounded-lg border border-border bg-input py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Scale className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-mono text-sm font-bold text-foreground">AI Advocate</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Yopish"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border shrink-0">
          <button
            onClick={() => { setTab("login"); setError(""); setRole(null) }}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === "login"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Kirish
          </button>
          <button
            onClick={() => { setTab("register"); setError("") }}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === "register"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {"Ro'yxatdan o'tish"}
          </button>
        </div>

        {/* Scrollable form area */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-4 p-6">

            {/* Error message */}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* REGISTER - Role selection step */}
            {tab === "register" && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">{"Siz kimsiz?"}</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("citizen")}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                      role === "citizen"
                        ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                        : "border-border bg-secondary/30 hover:border-muted-foreground/30 hover:bg-secondary/50"
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      role === "citizen" ? "bg-primary/20" : "bg-secondary"
                    }`}>
                      <Users className={`h-6 w-6 ${role === "citizen" ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-semibold ${role === "citizen" ? "text-primary" : "text-foreground"}`}>
                        Oddiy fuqaro
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Huquqiy yordam kerak
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("lawyer")}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                      role === "lawyer"
                        ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                        : "border-border bg-secondary/30 hover:border-muted-foreground/30 hover:bg-secondary/50"
                    }`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      role === "lawyer" ? "bg-primary/20" : "bg-secondary"
                    }`}>
                      <Briefcase className={`h-6 w-6 ${role === "lawyer" ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-semibold ${role === "lawyer" ? "text-primary" : "text-foreground"}`}>
                        Advokat / Yurist
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Professional xizmat
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Common fields for register */}
            {tab === "register" && role && (
              <>
                <div>
                  <label htmlFor="auth-name" className="mb-1.5 block text-sm font-medium text-foreground">
                    {"To'liq ism"}
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input id="auth-name" type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Ismingizni kiriting" className={inputClass} />
                  </div>
                </div>
                {role === "citizen" && (
                  <div>
                    <label htmlFor="auth-citizen-location" className="mb-1.5 block text-sm font-medium text-foreground">Manzilingiz (shahar)</label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input id="auth-citizen-location" type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Masalan: Samarqand" className={inputClass} />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="auth-email-r" className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input id="auth-email-r" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="auth-phone-r" className="mb-1.5 block text-sm font-medium text-foreground">Telefon raqam</label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input id="auth-phone-r" type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+998 90 123 45 67" className={inputClass} />
                  </div>
                </div>

                {/* Lawyer-specific fields */}
                {role === "lawyer" && (
                  <>
                    <div className="rounded-lg border border-border bg-secondary/20 px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">Advokat ma{"'"}lumotlari</p>
                    </div>

                    <div>
                      <label htmlFor="auth-license" className="mb-1.5 block text-sm font-medium text-foreground">Litsenziya raqami</label>
                      <div className="relative">
                        <Hash className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input id="auth-license" type="text" required value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} placeholder="Masalan: UZ-ADV-12345" className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="auth-spec" className="mb-1.5 block text-sm font-medium text-foreground">Ixtisoslashuv sohasi</label>
                      <div className="relative">
                        <Award className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <select id="auth-spec" required value={specialization} onChange={e => setSpecialization(e.target.value)}
                          className="w-full rounded-lg border border-border bg-input py-2.5 pr-4 pl-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                        >
                          <option value="">Tanlang...</option>
                          <option value="jinoyat">Jinoyat huquqi</option>
                          <option value="fuqarolik">Fuqarolik huquqi</option>
                          <option value="oila">Oila huquqi</option>
                          <option value="mehnat">Mehnat huquqi</option>
                          <option value="biznes">Biznes huquqi</option>
                          <option value="soliq">Soliq huquqi</option>
                          <option value="yer">Yer huquqi</option>
                          <option value="boshqa">Boshqa</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="auth-exp" className="mb-1.5 block text-sm font-medium text-foreground">Tajriba (yil)</label>
                      <div className="relative">
                        <Briefcase className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input id="auth-exp" type="number" min="0" max="60" value={experienceYears} onChange={e => setExperienceYears(e.target.value)} placeholder="Masalan: 5" className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="auth-office" className="mb-1.5 block text-sm font-medium text-foreground">Ofis manzili</label>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input id="auth-office" type="text" value={officeAddress} onChange={e => setOfficeAddress(e.target.value)} placeholder="Toshkent, Amir Temur ko'chasi 1" className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="auth-location" className="mb-1.5 block text-sm font-medium text-foreground">Shahar</label>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input id="auth-location" type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Masalan: Toshkent" className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-foreground">Profil rasimi</label>
                      <div className="flex flex-col gap-3">
                        {avatarPreview && (
                          <div className="flex items-center justify-center rounded-lg border border-border bg-secondary/20 p-3">
                            <img src={avatarPreview} alt="Preview" className="h-20 w-20 rounded-full object-cover" />
                          </div>
                        )}
                        <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30 py-6 transition-colors hover:border-primary hover:bg-secondary/50">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                setAvatarFile(file)
                                const reader = new FileReader()
                                reader.onload = (ev) => setAvatarPreview(ev.target?.result as string)
                                reader.readAsDataURL(file)
                              }
                            }}
                          />
                          <span className="text-sm text-muted-foreground">Rasmni yuklang</span>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="auth-pass-r" className="mb-1.5 block text-sm font-medium text-foreground">Parol</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input id="auth-pass-r" type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Kamida 8 ta belgi" className="w-full rounded-lg border border-border bg-input py-2.5 pr-10 pl-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="auth-pass-confirm" className="mb-1.5 block text-sm font-medium text-foreground">Parolni tasdiqlang</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input id="auth-pass-confirm" type={showPassword ? "text" : "password"} required value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="Parolni qayta kiriting" className={inputClass} />
                  </div>
                </div>
              </>
            )}

            {/* LOGIN fields */}
            {tab === "login" && (
              <>
                <div>
                  <label htmlFor="auth-email-l" className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input id="auth-email-l" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="auth-pass-l" className="mb-1.5 block text-sm font-medium text-foreground">Parol</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input id="auth-pass-l" type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Parolingiz" className="w-full rounded-lg border border-border bg-input py-2.5 pr-10 pl-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="button" className="text-xs text-primary transition-colors hover:underline">
                    Parolni unutdingizmi?
                  </button>
                </div>
              </>
            )}

            {/* Submit */}
            {(tab === "login" || (tab === "register" && role)) && (
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {tab === "register" ? "Ro'yxatdan o'tish" : "Kirish"}
                {!loading && <ChevronRight className="h-4 w-4" />}
              </button>
            )}

            {tab === "register" && role && (
              <p className="text-center text-xs text-muted-foreground">
                {"Ro'yxatdan o'tish orqali siz "}
                <button type="button" className="text-primary hover:underline">foydalanish shartlari</button>
                {" va "}
                <button type="button" className="text-primary hover:underline">maxfiylik siyosati</button>
                {"ga rozilik bildirasiz."}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
