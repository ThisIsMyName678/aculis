"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const steps = [
  {
    title: "Ingest",
    description: "Aculis connects to global data streams in real time.",
    icon: "⟳",
  },
  {
    title: "Analyze",
    description: "AI-driven models uncover signals invisible to human analysts.",
    icon: "◈",
  },
  {
    title: "Decide",
    description: "Actionable insights empower faster, smarter decisions.",
    icon: "◆",
  },
]

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-[112px] sm:py-32 pb-[calc(112px+env(safe-area-inset-bottom))] sm:pb-32 overflow-hidden bg-white after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-black/10 after:to-transparent after:opacity-5"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-white via-[#f7f8fc] to-white"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-center text-lg text-[#6c24fd] font-medium mb-4"
        >
          From raw data to real-time investment intelligence.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-20 text-[#0b0b10]"
        >
          How It Works
        </motion.h2>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9D7CFF] to-transparent opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#9D7CFF] to-transparent opacity-60 blur-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-12 relative">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      <div className="relative bg-white backdrop-blur-sm border border-[#e9eaf2] rounded-2xl p-5 sm:p-8 transition-all duration-500 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(108,36,253,0.2)] hover:border-[#6c24fd]/60">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#6c24fd]/0 via-[#6c24fd]/5 to-[#6c24fd]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.div
          className="relative w-14 sm:w-16 h-14 sm:h-16 mb-6 flex items-center justify-center text-3xl sm:text-4xl bg-[#6c24fd]/10 rounded-full border border-[#6c24fd]/20 group-hover:bg-[#6c24fd]/20 group-hover:border-[#6c24fd]/40 transition-all duration-500"
          whileHover={{ scale: 1.1, rotate: 180 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {step.icon}
        </motion.div>

        <h3 className="text-lg sm:text-2xl font-semibold mb-3 text-[#0b0b10]">{step.title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{step.description}</p>

        <div className="absolute top-4 right-4 text-5xl sm:text-6xl font-light text-[#6c24fd] opacity-[0.08] group-hover:opacity-[0.15] transition-colors duration-500">
          {index + 1}
        </div>
      </div>
    </motion.div>
  )
}
