"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Award, Phone, Mail, Briefcase, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import type { Lawyer } from "@/lib/lawyers"
import { LawyersModal } from "@/components/lawyers-modal"
import { Navbar } from "@/components/navbar"
import { useUser } from "@/hooks/use-user"

export default function LawyersPage() {
  const { user } = useUser()
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch("/api/lawyers")
        const data = await res.json()
        console.log("Fetched lawyers data:", data) // Debug log
        setLawyers(data.lawyers || [])
        setError("")
      } catch (err) {
        setError("Advokatlarni yuklashda xatolik yuz berdi")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLawyers()
  }, [])

  return (
    <main className="min-h-screen bg-background pt-20 lg:pt-24">
      <Navbar
        onOpenAuth={() => {}}
        user={user}
        onOpenProfile={() => {}}
      />
      {/* Header */}
      <div className="relative border-b border-border bg-gradient-to-b from-primary/5 via-transparent to-transparent py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Orqaga qaytish
          </Link>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
              Muvaffaqiyatli Advokatlar
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              O'zbekistondagi tajribali yuristlardan birini tanlang. Har bir advokat ko'p yillik tajribaga ega va turli huquq sohalari bo'yicha ixtisoslashgan.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        </div>

        <div className="mx-auto max-w-7xl">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
                <p className="text-muted-foreground">Advokatlar yuklanyapti...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-6 py-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              <p className="text-destructive">{error}</p>
            </div>
          )}

          {!loading && !error && lawyers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Hozircha advokatlar mavjud emas</p>
            </div>
          )}

          {!loading && !error && lawyers.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lawyers.map((lawyer) => (
                <div
                  key={lawyer.id}
                  onClick={() => {
                    setSelectedLawyer(lawyer)
                    setModalOpen(true)
                  }}
                  className="group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/50 hover:bg-card cursor-pointer"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 group-hover:to-primary/15 transition-all duration-300 -z-10" />

                  <div className="p-6 space-y-4">
                    {/* Avatar */}
                    <div className="flex justify-center">
                      {lawyer.avatar ? (
                        <img
                          src={lawyer.avatar}
                          alt={lawyer.name}
                          className="h-24 w-24 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-colors"
                        />
                      ) : (
                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-4 border-primary/20">
                          <Briefcase className="h-10 w-10 text-primary/50" />
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <div>
                      <h3 className="text-xl font-bold text-foreground text-center">
                        {lawyer.name}
                      </h3>
                    </div>

                    {/* Specialties */}
                    {lawyer.specialties && lawyer.specialties.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-center gap-1">
                          <Award className="h-3.5 w-3.5" />
                          Ixtisoslashuv
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {lawyer.specialties.map((spec, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {lawyer.location && (
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{lawyer.location}</span>
                      </div>
                    )}

                    {/* Phone */}
                    {lawyer.contact && (
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 text-primary" />
                        <a
                          href={`tel:${lawyer.contact}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-primary transition-colors"
                        >
                          {lawyer.contact}
                        </a>
                      </div>
                    )}

                    {/* Contact info */}
                    <div className="space-y-2 border-t border-border pt-4">
                      {lawyer.contact && (
                        <a
                          href={`tel:${lawyer.contact}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-3 rounded-lg bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                        >
                          <Phone className="h-4 w-4" />
                          Qo'ng'iroq qilish
                        </a>
                      )}
                      <a
                        href="#kontakt"
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/30 px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary"
                      >
                        <Mail className="h-4 w-4" />
                        Xabar yuborish
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lawyer Detail Modal */}
      <LawyersModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        lawyer={selectedLawyer}
      />
    </main>
  )
}
