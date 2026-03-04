"use client"

import { AlertTriangle, Phone, MessageCircle, Clock } from "lucide-react"
import Link from "next/link"

export function SOSSection() {
  return (
    <section id="sos" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-destructive/5 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-destructive/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-destructive/5 rounded-full blur-3xl -z-10" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Favqulotta Holat</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Darhol Yordam Kerakmi?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Favqulotta hukuk muammolari uchun 24/7 navbatchi yurist bilan to'g'ridan-to'g'ri bog'lanib, darhol maslahat oling.
          </p>
        </div>

        {/* SOS Card */}
        <div className="relative mx-auto max-w-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 via-destructive/10 to-destructive/20 rounded-3xl blur-2xl -z-10" />
          
          <div className="rounded-3xl border-2 border-destructive/30 bg-card/80 backdrop-blur-md p-8 sm:p-12 overflow-hidden">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-destructive to-transparent" />

            <div className="space-y-8">
              {/* Title and description */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-destructive/20 mx-auto">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  SOS Qo'llamasi
                </h3>
                <p className="text-muted-foreground">
                  Favqulotta huquqiy muammodalar uchun tijorat jazolanishi, jinoiy ish, vizavi jazolanishi va boshqa xavfli vaziyatlarda
                </p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <Clock className="h-6 w-6 text-destructive" />
                  <p className="text-sm font-semibold text-foreground">24/7 Mavjud</p>
                  <p className="text-xs text-muted-foreground">
                    Darhol javob
                  </p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <Phone className="h-6 w-6 text-destructive" />
                  <p className="text-sm font-semibold text-foreground">Yurist Davlat</p>
                  <p className="text-xs text-muted-foreground">
                    Tajribali mutaxassis
                  </p>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 p-4 rounded-xl bg-secondary/30 border border-border/50">
                  <MessageCircle className="h-6 w-6 text-destructive" />
                  <p className="text-sm font-semibold text-foreground">Maxfiy Chat</p>
                  <p className="text-xs text-muted-foreground">
                    Konfidensialligi kafolatlangan
                  </p>
                </div>
              </div>

              {/* Emergency situations list */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Favqulotta holatlar:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {[
                    "📋 Qonun buzilishi uchun hibsiy",
                    "⚖️ Jinoyat ayblovasiga javob",
                    "💼 Zararli shartnom",
                    "🏠 Mulk muzaaraasi",
                    "📞 Ish beruvchining aybig'a",
                    "✋ Xulq-atvor ko'takilishi",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm text-foreground p-2 rounded-lg bg-secondary/20"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                <Link
                  href="/sos"
                  className="flex items-center justify-center gap-2 rounded-xl bg-destructive px-6 py-3.5 text-sm font-semibold text-destructive-foreground transition-all hover:brightness-110 active:scale-95"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat orqali SOS
                </Link>
                <a
                  href="tel:+998712385000"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-destructive bg-destructive/10 px-6 py-3.5 text-sm font-semibold text-destructive transition-all hover:bg-destructive/20"
                >
                  <Phone className="h-5 w-5" />
                  Qo'ng'iroq qilish
                </a>
              </div>

              {/* Warning note */}
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <p className="text-xs text-destructive/80">
                  <span className="font-semibold">⚠️ Muhim:</span> Favqulotta tibbiy yoki xavf-xatarli vaziyatlarda darhol 112 ga qo'ng'iroq qiling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
