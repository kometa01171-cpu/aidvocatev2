"use client"

import { PenLine, Brain, BookOpen, FileOutput, UserCheck } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const steps = [
  {
    icon: PenLine,
    step: "01",
    title: "Muammoni yozasiz",
    description:
      "O'z muammoingizni oddiy tilda yozing. AI sizning so'zlaringizni tushunadi.",
  },
  {
    icon: Brain,
    step: "02",
    title: "AI tahlil qiladi",
    description:
      "Sun'giy intellekt muammoingizni O'zbekiston qonunchiligi bo'yicha tahlil qiladi.",
  },
  {
    icon: BookOpen,
    step: "03",
    title: "Moddalar bilan javob",
    description:
      "Tegishli qonun moddalari va amaliy maslahatlar bilan to'liq javob olasiz.",
  },
  {
    icon: FileOutput,
    step: "04",
    title: "Hujjat tayyorlaydi",
    description:
      "Kerak bo'lsa, ariza yoki shikoyat xatini avtomatik tayyorlab beradi.",
  },
  {
    icon: UserCheck,
    step: "05",
    title: "Advokat tavsiya qiladi",
    description:
      "Murakkab holatlarda sizga mos tajribali advokatni topib beradi.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="mexanizm" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Mexanizm
            </span>
            <h2 className="mt-3 font-mono text-3xl font-bold text-foreground sm:text-4xl">
              Qanday ishlaydi?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {"Besh oddiy qadamda to'liq huquqiy yordam oling"}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative mt-16">
          {/* Connection line (desktop) */}
          <div className="absolute top-[60px] right-12 left-12 hidden h-0.5 bg-border lg:block" />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <ScrollReveal key={step.step} delay={index * 120}>
                <div className="group relative flex flex-col items-center text-center">
                  <div className="relative z-10 mb-6 flex h-[120px] w-[120px] flex-col items-center justify-center rounded-2xl border border-border bg-card transition-all group-hover:border-primary/40 group-hover:bg-secondary/60">
                    <span className="mb-1 font-mono text-xs font-bold text-primary">
                      {step.step}
                    </span>
                    <step.icon className="h-8 w-8 text-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
