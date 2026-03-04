"use client"

import { useState, type FormEvent, useEffect } from "react"
import {
  X, Scale, User, Mail, Phone, Briefcase, Award,
  MapPin, Hash, Save, Loader2, LogOut, CheckCircle
} from "lucide-react"
import type { User as UserType } from "@/hooks/use-user"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: UserType
  onLogout: () => void
  onUpdate: (user: UserType) => void
}

export function ProfileModal({ isOpen, onClose, user, onLogout, onUpdate }: ProfileModalProps) {
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  const [fullName, setFullName] = useState(user.full_name)
  const [phone, setPhone] = useState(user.phone)
  const [specialization, setSpecialization] = useState(user.specialization || "")
  const [licenseNumber, setLicenseNumber] = useState(user.license_number || "")
  const [experienceYears, setExperienceYears] = useState(user.experience_years?.toString() || "")
  const [officeAddress, setOfficeAddress] = useState(user.office_address || "")

  useEffect(() => {
    if (isOpen) {
      setFullName(user.full_name)
      setPhone(user.phone)
      setSpecialization(user.specialization || "")
      setLicenseNumber(user.license_number || "")
      setExperienceYears(user.experience_years?.toString() || "")
      setOfficeAddress(user.office_address || "")
      setEditing(false)
      setSaved(false)
      setError("")
    }
  }, [isOpen, user])

  if (!isOpen) return null

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          phone,
          specialization: user.role === "lawyer" ? specialization : undefined,
          license_number: user.role === "lawyer" ? licenseNumber : undefined,
          experience_years: user.role === "lawyer" && experienceYears ? Number(experienceYears) : undefined,
          office_address: user.role === "lawyer" ? officeAddress : undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Xatolik yuz berdi"); setLoading(false); return }
      onUpdate(data.user)
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError("Server bilan bog'lanishda xatolik")
    }
    setLoading(false)
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose()
  }

  const specLabels: Record<string, string> = {
    jinoyat: "Jinoyat huquqi",
    fuqarolik: "Fuqarolik huquqi",
    oila: "Oila huquqi",
    mehnat: "Mehnat huquqi",
    biznes: "Biznes huquqi",
    soliq: "Soliq huquqi",
    yer: "Yer huquqi",
    boshqa: "Boshqa",
  }

  const inputClass = "w-full rounded-lg border border-border bg-input py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"

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
            <span className="font-mono text-sm font-bold text-foreground">Profil</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Yopish"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          {/* User card header */}
          <div className="border-b border-border bg-secondary/20 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold shrink-0">
                {user.full_name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-mono text-lg font-bold text-foreground truncate">{user.full_name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.role === "lawyer"
                      ? "bg-primary/15 text-primary"
                      : "bg-accent/15 text-accent"
                  }`}>
                    {user.role === "lawyer" ? (
                      <><Briefcase className="h-3 w-3" /> Advokat / Yurist</>
                    ) : (
                      <><User className="h-3 w-3" /> Fuqaro</>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4 p-6">
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}
            {saved && (
              <div className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
                <CheckCircle className="h-4 w-4" />
                {"Ma'lumotlar saqlandi!"}
              </div>
            )}

            {/* Basic info */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{"To'liq ism"}</label>
              <div className="relative">
                <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="text" disabled={!editing} value={fullName} onChange={e => setFullName(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="email" disabled value={user.email} className={`${inputClass} opacity-60 cursor-not-allowed`} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{"Emailni o'zgartirib bo'lmaydi"}</p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Telefon</label>
              <div className="relative">
                <Phone className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="tel" disabled={!editing} value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} />
              </div>
            </div>

            {/* Lawyer fields */}
            {user.role === "lawyer" && (
              <>
                <div className="rounded-lg border border-border bg-secondary/20 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Advokat ma{"'"}lumotlari</p>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Litsenziya raqami</label>
                  <div className="relative">
                    <Hash className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" disabled={!editing} value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Ixtisoslashuv</label>
                  <div className="relative">
                    <Award className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    {editing ? (
                      <select value={specialization} onChange={e => setSpecialization(e.target.value)}
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
                    ) : (
                      <input type="text" disabled value={specLabels[specialization] || specialization || "Ko'rsatilmagan"} className={inputClass} />
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Tajriba (yil)</label>
                  <div className="relative">
                    <Briefcase className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input type="number" disabled={!editing} min="0" max="60" value={experienceYears} onChange={e => setExperienceYears(e.target.value)} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">Ofis manzili</label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" disabled={!editing} value={officeAddress} onChange={e => setOfficeAddress(e.target.value)} className={inputClass} />
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2">
              {editing ? (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setEditing(false); setFullName(user.full_name); setPhone(user.phone) }}
                    className="flex-1 rounded-lg border border-border bg-secondary/50 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Saqlash
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                >
                  {"Ma'lumotlarni tahrirlash"}
                </button>
              )}

              <button
                type="button"
                onClick={onLogout}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/30 py-2.5 text-sm font-medium text-destructive transition-all hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4" />
                Chiqish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
