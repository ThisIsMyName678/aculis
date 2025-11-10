"use client"

import { useEffect, useRef } from "react"

export function ParticlesBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    // Particle system
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
    }> = []

    const maxParticles = 200
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Create initial particles
    for (let i = 0; i < maxParticles; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 150
      particles.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random(),
      })
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 13, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((p, i) => {
        // Move particle
        p.x += p.vx
        p.y += p.vy

        // Orbit around center
        const dx = centerX - p.x
        const dy = centerY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 10) {
          p.vx += (dx / dist) * 0.02
          p.vy += (dy / dist) * 0.02
        }

        // Damping
        p.vx *= 0.99
        p.vy *= 0.99

        // Draw particle
        const alpha = Math.sin(p.life * Math.PI) * 0.8
        ctx.fillStyle = `rgba(108, 36, 253, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections
        particles.forEach((p2, j) => {
          if (i >= j) return
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.strokeStyle = `rgba(108, 36, 253, ${(1 - dist / 100) * 0.3})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        })

        // Update life
        p.life += 0.005
        if (p.life > 1) p.life = 0
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "screen" }} />
}
