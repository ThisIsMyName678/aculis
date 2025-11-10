"use client"

import { motion } from "framer-motion"

interface CTASectionProps {
  onRequestAccess: () => void
}

export function CTASection({ onRequestAccess }: CTASectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-[112px] sm:py-32 pb-[calc(112px+env(safe-area-inset-bottom))] sm:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f7f8fc] to-white" />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6c24fd]/5 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <h2 className="text-3xl sm:text-5xl md:text-7xl leading-tight font-bold tracking-tight mb-8 text-balance text-[#0b0b10]">
          Be part of the future of{" "}
          <span className="bg-gradient-to-r from-[#6c24fd] to-[#8c44fd] bg-clip-text text-transparent">
            financial intelligence
          </span>
          .
        </h2>

        <p className="text-base sm:text-xl md:text-2xl text-slate-600 mb-4 font-normal">
          Join the early access program.
        </p>

        <p className="mt-4 text-base text-slate-500/90 tracking-wide leading-relaxed max-w-3xl mx-auto text-center mb-12">
          Trusted by top hedge funds, now opening early access to selected institutions.
        </p>

        <button
          onClick={onRequestAccess}
          aria-label="Request early access"
          className="hidden sm:inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold tracking-tight bg-gradient-to-r from-[#7C3AED] to-[#9F6BFF] shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F6BFF]/50"
        >
          Request Access
        </button>
      </motion.div>
    </section>
  )
}
