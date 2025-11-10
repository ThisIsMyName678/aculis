"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center py-[112px] sm:py-[140px] md:py-[100px] pb-[calc(112px+env(safe-area-inset-bottom))] sm:pb-[140px] md:pb-[100px] overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-black/10 after:to-transparent after:opacity-5"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#f9f8ff]" />

      <DataNoiseLayer />

      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#6c24fd] opacity-10 -translate-x-1/2" />

      {/* Animated data streams */}
      <DataStreams />

      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none z-[1]"
      />

      <div className="relative z-10 text-center px-6 max-w-[820px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-3"
        >
          <span className="block font-extrabold text-[#0b0b10]">Billions of data points.</span> <ZeroClarityText />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.9,
            delay: 0.85,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="text-base sm:text-xl md:text-2xl lg:text-3xl text-slate-600 font-normal mt-7"
        >
          Markets move faster than human analysis can.
        </motion.p>
      </div>
    </section>
  )
}

function ZeroClarityText() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.span
      initial={{ opacity: 0, y: 30, color: "#0b0b10" }}
      whileInView={{ opacity: 1, y: 0, color: "#7a7a8c" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        opacity: { duration: 0.9, delay: 0.45, ease: [0.19, 1, 0.22, 1] },
        y: { duration: 0.9, delay: 0.45, ease: [0.19, 1, 0.22, 1] },
        color: { duration: 1.2, delay: 0.45, ease: "easeOut" },
      }}
      animate={{
        color: isHovered ? "#0b0b10" : "#7a7a8c",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block font-bold cursor-default"
      style={{
        transition: "color 0.4s ease-in-out",
      }}
    >
      Zero clarity.
    </motion.span>
  )
}

function DataNoiseLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    // Generate static noise
    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const pixels = imageData.data

      for (let i = 0; i < pixels.length; i += 4) {
        const value = Math.random() * 255
        pixels[i] = value // R
        pixels[i + 1] = value // G
        pixels[i + 2] = value // B
        pixels[i + 3] = 15 // Alpha (~0.06 opacity)
      }

      ctx.putImageData(imageData, 0, 0)
    }

    drawNoise()

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function DataStreams() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    const isMobile = window.innerWidth < 768
    const columnSpacing = isMobile ? 40 : 20
    const columns = Math.floor(canvas.width / columnSpacing)
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    let animationId: number
    const draw = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(108, 36, 253, 0.08)"
      ctx.font = "10px monospace"

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0"
        ctx.fillText(text, i * columnSpacing, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40" />
}
