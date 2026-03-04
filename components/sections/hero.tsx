"use client"

import { useState } from "react"
import { ArrowRight, Bot, Shield, MessageCircle } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import LawyersCarousel from "@/components/lawyers-carousel"
import { LawyersModal } from "@/components/lawyers-modal"
import type { Lawyer } from "@/lib/lawyers"

interface HeroSectionProps {
  onOpenChat: () => void
}

export function HeroSection({ onOpenChat }: HeroSectionProps) {
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)
  const [lawyerModalOpen, setLawyerModalOpen] = useState(false)
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-20">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28 lg:px-8 lg:pt-36">
        <ScrollReveal delay={0}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">
              {"O'zbekistonda birinchi AI yuridik platforma"}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="mx-auto max-w-4xl font-mono text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-balance">
              {"Huquqiy yordamni "}
              <span className="text-primary">{"sun'iy intellekt"}</span>
              {" bilan oling"}
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            {"AI Advocate — bu 24/7 ishlaydigan huquqiy maslahat platformasi. Muammoingizni yozing, AI tahlil qilsin, qonun moddalarini ko'rsatsin va hujjat tayyorlasin."}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              <MessageCircle className="h-4 w-4" />
              Bepul sinab ko{"'"}ring
            </button>
            <a
              href="#mexanizm"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
            >
              Qanday ishlaydi?
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={500}>
          <div className="mt-20 w-full max-w-3xl">
            <button
              onClick={onOpenChat}
              className="w-full text-left rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 transition-colors group-hover:bg-primary/30">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">AI Advocate</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {"Salom! Men sizning shaxsiy yuridik yordamchingizman. Menga muammoingizni yozing — men O'zbekiston qonunchiligi asosida tahlil qilib, aniq javob beraman. Masalan: \"Ish beruvchi oyligimni bermayapti, nima qilishim kerak?\""}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-input/50 px-4 py-3 transition-colors group-hover:border-primary/30">
                <span className="flex-1 text-sm text-muted-foreground/60">
                  Muammoingizni bu yerga yozing...
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary transition-transform group-hover:scale-105">
                  <ArrowRight className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Lawyers Carousel */}
      <div className="relative mt-20 border-t border-border">
        <LawyersCarousel
          showTitle={true}
          title="Bizning yuristlar"
          onLawyerClick={(lawyer) => {
            setSelectedLawyer(lawyer)
            setLawyerModalOpen(true)
          }}
        />
      </div>

      {/* Lawyers Modal */}
      <LawyersModal
        isOpen={lawyerModalOpen}
        onClose={() => setLawyerModalOpen(false)}
        lawyer={selectedLawyer}
      />
    </section>
  )
}
