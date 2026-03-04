"use client"

import { Scale } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Scale className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-mono text-sm font-bold text-foreground">
              AI Advocate
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="#statistika"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Statistika
            </a>
            <a
              href="#xizmatlar"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Xizmatlar
            </a>
            <a
              href="#narxlar"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Narxlar
            </a>
            <a
              href="#jamoa"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Jamoa
            </a>
            <a
              href="#kontakt"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Kontakt
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            {"© 2026 AI Advocate. Barcha huquqlar himoyalangan."}
          </p>
        </div>
      </div>
    </footer>
  )
}
