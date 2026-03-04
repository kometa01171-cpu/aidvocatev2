"use client"

import { Check, Star } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const plans = [
  {
    name: "Bepul",
    price: "0",
    unit: "so'm",
    period: "",
    description: "AI Advocate'ni sinab ko'rish uchun",
    features: [
      "3 ta savol",
      "Asosiy qonun moddalari",
      "O'zbek tilida maslahat",
    ],
    cta: "Bepul boshlash",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "29,000",
    unit: "so'm",
    period: "/oy",
    description: "To'liq huquqiy yordam uchun",
    features: [
      "Cheksiz savollar",
      "Batafsil qonun moddalari",
      "Advokat tavsiyasi",
      "Hujjat generatori",
      "SOS tezkor yordam",
      "Ustuvor qo'llab-quvvatlash",
    ],
    cta: "Premium sotib olish",
    highlighted: true,
  },
  {
    name: "Ariza yaratish",
    price: "15,000 — 50,000",
    unit: "so'm",
    period: "",
    description: "Har bir hujjat uchun alohida",
    features: [
      "PDF formatda yuklab olish",
      "Ariza shablonlari",
      "Shikoyat xatlari",
      "Da'vo arizalari",
      "Murakkablikka qarab narx",
    ],
    cta: "Ariza yaratish",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="narxlar" className="bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Narxlar
            </span>
            <h2 className="mt-3 font-mono text-3xl font-bold text-foreground sm:text-4xl">
              Tariflar
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {"Hamyonbop narxlarda professional huquqiy yordam"}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 150}>
              <div
                className={`relative h-full overflow-hidden rounded-2xl border p-8 transition-all ${
                  plan.highlighted
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border bg-background hover:border-primary/30"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 right-0 flex items-center gap-1 rounded-bl-xl bg-primary px-4 py-1.5">
                    <Star className="h-3.5 w-3.5 fill-primary-foreground text-primary-foreground" />
                    <span className="text-xs font-bold text-primary-foreground">
                      Mashhur
                    </span>
                  </div>
                )}

                <h3 className="text-lg font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-bold text-foreground sm:text-4xl">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.unit}
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full rounded-lg py-3 text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:brightness-110"
                      : "border border-border bg-secondary/50 text-foreground hover:bg-secondary"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
