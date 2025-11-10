"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onRequestAccess: () => void
}

export function Header({ onRequestAccess }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#eee] shadow-[0_2px_12px_rgba(17,17,31,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[44px] h-16 md:h-[72px] flex items-center justify-between gap-4">
        <a href="/" className="flex items-center shrink-0" aria-label="ACULIS.IO Home">
          <Image
            src="https://framerusercontent.com/images/g2wdryUFG21TyXhGWmtSmjyS68.svg?scale-down-to=512"
            alt="ACULIS.IO"
            width={140}
            height={28}
            className="h-[20px] sm:h-[22px] md:h-[28px] w-auto"
            priority
          />
        </a>

        <Button
          onClick={onRequestAccess}
          variant="ghost"
          aria-label="Open early access request form"
          className="px-[14px] sm:px-[18px] py-[10px] min-h-[44px] min-w-[44px] h-auto border-[1.5px] border-[#6c24fd] text-[#6c24fd] bg-transparent hover:!bg-[#6c24fd] hover:text-white active:bg-[#6c24fd] active:text-white rounded-[12px] font-semibold text-xs sm:text-sm transition-all duration-[420ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.015] focus:outline-none focus:ring-2 focus:ring-[#6c24fd] focus:ring-offset-2 whitespace-nowrap will-change-[transform,background-color,color]"
        >
          Request Access
        </Button>
      </div>
    </motion.header>
  )
}
