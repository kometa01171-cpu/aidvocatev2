"use client"

import { DollarSign, Clock, HelpCircle, AlertTriangle } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const problems = [
  {
    icon: DollarSign,
    title: "Advokat qimmat",
    stat: "200K — 1M",
    unit: "so'm",
    description:
      "Bitta maslahat uchun 200 000 dan 1 000 000 so'mgacha to'lash kerak. Ko'pchilik uchun bu juda qimmat.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Clock,
    title: "Topish qiyin",
    stat: "3-7",
    unit: "kun",
    description:
      "Yaxshi advokat topish uchun 3 dan 7 kungacha vaqt ketadi. Shoshilinch holatlarda bu juda ko'p.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: HelpCircle,
    title: "Kimga borish noma'lum",
    stat: "78%",
    unit: "aholi",
    description:
      "Aholining 78 foizi muammoga duch kelganda kimga murojaat qilishni bilmaydi.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export function ProblemSection() {
  return (
    <section id="muammo" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-destructive">
              Muammo
            </span>
            <h2 className="mt-3 font-mono text-3xl font-bold text-foreground sm:text-4xl">
              {"Nima uchun AI Advocate kerak?"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {"O'zbekistonliklar huquqiy yordam olishda uchta asosiy muammoga duch kelishadi"}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <ScrollReveal key={problem.title} delay={index * 150}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30">
                <div className="absolute top-0 right-0 h-40 w-40 -translate-y-10 translate-x-10 rounded-full bg-primary/5 transition-transform group-hover:scale-150" />
                <div className="relative">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${problem.bgColor}`}
                  >
                    <problem.icon className={`h-7 w-7 ${problem.color}`} />
                  </div>
                  <div className="mb-4">
                    <span className="font-mono text-4xl font-bold text-foreground">
                      {problem.stat}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {problem.unit}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground">
                    {problem.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {problem.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="mt-12 flex items-center justify-center gap-3 rounded-xl border border-border bg-card/50 p-5">
            <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Natija:</strong>{" "}
              {"Minglab odamlar huquqlarini himoya qila olmaydi, chunki yordam olish qimmat, uzoq va murakkab."}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
