"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const useCases = [
  {
    title: "Risk Signal Prediction",
    description: "AI identifies instability before it becomes risk.",
    gradient: "from-purple-600/10 to-fuchsia-600/10",
    emphasized: true,
  },
  {
    title: "Hedge Fund Portfolio Analysis",
    description: "Optimize exposure with real-time clarity.",
    gradient: "from-violet-600/10 to-purple-600/10",
  },
  {
    title: "Market Sentiment Tracking",
    description: "Read the market's mood - before the market does.",
    gradient: "from-fuchsia-600/10 to-pink-600/10",
  },
]

export function UseCasesSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-[112px] sm:py-32 pb-[calc(112px+env(safe-area-inset-bottom))] sm:pb-32 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-black/10 after:to-transparent after:opacity-5">
      <div className="absolute inset-0 bg-white" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-2xl sm:text-4xl md:text-5xl leading-tight font-bold text-center mb-6 text-[#0b0b10]"
        >
          From hedge funds to banks – <span className="text-[#6c24fd]">one intelligence layer</span> redefining how
          institutions see the market.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mt-16">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={index} useCase={useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function UseCaseCard({
  useCase,
  index,
}: {
  useCase: (typeof useCases)[0]
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className={`relative bg-white backdrop-blur-sm border border-[#e9eaf2] rounded-lg p-8 h-full overflow-hidden transition-all duration-200 hover:border-[#6c24fd]/50 ${
          useCase.emphasized ? "shadow-[0_12px_48px_rgba(108,36,253,0.12)]" : "shadow-[0_8px_32px_rgba(12,16,31,0.06)]"
        }`}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 transition-opacity duration-200`}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Data particles animation */}
        {isHovered && <FloatingParticles />}

        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4 text-balance text-[#0b0b10]">{useCase.title}</h3>
          <p className="text-[#262633] leading-relaxed">{useCase.description}</p>
        </div>

        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{
            boxShadow: isHovered ? "0 0 48px rgba(108, 36, 253, 0.3), inset 0 0 24px rgba(108, 36, 253, 0.1)" : "none",
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        />
      </motion.div>
    </motion.div>
  )
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#6c24fd] rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
