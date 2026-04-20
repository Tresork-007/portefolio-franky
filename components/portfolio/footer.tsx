"use client"

import { motion } from "framer-motion"
import { ArrowUp, Heart } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-background" />
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold mb-2">
              <span className="text-gradient">FME</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Expert en Droit des Assurances
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Fait avec</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>au Gabon</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <ArrowUp className="h-5 w-5 text-primary" />
          </motion.button>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Franky Mbomeyo Essono. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
