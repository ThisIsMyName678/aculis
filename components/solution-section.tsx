"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3], [60, 0])
  const visualOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-[112px] sm:py-32 pb-[calc(112px+env(safe-area-inset-bottom))] sm:pb-32 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-black/10 after:to-transparent after:opacity-5"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#9D7CFF]/[0.02]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div style={{ opacity, y }}>
            <h2 className="text-3xl sm:text-5xl md:text-6xl leading-tight font-bold tracking-tight mb-6 text-[#0b0b10]">
              Where chaos becomes{" "}
              <span className="bg-gradient-to-r from-[#6c24fd] to-[#8c44fd] bg-clip-text text-transparent">
                clarity
              </span>
              .
            </h2>

            <p className="text-base sm:text-lg text-slate-600 mb-8 leading-relaxed">
              Aculis unifies financial data, analyzes it through proprietary intelligence models, and delivers insights
              before the market reacts.
            </p>

            <p className="text-sm sm:text-base text-[#262633] mb-8 leading-relaxed">
              Aculis was built to see what human analysis can&#39;t , connecting hundreds of market signals into one
              stream of clarity.
            </p>

            <motion.blockquote
              className="text-xl text-[#262633] italic border-l-[3px] border-[#6c24fd] pl-6 transition-all duration-500"
              whileHover={{
                borderLeftColor: "#8c44fd",
                paddingLeft: "1.75rem",
                textShadow: "0 0 20px rgba(108, 36, 253, 0.15)",
              }}
            >
              “Aculis sees what markets miss.”
            </motion.blockquote>
          </motion.div>

          <motion.div
            style={{ opacity: visualOpacity }}
            className="relative h-[320px] sm:h-96 flex items-center justify-center pb-8"
          >
            <ConvergingDataStreams />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ConvergingDataStreams() {
  const [isHovered, setIsHovered] = useState(false)

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const foregroundCount = 24
  const backgroundCount = 18
  const dustParticleCount = 40

  return (
    <div
      className="relative w-full max-w-md aspect-square flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(108,36,253,0.35) 0%, rgba(255,255,255,0) 70%)",
          maskImage: "radial-gradient(circle, black 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 100%)",
        }}
      />

      <motion.div
        className="absolute w-3 h-3 rounded-full bg-[#6C24FD] z-20"
        animate={prefersReducedMotion ? {} : { scale: [1, 1.04, 1] }}
        transition={prefersReducedMotion ? {} : { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-24 h-24 rounded-full bg-[#C6A7FF] blur-2xl z-10"
        animate={prefersReducedMotion ? {} : { opacity: [0.35, 0.5, 0.35], scale: [1, 1.15, 1] }}
        transition={prefersReducedMotion ? {} : { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {[...Array(dustParticleCount)].map((_, i) => {
        const angle = Math.random() * 360
        const startDistance = 140 + Math.random() * 80
        const startX = 50 + Math.cos((angle * Math.PI) / 180) * (startDistance / 4)
        const startY = 50 + Math.sin((angle * Math.PI) / 180) * (startDistance / 4)
        const duration = 6 + Math.random() * 3
        const delay = Math.random() * 5

        return (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-0.5 h-0.5 rounded-full bg-[#9D7CFF]"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: [`0%`, `${(50 - startX) * 0.85}%`],
                    y: [`0%`, `${(50 - startY) * 0.85}%`],
                    opacity: [0, 0.15, 0.2, 0],
                    scale: [0.3, 0.8, 0],
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : { duration: duration, repeat: Number.POSITIVE_INFINITY, delay: delay, ease: "easeOut" }
            }
          />
        )
      })}

      {/* Background lines layer */}
      {[...Array(backgroundCount)].map((_, i) => {
        const baseAngle = (i * 360) / backgroundCount + (Math.random() * 15 - 7.5)
        const hoverAngleShift = isHovered ? Math.random() * 5 - 2.5 : 0
        const angle = baseAngle + hoverAngleShift
        const startDistance = 180 + Math.random() * 50
        const duration = 4 + Math.random() * 1.5
        const delay = 0.3 + (i * duration) / backgroundCount

        const startX = 50 + Math.cos((angle * Math.PI) / 180) * (startDistance / 4)
        const startY = 50 + Math.sin((angle * Math.PI) / 180) * (startDistance / 4)

        return (
          <motion.div
            key={`bg-${i}`}
            className="absolute w-full h-full"
            style={{
              left: 0,
              top: 0,
            }}
            animate={
              isHovered && !prefersReducedMotion
                ? {
                    x: [(Math.random() - 0.5) * 2, 0],
                    y: [(Math.random() - 0.5) * 2, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <motion.line
                x1={`${startX}%`}
                y1={`${startY}%`}
                x2="50%"
                y2="50%"
                stroke="#9D7CFF"
                strokeWidth="0.25"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={prefersReducedMotion ? {} : { pathLength: [0, 0.95, 1], opacity: [0, 0.4, 0] }}
                transition={
                  prefersReducedMotion
                    ? {}
                    : {
                        duration: duration,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: delay,
                        ease: [0.25, 0.8, 0.5, 1],
                        times: [0, 0.85, 1],
                      }
                }
              />

              <motion.circle
                cx={`${startX}%`}
                cy={`${startY}%`}
                r="0.3"
                fill="#C6A7FF"
                initial={{ opacity: 0 }}
                animate={prefersReducedMotion ? {} : { opacity: [0, 0.3, 0] }}
                transition={
                  prefersReducedMotion
                    ? {}
                    : { duration: duration, repeat: Number.POSITIVE_INFINITY, delay: delay, ease: "easeOut" }
                }
              />
            </svg>
          </motion.div>
        )
      })}

      {/* Foreground lines layer */}
      {[...Array(foregroundCount)].map((_, i) => {
        const baseAngle = (i * 360) / foregroundCount + (Math.random() * 12 - 6)
        const hoverAngleShift = isHovered ? Math.random() * 6 - 3 : 0
        const angle = baseAngle + hoverAngleShift
        const startDistance = 160 + Math.random() * 30
        const duration = 3 + Math.random() * 1
        const delay = 0.3 + (i * duration) / foregroundCount

        const startX = 50 + Math.cos((angle * Math.PI) / 180) * (startDistance / 4)
        const startY = 50 + Math.sin((angle * Math.PI) / 180) * (startDistance / 4)

        return (
          <motion.div
            key={`fg-${i}`}
            className="absolute w-full h-full"
            style={{
              left: 0,
              top: 0,
              zIndex: 5,
            }}
            animate={
              isHovered && !prefersReducedMotion
                ? {
                    x: [(Math.random() - 0.5) * 3, 0],
                    y: [(Math.random() - 0.5) * 3, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <motion.line
                x1={`${startX}%`}
                y1={`${startY}%`}
                x2="50%"
                y2="50%"
                stroke="#8C44FD"
                strokeWidth="0.35"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={prefersReducedMotion ? {} : { pathLength: [0, 0.95, 1], opacity: [0, 0.85, 0] }}
                transition={
                  prefersReducedMotion
                    ? {}
                    : {
                        duration: duration,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: delay,
                        ease: [0.25, 0.8, 0.5, 1],
                        times: [0, 0.85, 1],
                      }
                }
              />

              <motion.circle
                cx={`${startX}%`}
                cy={`${startY}%`}
                r="0.5"
                fill="#9D7CFF"
                initial={{ opacity: 0 }}
                animate={prefersReducedMotion ? {} : { opacity: [0, 0.8, 0] }}
                transition={
                  prefersReducedMotion
                    ? {}
                    : { duration: duration, repeat: Number.POSITIVE_INFINITY, delay: delay, ease: "easeOut" }
                }
              />
            </svg>
          </motion.div>
        )
      })}

      {/* Additional subtle particles for depth */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 360) / 8 + 22.5
        const startDistance = 35
        const startX = 50 + Math.cos((angle * Math.PI) / 180) * startDistance
        const startY = 50 + Math.sin((angle * Math.PI) / 180) * startDistance
        const duration = 3.5 + Math.random() * 0.5

        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-[#9D7CFF]/40"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: [`0%`, `${(50 - startX) * 0.9}%`],
                    y: [`0%`, `${(50 - startY) * 0.9}%`],
                    opacity: [0, 0.5, 0],
                    scale: [0.5, 1, 0],
                  }
            }
            transition={
              prefersReducedMotion
                ? {}
                : { duration: duration, repeat: Number.POSITIVE_INFINITY, delay: 0.3 + i * 0.4, ease: "easeOut" }
            }
          />
        )
      })}
    </div>
  )
}
