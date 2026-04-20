"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, MapPin, Send, Linkedin, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+241 065 38 71 83",
    href: "tel:+24106538713",
  },
  {
    icon: Mail,
    label: "Email",
    value: "frankymbomeyo@gmail.com",
    href: "mailto:frankymbomeyo@gmail.com",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "ONDOGO - Nzeng-Ayong, Libreville, Gabon",
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Franky Mbomeyo Essono",
    href: "https://linkedin.com/in/franky-mbomeyo",
  },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Contact
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Restons en <span className="text-gradient">Contact</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            N&apos;hésitez pas à me contacter pour toute collaboration, 
            formation ou conseil en droit des assurances.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6">Coordonnées</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass p-6 rounded-2xl">
              <p className="text-sm text-muted-foreground text-center">
                Disponible pour des consultations, formations et conférences 
                sur le droit des assurances et la régulation du marché.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6">Envoyez un message</h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message envoyé !</h4>
                  <p className="text-muted-foreground">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Envoyer un autre message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nom complet
                      </label>
                      <Input
                        id="name"
                        placeholder="Votre nom"
                        required
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Sujet
                    </label>
                    <Input
                      id="subject"
                      placeholder="Objet de votre message"
                      required
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Votre message..."
                      rows={5}
                      required
                      className="bg-secondary/50 border-border resize-none"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 glow"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Envoyer le message
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
