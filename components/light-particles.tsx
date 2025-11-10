"use client"

import { useEffect, useRef } from "react"

export function LightParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const resize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      resize()

      // Draw static particles with reduced opacity
      const particles = 20
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles; i++) {
        ctx.fillStyle = "rgba(108, 36, 253, 0.03)"
        ctx.beginPath()
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2 + 1, 0, Math.PI * 2)
        ctx.fill()
      }
      return
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const isMobile = window.innerWidth < 768
    const particleCount = isMobile ? 23 : 37

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
    }> = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1,
      })
    }

    let animationFrameId: number

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles with lilac color at low opacity
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with specified opacity
        ctx.fillStyle = "rgba(108, 36, 253, 0.06)"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
