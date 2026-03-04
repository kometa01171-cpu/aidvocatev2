"use client"

import { X, MapPin, Award, Phone, Mail, Briefcase } from "lucide-react"
import type { Lawyer } from "@/lib/lawyers"

interface LawyersModalProps {
  isOpen: boolean
  onClose: () => void
  lawyer: Lawyer | null
}

export function LawyersModal({ isOpen, onClose, lawyer }: LawyersModalProps) {
  if (!isOpen || !lawyer) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Yopish"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 sm:p-10">
          <div className="space-y-6">
            {/* Avatar */}
            <div className="flex justify-center">
              {lawyer.avatar ? (
                <img
                  src={lawyer.avatar}
                  alt={lawyer.name}
                  className="h-32 w-32 rounded-full object-cover border-4 border-primary/30"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border-4 border-primary/20">
                  <Briefcase className="h-16 w-16 text-primary/50" />
                </div>
              )}
            </div>

            {/* Name */}
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                {lawyer.name}
              </h2>
              {lawyer.specialties && lawyer.specialties.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {lawyer.specialties.join(", ")}
                </p>
              )}
            </div>

            {/* Info grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {lawyer.location && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Joylashuv
                    </p>
                    <p className="mt-1 font-medium text-foreground">
                      {lawyer.location}
                    </p>
                  </div>
                </div>
              )}

              {lawyer.specialties && lawyer.specialties.length > 0 && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <Award className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Ixtisoslashuv
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {lawyer.specialties.map((spec, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary border border-primary/20"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact buttons */}
            <div className="grid sm:grid-cols-2 gap-3 pt-4 border-t border-border">
              {lawyer.contact && (
                <a
                  href={`tel:${lawyer.contact}`}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                >
                  <Phone className="h-4 w-4" />
                  Qo'ng'iroq qilish
                </a>
              )}
              <a
                href="#kontakt"
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/30 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
              >
                <Mail className="h-4 w-4" />
                Xabar yuborish
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
