"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Scale, Laptop, Users } from "lucide-react"

const skillCategories = [
  {
    title: "Juridique & Assurance",
    icon: Scale,
    skills: [
      { name: "Droit des Assurances", level: 95 },
      { name: "Réglementation CIMA", level: 90 },
      { name: "Conformité LAB/FT", level: 92 },
      { name: "Droit Fiscal", level: 85 },
      { name: "Analyse Réglementaire", level: 88 },
    ],
  },
  {
    title: "Outils Techniques",
    icon: Laptop,
    skills: [
      { name: "Microsoft Word", level: 95 },
      { name: "Microsoft Excel", level: 88 },
      { name: "PowerPoint", level: 90 },
      { name: "Canva", level: 75 },
      { name: "Recherche Juridique", level: 92 },
    ],
  },
  {
    title: "Compétences Professionnelles",
    icon: Users,
    skills: [
      { name: "Leadership", level: 90 },
      { name: "Communication", level: 92 },
      { name: "Prise de Parole", level: 88 },
      { name: "Gestion de Projet", level: 85 },
      { name: "Travail d'Équipe", level: 95 },
    ],
  },
]

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{name}</span>
        <span className="text-primary font-medium">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        />
      </div>
    </div>
  )
}

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Compétences <span className="text-gradient">Clés</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              className="group"
            >
              <div className="glass p-8 rounded-2xl h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{category.title}</h3>
                </div>
                
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={categoryIndex * 0.2 + skillIndex * 0.1}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
