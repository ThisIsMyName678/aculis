"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const founders = [
  {
    name: "Dr. Sarah Chen",
    title: "Co-Founder & CEO",
    tagline: "Ex-Palantir",
    image: "/professional-woman-ceo-in-tech.jpg",
  },
  {
    name: "Michael Torres",
    title: "Co-Founder & CTO",
    tagline: "Ex-JP Morgan",
    image: "/professional-male-cto.png",
  },
  {
    name: "Dr. James Wilson",
    title: "Head of AI Research",
    tagline: "Ex-DeepMind",
    image: "/professional-ai-researcher.jpg",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 bg-white">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0b0b10]">Who We Are</h2>
          <p className="text-2xl text-[#262633] font-normal">Engineers. Analysts. Visionaries.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <FounderCard key={index} founder={founder} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FounderCard({
  founder,
  index,
}: {
  founder: (typeof founders)[0]
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
      <div className="relative overflow-hidden rounded-lg bg-white border border-[#e9eaf2] transition-all duration-200 hover:border-[#6c24fd]/50 shadow-[0_8px_32px_rgba(12,16,31,0.06)] hover:shadow-[0_12px_40px_rgba(108,36,253,0.15)]">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={founder.image || "/placeholder.svg"}
            alt={founder.name}
            className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
          />

          {/* Violet ambient light overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#6c24fd]/30 via-transparent to-transparent"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Tagline on hover */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="px-4 py-2 bg-[#6c24fd]/90 backdrop-blur-sm rounded-full text-sm font-medium text-white">
              {founder.tagline}
            </span>
          </motion.div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-1 text-[#0b0b10]">{founder.name}</h3>
          <p className="text-[#262633]">{founder.title}</p>
        </div>
      </div>
    </motion.div>
  )
}
