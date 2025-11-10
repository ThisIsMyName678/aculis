"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LightParticles } from "@/components/light-particles"

interface HeroSectionProps {
  onRequestAccess: () => void
}

export function HeroSection({ onRequestAccess }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCtaHovered, setIsCtaHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault()
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleRequestAccess = () => {
    setIsModalOpen(true)
    onRequestAccess()
  }

  useEffect(() => {
    const checkModalClosed = () => {
      const modal = document.querySelector('[role="dialog"]')
      if (!modal) {
        setIsModalOpen(false)
      }
    }
    const interval = setInterval(checkModalClosed, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8f9fb]/40 to-white" />

      <motion.div style={{ opacity, scale }} className="absolute inset-0 flex items-center justify-center">
        <LightParticles />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[1200px] mx-auto py-10 sm:py-[96px] md:py-[140px] pb-[calc(96px+env(safe-area-inset-bottom))] sm:pb-[96px] md:pb-[140px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0, ease: [0.32, 0.08, 0.24, 1] }}
          className="text-[36px] leading-[1.05] sm:text-[56px] sm:leading-[0.98] md:text-[88px] font-extrabold tracking-tight mb-6 text-balance text-[#0b0b10]"
        >
          The operations behind{" "}
          <span className="text-[#6c24fd]">
            <span className="inline sm:inline">your</span> <span className="block sm:inline">brains</span>
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.08, ease: [0.32, 0.08, 0.24, 1] }}
          className="text-base sm:text-lg md:text-xl text-slate-600 mt-3 mb-2 font-normal leading-[1.5] max-w-[760px] mx-auto"
        >
          AI-powered data infrastructure for hedge funds and banks.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.16, ease: [0.32, 0.08, 0.24, 1] }}
          className="text-xs text-[#262633]/70 mb-10 md:mb-12"
        >
          Trusted by leading funds & banks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.24, ease: [0.32, 0.08, 0.24, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <Button
            size="lg"
            onClick={handleRequestAccess}
            onMouseEnter={() => setIsCtaHovered(true)}
            onMouseLeave={() => setIsCtaHovered(false)}
            aria-label="Open early access request form"
            className="relative px-7 h-[52px] md:h-[56px] text-base md:text-lg bg-[#6c24fd] hover:bg-[#7c34fd] text-white rounded-[16px] transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] hover:shadow-[0_0_24px_rgba(108,36,253,0.4)] focus:outline-none focus:ring-2 focus:ring-[#6c24fd] focus:ring-offset-2"
          >
            Request Early Access
          </Button>

          <a
            href="#about"
            onClick={scrollToAbout}
            className="text-[#262633] hover:text-[#0b0b10] font-medium transition-[color,transform,opacity] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:underline underline-offset-4 hover:scale-[1.01]"
          >
            Learn more
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: scrolled || isModalOpen ? 0 : isCtaHovered ? 0.4 : 0.6,
          }}
          transition={{ duration: isModalOpen ? 0 : 0.6 }}
          className="mt-[30px] flex justify-center pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            animate={
              isCtaHovered
                ? {}
                : {
                    y: [-8, 8, -8],
                  }
            }
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="hover:opacity-85 transition-opacity duration-200"
            style={{
              filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.04))",
            }}
          >
            <div className="w-[22px] h-[38px] border border-[#d8d9e2] rounded-full flex items-start justify-center pt-[6px] bg-transparent">
              <motion.div
                className="w-[6px] h-[6px] bg-[#6c24fd] rounded-full"
                animate={
                  isCtaHovered
                    ? {}
                    : {
                        scale: [1, 1.1, 1],
                      }
                }
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
