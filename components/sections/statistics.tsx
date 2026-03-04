"use client"

import { Users, Briefcase, FileText, GraduationCap } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedCounter } from "@/components/animated-counter"

const stats = [
  {
    icon: Users,
    value: 35000000,
    suffix: "+",
    label: "Aholi",
    description: "O'zbekiston aholisi",
    display: "35M",
  },
  {
    icon: Briefcase,
    value: 7000,
    suffix: "+",
    label: "Advokat",
    description: "Faol advokatlar soni",
    display: "7K",
  },
  {
    icon: FileText,
    value: 600000,
    suffix: "+",
    label: "Sud ishlari",
    description: "Yillik sud ishlari soni",
    display: "600K+",
  },
  {
    icon: GraduationCap,
    value: 30,
    suffix: "%",
    label: "Savodxonlik",
    description: "Huquqiy savodxonlik darajasi",
    display: "30%",
  },
]

export function StatisticsSection() {
  return (
    <section id="statistika" className="bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Statistika
            </span>
            <h2 className="mt-3 font-mono text-3xl font-bold text-foreground sm:text-4xl">
              {"O'zbekiston huquqiy sohasi raqamlarda"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {"Mamlakatimizda huquqiy xizmatlar talabi juda yuqori, lekin yetarlicha imkoniyat yo'q"}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <div className="group relative rounded-xl border border-border bg-secondary/30 p-6 transition-all hover:border-primary/40 hover:bg-secondary/60">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="font-mono text-3xl font-bold text-foreground sm:text-4xl">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
