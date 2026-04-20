"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, MapPin, Calendar } from "lucide-react"

const education = [
  {
    degree: "Master en Droit Fiscal",
    institution: "Institut Africain de Management (IAM)",
    location: "Dakar, Sénégal",
    period: "Sept. 2020 - Sept. 2022",
    description: "Spécialisation en fiscalité et droit des affaires. Graduation en ingénierie juridique et fiscale, ainsi qu'en management juriste et fiscal.",
  },
  {
    degree: "Licence en Droit",
    institution: "Académie Franco Américaine de Management (AFRAM)",
    location: "Libreville, Gabon",
    period: "Nov. 2016 - Avril 2017",
    description: "Formation juridique générale avec une orientation vers le droit des affaires et le droit civil. Base solide en carrières juridiques.",
  },
]

export function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="education" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Académique
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Formation <span className="text-gradient">Universitaire</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <div className="glass p-8 rounded-2xl h-full relative overflow-hidden">
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <GraduationCap className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">{edu.degree}</h3>
                    <p className="text-primary font-medium">{edu.institution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {edu.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {edu.period}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
