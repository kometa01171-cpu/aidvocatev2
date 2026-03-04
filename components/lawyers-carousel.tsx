"use client"

import React, { useEffect, useState, useRef } from "react"
import { Phone, MapPin, Star, ChevronLeft, ChevronRight, Briefcase } from "lucide-react"
import { Lawyer } from "@/lib/lawyers"

interface LawyersCarouselProps {
  lawyersList?: Lawyer[]
  highlightId?: string
  title?: string
  showTitle?: boolean
  onLawyerClick?: (lawyer: Lawyer) => void
}

export default function LawyersCarousel({
  lawyersList,
  highlightId,
  title = "Bizning yuristlar",
  showTitle = true,
  onLawyerClick,
}: LawyersCarouselProps) {
  const [lawyers, setLawyers] = useState<Lawyer[]>(lawyersList || [])
  const [isLoading, setIsLoading] = useState(!lawyersList)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    if (!lawyersList) {
      fetch("/api/lawyers")
        .then((res) => res.json())
        .then((data) => setLawyers(data.lawyers || []))
        .catch(() => setLawyers([]))
        .finally(() => setIsLoading(false))
    }
  }, [lawyersList])

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [lawyers])

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 320
      const newScroll = direction === "left" 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount
      container.scrollTo({ left: newScroll, behavior: "smooth" })
      setTimeout(checkScroll, 300)
    }
  }

  if (isLoading) {
    return (
      <div className="w-full py-12 px-4 md:px-6">
        <div className="flex gap-6 overflow-hidden pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="min-w-[300px] h-[400px] rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-12 px-4 md:px-6 bg-gradient-to-b from-background via-secondary/5 to-background">
      {showTitle && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            {"Tajribali yuristlar bilan bog'laning va o'zingizga mos maslahatchi toping"}
          </p>
        </div>
      )}

      <div className="relative group">
        {/* Left scroll button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Chap"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Right scroll button */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="O'ng"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Carousel container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-2"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              onClick={() => onLawyerClick?.(lawyer)}
              className={`min-w-[300px] flex-shrink-0 group/card rounded-2xl overflow-hidden transition-all duration-300 transform cursor-pointer ${
                highlightId === lawyer.id
                  ? "ring-2 ring-primary shadow-2xl shadow-primary/30 scale-105"
                  : "hover:shadow-xl hover:scale-102"
              }`}
            >
              {/* Card background gradient */}
              <div className="bg-gradient-to-br from-card via-card to-secondary/30 border border-border/50 h-full flex flex-col overflow-hidden">
                {/* Top accent bar */}
                {highlightId === lawyer.id && (
                  <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary" />
                )}

                {/* Avatar section */}
                <div className="relative px-6 pt-6 pb-4">
                  <div className={`relative inline-block ${highlightId === lawyer.id ? "animate-pulse" : ""}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-lg opacity-50" />
                    <div className="relative h-20 w-20 rounded-full border-4 border-primary/20 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      {lawyer.avatar ? (
                        <img
                          src={lawyer.avatar}
                          alt={lawyer.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Briefcase className="h-10 w-10 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  {highlightId === lawyer.id && (
                    <div className="absolute top-4 right-6 flex items-center gap-1 bg-primary/20 backdrop-blur-sm px-2.5 py-1 rounded-full border border-primary/30">
                      <Star className="h-3.5 w-3.5 text-primary fill-primary" />
                      <span className="text-xs font-semibold text-primary">Tavsiya</span>
                    </div>
                  )}
                </div>

                {/* Content section */}
                <div className="px-6 py-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-foreground leading-tight mb-1">{lawyer.name}</h3>

                  {lawyer.location && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-primary/60" />
                      <span>{lawyer.location}</span>
                    </div>
                  )}

                  {/* Specialties */}
                  <div className="mb-4 flex-1">
                    <p className="text-xs text-muted-foreground font-semibold mb-2 uppercase tracking-wider">
                      Ixtisosliklari
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {lawyer.specialties.slice(0, 2).map((spec) => (
                        <span
                          key={spec}
                          className="text-xs px-2.5 py-1 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 text-primary border border-primary/20 hover:border-primary/40 transition-colors"
                        >
                          {spec}
                        </span>
                      ))}
                      {lawyer.specialties.length > 2 && (
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-secondary/80 text-muted-foreground border border-border">
                          +{lawyer.specialties.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

                  {/* Contact button */}
                  {lawyer.contact && (
                    <a
                      href={`tel:${lawyer.contact}`}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary/90 to-primary text-primary-foreground font-semibold text-sm hover:from-primary hover:to-accent transition-all duration-300 group-hover/card:shadow-lg group-hover/card:scale-105 active:scale-95"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="truncate">{lawyer.contact}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 flex-shrink-0 group-hover/card:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      {canScrollRight && (
        <div className="flex justify-center mt-6">
          <p className="text-xs text-muted-foreground/60 flex items-center gap-2">
            <ChevronRight className="h-3 w-3" />
            {"Scroll yoki tugmalarni ishlating"}
          </p>
        </div>
      )}
    </div>
  )
}
