"use client"

import { motion } from "framer-motion"

export function ClientsSection() {
  return (
    <section className="relative py-32 bg-gradient-to-b from-[#f7f8fc] to-white">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#0b0b10]"
        >
          Trusted by leaders in finance.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(88px,auto)] items-center justify-items-center mt-16">
          {[...Array(8)].map((_, i) => (
            <LogoPlaceholder key={i} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-[#262633] mt-20 text-lg"
        >
          Trusted by 50+ leading institutions – from top US hedge funds to global banks.
        </motion.p>
      </div>
    </section>
  )
}

function LogoPlaceholder({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative w-full"
    >
      <div className="relative w-full h-20 sm:h-24 rounded-xl overflow-hidden bg-white/70 shadow-sm border border-gray-200/50 flex items-center justify-center">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#6c24fd]/[0.02] to-transparent" />

        <span className="relative z-10 text-xs font-semibold tracking-wider text-gray-400 select-none">LOGO</span>

        {/* Optional: Abstract shape suggestion */}
        <div className="absolute inset-4 rounded border-2 border-gray-200/40 blur-[1px]" />
      </div>
    </motion.div>
  )
}
