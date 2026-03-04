"use client"

import { Check, X, Minus } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

type FeatureStatus = "yes" | "no" | "partial"

interface Competitor {
  name: string
  score: string
  features: Record<string, FeatureStatus>
}

const features = [
  "AI maslahat",
  "24/7 ishlash",
  "O'zbek tili",
  "Hujjat yaratish",
  "Advokat topish",
  "SOS tugma",
  "Qonun moddalari",
  "Arzon narx",
]

const competitors: Competitor[] = [
  {
    name: "AI Advocate",
    score: "8/8",
    features: {
      "AI maslahat": "yes",
      "24/7 ishlash": "yes",
      "O'zbek tili": "yes",
      "Hujjat yaratish": "yes",
      "Advokat topish": "yes",
      "SOS tugma": "yes",
      "Qonun moddalari": "yes",
      "Arzon narx": "yes",
    },
  },
  {
    name: "Lex.uz",
    score: "3/8",
    features: {
      "AI maslahat": "no",
      "24/7 ishlash": "partial",
      "O'zbek tili": "yes",
      "Hujjat yaratish": "no",
      "Advokat topish": "yes",
      "SOS tugma": "no",
      "Qonun moddalari": "partial",
      "Arzon narx": "no",
    },
  },
  {
    name: "Google",
    score: "2/8",
    features: {
      "AI maslahat": "partial",
      "24/7 ishlash": "yes",
      "O'zbek tili": "partial",
      "Hujjat yaratish": "no",
      "Advokat topish": "no",
      "SOS tugma": "no",
      "Qonun moddalari": "no",
      "Arzon narx": "no",
    },
  },
]

function StatusIcon({ status }: { status: FeatureStatus }) {
  switch (status) {
    case "yes":
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15">
          <Check className="h-3.5 w-3.5 text-primary" />
        </div>
      )
    case "no":
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/15">
          <X className="h-3.5 w-3.5 text-destructive" />
        </div>
      )
    case "partial":
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-chart-5/15">
          <Minus className="h-3.5 w-3.5 text-chart-5" />
        </div>
      )
  }
}

export function ComparisonSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Solishtirish
            </span>
            <h2 className="mt-3 font-mono text-3xl font-bold text-foreground sm:text-4xl">
              Raqobat tahlili
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {"AI Advocate boshqa yechimlardan nimasi bilan farq qiladi"}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                    Xususiyat
                  </th>
                  {competitors.map((comp) => (
                    <th
                      key={comp.name}
                      className={`p-4 text-center text-sm font-bold ${
                        comp.name === "AI Advocate"
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      <div>{comp.name}</div>
                      <div
                        className={`mt-1 font-mono text-xs ${
                          comp.name === "AI Advocate"
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {comp.score} ball
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr
                    key={feature}
                    className={`border-t border-border ${
                      i % 2 === 0 ? "bg-secondary/20" : ""
                    }`}
                  >
                    <td className="p-4 text-sm text-foreground">{feature}</td>
                    {competitors.map((comp) => (
                      <td key={comp.name} className="p-4 text-center">
                        <div className="flex justify-center">
                          <StatusIcon status={comp.features[feature]} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span>{"To'liq qo'llab-quvvatlanadi"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-chart-5/15">
                <Minus className="h-3 w-3 text-chart-5" />
              </div>
              <span>Qisman</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive/15">
                <X className="h-3 w-3 text-destructive" />
              </div>
              <span>{"Qo'llab-quvvatlanmaydi"}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
