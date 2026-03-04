"use client"

import { Bot, FileText, Search, AlertOctagon } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const services = [
  {
    icon: Bot,
    title: "AI Maslahat",
    badge: "24/7",
    description:
      "Sun'giy intellekt yordamida istalgan vaqtda huquqiy maslahat oling. AI O'zbekiston qonunchiligi asosida tahlil qilib, aniq javob beradi.",
    features: [
      "O'zbek tilida muloqot",
      "Real-time javoblar",
      "Qonun moddalariga havola",
      "Amaliy maslahatlar",
    ],
  },
  {
    icon: FileText,
    title: "Hujjat Generator",
    badge: "PDF",
    description:
      "Ariza, shikoyat va boshqa huquqiy hujjatlarni avtomatik yarating. Tayyor PDF formatda yuklab oling.",
    features: [
      "Ariza shablonlari",
      "Shikoyat xatlari",
      "Da'vo arizalari",
      "PDF formatda yuklab olish",
    ],
  },
  {
    icon: Search,
    title: "Advokat Topish",
    badge: "Tezkor",
    description:
      "Sizning muammoingizga mos tajribali advokatlarni toping. Reyting, narx va ixtisoslik bo'yicha qidiring.",
    features: [
      "Soha bo'yicha filtrlash",
      "Reyting tizimi",
      "Narx solishtirish",
      "To'g'ridan-to'g'ri bog'lanish",
    ],
  },
  {
    icon: AlertOctagon,
    title: "Favqulodda SOS",
    badge: "Tezkor",
    description:
      "Shoshilinch vaziyatlarda bir tugma bilan yordam so'rang. Hibsga olinish, g'ayritabiiy hodisa va boshqa holatlarda.",
    features: [
      "Bir tugma bilan chaqirish",
      "Huquqlaringiz ro'yxati",
      "Tezkor advokat chaqirish",
      "GPS lokatsiya yuborish",
    ],
  },
]

export function ServicesSection() {
  return (
    <section id="xizmatlar" className="bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">
              Xizmatlar
            </span>
            <h2 className="mt-3 font-mono text-3xl font-bold text-foreground sm:text-4xl">
              {"Bizning yechimlarimiz"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {"AI Advocate sizga to'rtta asosiy xizmat taqdim etadi"}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 100}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-background p-8 transition-all hover:border-primary/40">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {service.badge}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
