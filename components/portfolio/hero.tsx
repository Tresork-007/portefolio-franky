"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { ArrowDown, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const roles = [
  "Expert en Droit des Assurances",
  "Régulation du Marché",
  "Formation & Transmission",
  "Conférencier",
]

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
        
        {/* Floating orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Photo de profil */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
              {/* Glow effect behind photo */}
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
              
              {/* Photo container with glass border */}
              <div className="relative w-full h-full rounded-full p-1 glass glow">
                <div className="w-full h-full rounded-full overflow-hidden bg-secondary">
                  {/* Photo placeholder - remplacez src par votre photo */}
                  <img
                    src="/images/profile.jpg"
                    alt="Franky Mbomeyo Essono"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback si l'image n'existe pas
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                  {/* Initiales comme fallback */}
                  <div className="hidden w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary">FME</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-dashed border-primary/30"
              />
            </div>
          </motion.div>

          {/* Texte */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full glass text-sm text-primary font-medium">
                Direction Nationale des Assurances • Gabon
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              <span className="block text-foreground">Franky</span>
              <span className="block text-gradient">Mbomeyo Essono</span>
            </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-12 mb-8"
        >
          <motion.p
            key={currentRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-xl md:text-2xl text-muted-foreground"
          >
            {roles[currentRole]}
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed"
        >
          Chargé d&apos;études passionné par la protection des assurés et la régulation
          du marché des assurances. Formateur engagé dans la transmission du savoir juridique.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 glow"
            onClick={() => scrollToSection("#about")}
          >
            <FileText className="mr-2 h-5 w-5" />
            Voir mon parcours
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:bg-secondary/50 px-8"
            onClick={() => scrollToSection("#contact")}
          >
            <Mail className="mr-2 h-5 w-5" />
            Me contacter
          </Button>
        </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() => scrollToSection("#about")}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
