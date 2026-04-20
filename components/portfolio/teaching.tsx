"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BookOpen, Users, Mic, Award } from "lucide-react"

const teachings = [
  {
    title: "Droit des Assurances",
    subtitle: "Enseignant prestataire - Licence 3 Carrières Juridiques",
    institution: "Académie Franco Américaine de Management (AFRAM) - 2026",
    icon: BookOpen,
    description: "Enseignement approfondi des principes fondamentaux du droit des assurances, incluant les contrats, les obligations et la réglementation.",
  },
  {
    title: "Séminaires LAB/FT",
    subtitle: "Organisation & Animation",
    institution: "Direction Nationale des Assurances - 2024 & 2025",
    icon: Users,
    description: "Organisation et animation de séminaires sur la lutte anti-blanchiment et le financement du terrorisme avec les intermédiaires en assurance.",
  },
  {
    title: "Créateur de contenu",
    subtitle: "Vulgarisation du Droit des Assurances",
    institution: "Réseaux sociaux",
    icon: Mic,
    description: "Création de contenu éducatif sur les assurances: fonctionnement de la responsabilité civile, droits et obligations des conducteurs, assurance santé, prévoyance...",
  },
]

const topics = [
  "Responsabilité Civile",
  "Assurance Santé",
  "Droits des Assurés",
  "Obligations Contractuelles",
  "Régulation du Marché",
  "Conformité LAB/FT",
]

export function Teaching() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="teaching" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Transmission
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Enseignement & <span className="text-gradient">Masterclass</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Passionné par la transmission du savoir, je m&apos;engage à former 
            les futures générations de professionnels du droit des assurances.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {teachings.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div className="glass p-8 rounded-2xl h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                
                <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                <p className="text-primary text-sm font-medium mb-2">{item.subtitle}</p>
                <p className="text-xs text-muted-foreground mb-4">{item.institution}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Topics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold mb-6">Thématiques Abordées</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((topic, index) => (
              <motion.span
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default"
              >
                {topic}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
