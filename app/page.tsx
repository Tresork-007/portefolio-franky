"use client"

import { Navigation } from "@/components/portfolio/navigation"
import { Hero } from "@/components/portfolio/hero"
import { About } from "@/components/portfolio/about"
import { Experience } from "@/components/portfolio/experience"
import { Education } from "@/components/portfolio/education"
import { Certifications } from "@/components/portfolio/certifications"
import { Teaching } from "@/components/portfolio/teaching"
import { Impact } from "@/components/portfolio/impact"
import { Skills } from "@/components/portfolio/skills"
import { Gallery } from "@/components/portfolio/gallery"
import { Leadership } from "@/components/portfolio/leadership"
import { Contact } from "@/components/portfolio/contact"
import { Footer } from "@/components/portfolio/footer"
import { Loader } from "@/components/portfolio/loader"

export default function Portfolio() {
  return (
    <>
      <Loader />
      <Navigation />
      <main className="overflow-hidden">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Certifications />
        <Teaching />
        <Impact />
        <Skills />
        <Gallery />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
