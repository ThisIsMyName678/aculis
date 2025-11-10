"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { ClientsSection } from "@/components/clients-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { RequestAccessModal } from "@/components/request-access-modal"
import { MobileStickyCTA } from "@/components/mobile-sticky-cta"

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="relative bg-white text-[#0b0b10] overflow-x-hidden">
      <Header onRequestAccess={() => setIsModalOpen(true)} />
      <HeroSection onRequestAccess={() => setIsModalOpen(true)} />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <UseCasesSection />
      <ClientsSection />
      <CTASection onRequestAccess={() => setIsModalOpen(true)} />
      <Footer onRequestAccess={() => setIsModalOpen(true)} />
      <MobileStickyCTA onRequestAccess={() => setIsModalOpen(true)} />
      <RequestAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
