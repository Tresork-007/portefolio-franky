"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Building2, FileSearch, Scale } from "lucide-react"

const experiences = [
  {
    title: "Chargé d'études",
    company: "Direction Nationale des Assurances",
    period: "Janvier 2024 - Présent",
    icon: Shield,
    color: "from-primary to-accent",
    tasks: [
      "Organisation du séminaire annuel sur le Blanchiment des capitaux (2024 & 2025)",
      "Rédaction des rapports annuels LAB/FT pour compagnies et intermédiaires",
      "Contrôle sur pièces et sur place des intermédiaires du secteur",
      "Surveillance permanente du marché des assurances",
    ],
  },
  {
    title: "Assistant Juridique & Archives",
    company: "Assemblée Nationale du Gabon",
    period: "Sept. 2017",
    icon: Scale,
    color: "from-accent to-primary",
    tasks: [
      "Assistant archive et documentation",
      "Assistant juridique au cabinet des archives",
      "Traitement de documents complexes selon le manuel de procédure",
    ],
  },
  {
    title: "Stagiaire Assistant Juridique",
    company: "Groupe CFAO Gabon",
    period: "Juillet - Sept. 2017",
    icon: Building2,
    color: "from-primary/80 to-accent/80",
    tasks: [
      "Stagiaire assistant juridique",
      "Responsable de pointage du personnel",
      "Support aux opérations juridiques",
    ],
  },
]

import { Shield } from "lucide-react"

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Parcours
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Expérience <span className="text-gradient">Professionnelle</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un parcours construit sur l&apos;expertise juridique et l&apos;engagement 
            envers l&apos;excellence professionnelle.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20 transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 glow z-10" />

              {/* Content Card */}
              <div className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass p-6 rounded-2xl group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} p-0.5 shrink-0`}>
                      <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                        <exp.icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{exp.title}</h3>
                      <p className="text-primary text-sm font-medium">{exp.company}</p>
                      <p className="text-muted-foreground text-sm">{exp.period}</p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.tasks.map((task, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        {task}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
