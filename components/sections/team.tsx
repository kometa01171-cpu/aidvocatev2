"use client"

import { ScrollReveal } from "@/components/scroll-reveal"

const team = [
  {
    name: "Abdullajonov Ozodbek",
    role: "CEO",
    description: "Loyiha asoschisi va strategik rahbar",
    initials: "AO",
  },
  {
    name: "To'lanboyev No'monjon",
    role: "CTO",
    description: "Texnik arxitektura va AI ishlanmalar",
    initials: "TN",
  },
  {
    name: "Kimsanboyev Alisher",
    role: "Yurist",
    description: "Huquqiy kontentni tekshirish va tahlil",
    initials: "KA",
  },
  {
    name: "Olimov Muhammadrizo",
    role: "Marketing",
    description: "Marketing strategiyasi va brend rivojlantirish",
    initials: "OM",
  },
  {
    name: "Abdurashidov Sarvarbek",
    role: "Marketing",
    description: "Ijtimoiy tarmoqlar va kontenti boshqaruv",
    initials: "AS",
  },
]

export function TeamSection() {
  return (
    <section id="jamoa" className="bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Jamoa
            </span>
            <h2 className="mt-3 font-mono text-3xl font-bold text-foreground sm:text-4xl">
              Bizning jamoa
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {"Professional va tajribali mutaxassislar jamoasi"}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 100}>
              <div className="group flex flex-col items-center rounded-2xl border border-border bg-background p-6 text-center transition-all hover:border-primary/40">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 font-mono text-xl font-bold text-primary transition-colors group-hover:bg-primary/20">
                  {member.initials}
                </div>
                <h3 className="mt-4 text-sm font-bold text-foreground">
                  {member.name}
                </h3>
                <span className="mt-1 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  {member.role}
                </span>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {member.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
