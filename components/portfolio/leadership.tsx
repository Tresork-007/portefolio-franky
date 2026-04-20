"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Crown, Users, Award, Handshake } from "lucide-react"

const leadershipRoles = [
  {
    icon: Crown,
    title: "Président des Étudiants et Élèves Gabonais",
    organization: "Communauté Gabonaise du Sénégal",
    period: "2021 - 2022",
    description: "Représentation et coordination de la communauté estudiantine gabonaise à Dakar.",
  },
  {
    icon: Users,
    title: "Président du Conseil des Sages",
    organization: "Institut Africain de Management (IAM)",
    period: "2019 - 2020",
    description: "Direction des instances consultatives et médiation au sein de l'établissement.",
  },
  {
    icon: Handshake,
    title: "Secrétaire Général Adjoint",
    organization: "Mutuelle des étudiants AFRAM Gabon",
    period: "2016 - 2017",
    description: "Gestion administrative et coordination des activités estudiantines.",
  },
  {
    icon: Award,
    title: "Directeur Exécutif",
    organization: "ONG Les Hommes Intègres",
    period: "2025 - 2026",
    description: "Leadership d'une organisation engagée pour l'intégrité et le développement communautaire.",
  },
]

export function Leadership() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="leadership" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Engagement
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Leadership & <span className="text-gradient">Responsabilités</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des rôles de leadership qui témoignent d&apos;un engagement 
            constant envers la communauté et l&apos;excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {leadershipRoles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div className="glass p-6 rounded-2xl h-full relative overflow-hidden">
                {/* Badge decoration */}
                <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                
                <div className="flex items-start gap-4 relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent p-0.5 shrink-0">
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <role.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-lg">{role.title}</h3>
                    </div>
                    <p className="text-primary text-sm font-medium">{role.organization}</p>
                    <p className="text-xs text-muted-foreground mb-3">{role.period}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
