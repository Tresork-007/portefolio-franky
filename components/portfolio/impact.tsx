"use client"

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { TrendingUp, FileText, Users, Heart } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    value: 5,
    suffix: "+",
    label: "Séminaires organisés",
    description: "Formation LAB/FT 2024-2025",
  },
  {
    icon: FileText,
    value: 10,
    suffix: "+",
    label: "Rapports annuels",
    description: "Analyses réglementaires",
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "Professionnels formés",
    description: "Acteurs du secteur",
  },
  {
    icon: Heart,
    value: 3,
    suffix: "",
    label: "Années d'engagement",
    description: "ONG Les Hommes Intègres",
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
      })
      return () => controls.stop()
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-gradient">
      {displayValue}{suffix}
    </span>
  )
}

const achievements = [
  {
    title: "Organisation de séminaires sur le blanchiment",
    period: "2024-2025",
    description: "Conception et animation de formations spécialisées pour les professionnels du secteur des assurances.",
  },
  {
    title: "Rédaction de rapports annuels",
    period: "2024",
    description: "Élaboration de rapports d'analyse réglementaire et de surveillance du marché.",
  },
  {
    title: "Supervision du marché des assurances",
    period: "En cours",
    description: "Suivi continu des acteurs et veille réglementaire pour la protection des assurés.",
  },
  {
    title: "Direction Exécutive - ONG Les Hommes Intègres",
    period: "2022 - Présent",
    description: "Leadership d'une organisation engagée pour l'intégrité et le développement communautaire.",
  },
]

export function Impact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="impact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Réalisations
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Impact <span className="text-gradient">Professionnel</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="glass p-6 rounded-2xl text-center h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="font-medium mt-2">{stat.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <div className="max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl font-bold text-center mb-8"
          >
            Contributions Majeures
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-2xl"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <span className="text-xs text-primary font-medium px-2 py-1 rounded-full bg-primary/10 shrink-0">
                    {achievement.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
