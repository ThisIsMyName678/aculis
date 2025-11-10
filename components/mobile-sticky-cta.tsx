"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface MobileStickyCTAProps {
  onRequestAccess: () => void
}

export function MobileStickyCTA({ onRequestAccess }: MobileStickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="fixed bottom-0 inset-x-0 z-[70] px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 sm:hidden bg-gradient-to-t from-white/95 to-white/0 backdrop-blur"
        >
          <Button
            onClick={onRequestAccess}
            aria-label="Request early access"
            className="w-full h-14 bg-[#6c24fd] hover:bg-[#7c34fd] text-white rounded-xl font-semibold text-base tracking-tight shadow-sm transition-all duration-200"
          >
            Request Early Access
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
