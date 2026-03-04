"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, Scale, LogIn, UserPlus, User, Briefcase } from "lucide-react"
import type { User as UserType } from "@/hooks/use-user"

const navLinks = [
  { href: "#statistika", label: "Statistika" },
  { href: "#muammo", label: "Muammo" },
  { href: "#xizmatlar", label: "Xizmatlar" },
  { href: "#mexanizm", label: "Qanday ishlaydi" },
  { href: "/lawyers", label: "Yuristlar" },
 /// { href: "/sos", label: "🚨 SOS" },
  { href: "#narxlar", label: "Narxlar" },
  { href: "#kontakt", label: "Kontakt" },
]

interface NavbarProps {
  onOpenAuth: (tab: "login" | "register") => void
  user: UserType | null
  onOpenProfile: () => void
}

export function Navbar({ onOpenAuth, user, onOpenProfile }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    // Agar anchor link bo'lsa (# bilan boshlanadi)
    if (href.startsWith("#")) {
      const targetId = href.slice(1)
      // Agar /lawyers page'da bo'lsak, avval home'ga qaytib, keyin scroll qilish
      if (pathname === "/lawyers") {
        router.push("/")
        setTimeout(() => {
          const element = document.getElementById(targetId)
          if (element) element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      } else {
        // Home page'da bo'lsak, to'g'ridan-to'g'ri scroll qil
        const element = document.getElementById(targetId)
        if (element) element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Regular link (masalan /lawyers)
      router.push(href)
      setIsOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Scale className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-mono text-lg font-bold tracking-tight text-foreground">
              AI Advocate
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {user ? (
              <button
                onClick={onOpenProfile}
                className="inline-flex items-center gap-2.5 rounded-lg border border-border bg-secondary/50 px-4 py-2 transition-all hover:bg-secondary"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {user.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium leading-none text-foreground truncate max-w-[120px]">{user.full_name}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground flex items-center gap-1">
                    {user.role === "lawyer" ? (
                      <><Briefcase className="h-2.5 w-2.5" /> Advokat</>
                    ) : (
                      <><User className="h-2.5 w-2.5" /> Fuqaro</>
                    )}
                  </p>
                </div>
              </button>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth("login")}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-secondary"
                >
                  <LogIn className="h-4 w-4" />
                  Kirish
                </button>
                <button
                  onClick={() => onOpenAuth("register")}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                >
                  <UserPlus className="h-4 w-4" />
                  {"Ro'yxatdan o'tish"}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary lg:hidden"
            aria-label={isOpen ? "Menuni yopish" : "Menuni ochish"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  handleNavClick(link.href)
                  setIsOpen(false)
                }}
                className="block w-full text-left rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-border mt-3">
              {user ? (
                <button
                  onClick={() => { setIsOpen(false); onOpenProfile() }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-3 py-2.5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {user.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{user.full_name}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      {user.role === "lawyer" ? (
                        <><Briefcase className="h-2.5 w-2.5" /> Advokat</>
                      ) : (
                        <><User className="h-2.5 w-2.5" /> Fuqaro</>
                      )}
                    </p>
                  </div>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => { setIsOpen(false); onOpenAuth("login") }}
                    className="flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2.5 text-sm font-medium text-foreground"
                  >
                    <LogIn className="h-4 w-4" />
                    Kirish
                  </button>
                  <button
                    onClick={() => { setIsOpen(false); onOpenAuth("register") }}
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    <UserPlus className="h-4 w-4" />
                    {"Ro'yxatdan o'tish"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
