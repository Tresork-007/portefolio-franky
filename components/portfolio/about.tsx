"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Shield, Users, Target, Award } from "lucide-react"

const traits = [
  {
    icon: Shield,
    title: "Rigoureux",
    description: "Approche méthodique et précise dans l'analyse réglementaire",
  },
  {
    icon: Users,
    title: "Collaboratif",
    description: "Travail d'équipe et partage des connaissances",
  },
  {
    icon: Target,
    title: "Orienté Résultats",
    description: "Focus sur l'impact et l'efficacité des actions",
  },
  {
    icon: Award,
    title: "Engagé",
    description: "Dédié à la formation et la transmission du savoir",
  },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            À Propos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Profil <span className="text-gradient">Professionnel</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass p-8 rounded-2xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                En tant que <span className="text-foreground font-medium">Chargé d&apos;études</span> à 
                la Direction Nationale des Assurances du Gabon, je me consacre à la 
                <span className="text-primary font-medium"> protection des assurés</span> et 
                à la régulation rigoureuse du marché des assurances.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Mon parcours est guidé par une <span className="text-foreground font-medium">discipline exemplaire</span> et 
                un dynamisme constant. Je crois fermement en la puissance de la 
                <span className="text-primary font-medium"> transmission du savoir</span>, 
                c&apos;est pourquoi je m&apos;investis dans la formation et le mentorat des nouvelles générations.
              </p>
            </div>

            <div className="glass p-8 rounded-2xl">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Sociable et orienté vers les résultats, je développe des relations professionnelles 
                solides et durables. Mon engagement s&apos;étend au-delà du cadre professionnel, 
                notamment à travers mon rôle de <span className="text-primary font-medium">Directeur Exécutif</span> de 
                l&apos;ONG &quot;Les Hommes Intègres&quot;.
              </p>
            </div>
          </motion.div>

          {/* Traits Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {traits.map((trait, index) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-6 rounded-2xl text-center group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <trait.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{trait.title}</h3>
                <p className="text-sm text-muted-foreground">{trait.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
