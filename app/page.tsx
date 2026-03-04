"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero"
import { StatisticsSection } from "@/components/sections/statistics"
import { ProblemSection } from "@/components/sections/problem"
import { ServicesSection } from "@/components/sections/services"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { PricingSection } from "@/components/sections/pricing"
import { SOSSection } from "@/components/sections/sos"
import { ComparisonSection } from "@/components/sections/comparison"
import { TeamSection } from "@/components/sections/team"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { AuthModal } from "@/components/auth-modal"
import { ChatWindow } from "@/components/chat-window"
import { ProfileModal } from "@/components/profile-modal"
import { useUser } from "@/hooks/use-user"

export default function Home() {
  const { user, mutate, logout } = useUser()
  const [authOpen, setAuthOpen] = useState(false)
  const [authTab, setAuthTab] = useState<"login" | "register">("register")
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMode, setChatMode] = useState<'normal' | 'emergency'>('normal')
  const [profileOpen, setProfileOpen] = useState(false)

  function openAuth(tab: "login" | "register") {
    setAuthTab(tab)
    setAuthOpen(true)
  }

  function handleLogout() {
    logout()
    setProfileOpen(false)
  }

  return (
    <main>
      <Navbar
        onOpenAuth={openAuth}
        user={user}
        onOpenProfile={() => setProfileOpen(true)}
      />
      <HeroSection onOpenChat={() => setChatOpen(true)} />
      <StatisticsSection />
      <ProblemSection />
      <ServicesSection />
      <HowItWorksSection />
      <PricingSection />
      <SOSSection onOpenChat={() => { setChatMode('emergency'); setChatOpen(true) }} />
      {/* <ComparisonSection /> */}
      {/* <TeamSection /> */}
      <ContactSection />
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab={authTab}
        onSuccess={(u) => mutate(u, false)}
      />

      {/* Profile Modal */}
      {user && (
        <ProfileModal
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
          user={user}
          onLogout={handleLogout}
          onUpdate={(u) => mutate(u, false)}
        />
      )}

      {/* Chat Window */}
      <ChatWindow 
        isOpen={chatOpen} 
        onClose={() => {
          setChatOpen(false)
          setChatMode('normal')
        }} 
        mode={chatMode} 
      />

      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:brightness-110 sm:h-16 sm:w-16"
          aria-label="AI Chat ochish"
        >
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
            AI
          </span>
        </button>
      )}
    </main>
  )
}
