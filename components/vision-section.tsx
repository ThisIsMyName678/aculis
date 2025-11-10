"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
    >
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.2 }}>
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#lineGradient)"
          strokeWidth="2"
          strokeDasharray="10 5"
          style={{
            pathLength: scrollYProgress,
          }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6c24fd" stopOpacity="0" />
            <stop offset="50%" stopColor="#6c24fd" stopOpacity="1" />
            <stop offset="100%" stopColor="#6c24fd" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div className="absolute inset-0 bg-gradient-to-b from-white via-[#f7f8fc] to-white" style={{ opacity }} />

      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-[#0b0b10]">
          Building the{" "}
          <span className="bg-gradient-to-r from-[#6c24fd] to-[#8c44fd] bg-clip-text text-transparent">
            cognitive infrastructure
          </span>{" "}
          of finance.
        </h2>
        <p className="text-2xl md:text-3xl text-[#262633] font-normal">
          Turning raw data into collective intelligence.
        </p>
      </motion.div>

      {/* Depth particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#6c24fd] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </section>
  )
}
