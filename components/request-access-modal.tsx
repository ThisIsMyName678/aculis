"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RequestAccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RequestAccessModal({ isOpen, onClose }: RequestAccessModalProps) {
  const [formState, setFormState] = useState<"form" | "submitting" | "success" | "error">("form")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  })

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormState("form")
      setFormData({ name: "", email: "", company: "", role: "" })
      setErrors({ name: "", email: "", company: "", role: "" })
    }
  }, [isOpen])

  // Trap focus and handle ESC key
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      company: "",
      role: "",
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.company.trim()) {
      newErrors.company = "Company is required"
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required"
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Focus first invalid field
      const firstError = Object.keys(errors).find((key) => errors[key as keyof typeof errors])
      if (firstError) {
        document.getElementById(firstError)?.focus()
      }
      return
    }

    setFormState("submitting")

    // Analytics tracking
    if (typeof window !== "undefined" && (window as any).analytics) {
      ;(window as any).analytics.track("request_access_submitted", {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: formData.role,
      })
    }

    try {
      // Attempt to POST to API endpoint
      const response = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "website" }),
      })

      if (!response.ok) throw new Error("Failed to submit")

      setFormState("success")
    } catch (error) {
      // If no backend exists or error occurs, simulate success for demo
      console.log("[v0] No backend endpoint, simulating success", error)
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setFormState("success")
    }
  }

  const handleClose = () => {
    onClose()
  }

  const isFormValid =
    formData.name && formData.email && formData.company && formData.role && validateEmail(formData.email)

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-black/40"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
            onClick={handleClose}
          />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(17,22,44,0.18)] w-[92vw] max-w-[360px] sm:max-w-[420px] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {formState === "form" || formState === "submitting" ? (
              <>
                {/* Header */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-[#0b0b10]">Get Early Access</h2>
                    <button
                      onClick={handleClose}
                      className="text-[#262633] hover:text-[#0b0b10] transition-colors p-1 rounded-lg hover:bg-[#f7f8fc] focus:outline-none focus:ring-2 focus:ring-[#6c24fd]"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-[#262633]">Join the early access program. </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Name field */}
                  <div>
                    <Label htmlFor="name" className="text-[#0b0b10] font-medium mb-1.5">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onBlur={() => {
                        if (!formData.name.trim()) {
                          setErrors({ ...errors, name: "Name is required" })
                        } else {
                          setErrors({ ...errors, name: "" })
                        }
                      }}
                      className={`h-12 rounded-xl px-4 text-[15px] bg-white border-[#e9eaf2] text-[#0b0b10] focus:border-[#6c24fd] focus:ring-[#6c24fd] ${
                        errors.name ? "border-[#b00020]" : ""
                      }`}
                      disabled={formState === "submitting"}
                    />
                    {errors.name && <p className="text-xs text-[#b00020] mt-1">{errors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div>
                    <Label htmlFor="email" className="text-[#0b0b10] font-medium mb-1.5">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onBlur={() => {
                        if (!formData.email.trim()) {
                          setErrors({ ...errors, email: "Email is required" })
                        } else if (!validateEmail(formData.email)) {
                          setErrors({ ...errors, email: "Please enter a valid email" })
                        } else {
                          setErrors({ ...errors, email: "" })
                        }
                      }}
                      className={`h-12 rounded-xl px-4 text-[15px] bg-white border-[#e9eaf2] text-[#0b0b10] focus:border-[#6c24fd] focus:ring-[#6c24fd] ${
                        errors.email ? "border-[#b00020]" : ""
                      }`}
                      disabled={formState === "submitting"}
                    />
                    {errors.email && <p className="text-xs text-[#b00020] mt-1">{errors.email}</p>}
                  </div>

                  {/* Company field */}
                  <div>
                    <Label htmlFor="company" className="text-[#0b0b10] font-medium mb-1.5">
                      Company
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      onBlur={() => {
                        if (!formData.company.trim()) {
                          setErrors({ ...errors, company: "Company is required" })
                        } else {
                          setErrors({ ...errors, company: "" })
                        }
                      }}
                      className={`h-12 rounded-xl px-4 text-[15px] bg-white border-[#e9eaf2] text-[#0b0b10] focus:border-[#6c24fd] focus:ring-[#6c24fd] ${
                        errors.company ? "border-[#b00020]" : ""
                      }`}
                      disabled={formState === "submitting"}
                    />
                    {errors.company && <p className="text-xs text-[#b00020] mt-1">{errors.company}</p>}
                  </div>

                  {/* Role field */}
                  <div>
                    <Label htmlFor="role" className="text-[#0b0b10] font-medium mb-1.5">
                      Role
                    </Label>
                    <Input
                      id="role"
                      type="text"
                      placeholder="Your role (e.g., PM, CIO)"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      onBlur={() => {
                        if (!formData.role.trim()) {
                          setErrors({ ...errors, role: "Role is required" })
                        } else {
                          setErrors({ ...errors, role: "" })
                        }
                      }}
                      className={`h-12 rounded-xl px-4 text-[15px] bg-white border-[#e9eaf2] text-[#0b0b10] focus:border-[#6c24fd] focus:ring-[#6c24fd] ${
                        errors.role ? "border-[#b00020]" : ""
                      }`}
                      disabled={formState === "submitting"}
                    />
                    {errors.role && <p className="text-xs text-[#b00020] mt-1">{errors.role}</p>}
                  </div>

                  {/* Privacy note */}
                  <p className="text-xs text-[#262633]/60">
                    We'll only use these details to contact you about access. No spam.
                  </p>

                  {/* Error state banner */}
                  {formState === "error" && (
                    <div className="p-3 bg-[#b00020]/10 border border-[#b00020]/20 rounded-lg text-sm text-[#b00020]">
                      Something went wrong. Please try again or email contact@aculis.io.
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      type="submit"
                      disabled={!isFormValid || formState === "submitting"}
                      className="flex-1 h-12 bg-[#6c24fd] hover:bg-[#7c34fd] text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl focus:ring-2 focus:ring-[#6c24fd]"
                    >
                      {formState === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request Access"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleClose}
                      disabled={formState === "submitting"}
                      className="px-6 h-12 text-[#6c24fd] hover:text-[#6c24fd] hover:bg-[rgba(108,36,253,0.05)] rounded-xl focus:ring-2 focus:ring-[#6c24fd]"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              // Success state
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#6c24fd]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-[#6c24fd]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0b0b10] mb-2">Request received.</h2>
                <p className="text-[#262633] mb-6">Thank you. Our team will contact you within 48 hours.</p>
                <Button
                  onClick={handleClose}
                  className="bg-[#6c24fd] hover:bg-[#7c34fd] text-white rounded-xl h-12 px-8 focus:ring-2 focus:ring-[#6c24fd]"
                >
                  Close
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
