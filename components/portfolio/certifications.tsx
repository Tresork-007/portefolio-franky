"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Award, ExternalLink, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Données statiques des certifications (les URLs PDF seront chargées depuis Blob)
const certificationsData = [
  {
    id: "labft",
    title: "Techniques et Signaux d'alertes LAB/FT",
    organization: "CIMA - Direction Nationale des Assurances",
    description: "Formation sur les techniques et signaux d'alertes du Dispositif de Lutte Anti-Blanchiment et Contre le Financement du Terrorisme dans le secteur des assurances.",
    year: "2024",
    color: "from-primary to-blue-500",
  },
  {
    id: "sauvegarde",
    title: "Sauvegarde des intérêts des assurés",
    organization: "SCG-Ré - Direction Nationale des Assurances",
    description: "Renforcement de la surveillance permanente du marché par le contrôle sur pièces et sur place des intermédiaires du secteur des assurances au Gabon.",
    year: "2025",
    color: "from-accent to-primary",
  },
  {
    id: "prise-parole",
    title: "Prise de Parole en Public et Leadership",
    organization: "Cabinet Astuce Réelle Image SUARL",
    description: "Techniques avancées de communication, présentation et leadership pour les professionnels du droit et de la finance.",
    year: "2024",
    color: "from-blue-500 to-accent",
  },
  {
    id: "ethique",
    title: "L'Éthique dans le secteur du développement",
    organization: "DisasterReady.org",
    description: "Principes éthiques et responsabilité sociale dans le contexte du développement professionnel et organisationnel.",
    year: "2025",
    color: "from-primary to-accent",
  },
  {
    id: "gestion-projet",
    title: "Les Fondamentaux de la Gestion de Projet",
    organization: "DisasterReady.org",
    description: "Méthodologies de gestion de projet et leadership organisationnel pour des environnements professionnels complexes.",
    year: "2025",
    color: "from-blue-500 to-primary",
  },
]

interface BlobDocument {
  url: string
  pathname: string
  filename: string
}

type Certification = typeof certificationsData[0] & { pdfUrl?: string }

export function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [certifications, setCertifications] = useState<Certification[]>(certificationsData)

  // Charger les PDFs depuis Vercel Blob
  useEffect(() => {
    async function loadPdfUrls() {
      try {
        const response = await fetch("/api/documents")
        if (!response.ok) return
        
        const data = await response.json()
        const certDocs = data.grouped?.certifications || []
        
        // Associer les PDFs aux certifications par nom de fichier
        const updatedCerts = certificationsData.map((cert) => {
          const matchingDoc = certDocs.find((doc: BlobDocument) => 
            doc.filename.toLowerCase().includes(cert.id.toLowerCase())
          )
          return {
            ...cert,
            pdfUrl: matchingDoc?.url,
          }
        })
        
        setCertifications(updatedCerts)
      } catch (error) {
        console.error("Erreur chargement PDFs:", error)
      }
    }
    
    loadPdfUrls()
  }, [])

  return (
    <section id="certifications" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Qualifications
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Certifications & <span className="text-gradient">Accréditations</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des certifications reconnues qui attestent d&apos;une expertise 
            approfondie et d&apos;un engagement envers l&apos;excellence professionnelle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group cursor-pointer"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="glass p-6 rounded-2xl h-full relative overflow-hidden">
                {/* Gradient border top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color}`} />
                
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.color} p-0.5 shrink-0`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-lg">{cert.title}</h3>
                      <span className="text-xs text-primary font-medium px-2 py-1 rounded-full bg-primary/10 shrink-0">
                        {cert.year}
                      </span>
                    </div>
                    <p className="text-primary text-sm font-medium mb-3">{cert.organization}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{cert.description}</p>
                    
                    <div className="mt-4 flex items-center gap-2 text-sm text-primary group-hover:text-accent transition-colors">
                      <FileText className="h-4 w-4" />
                      <span>Voir les détails</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="glass border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              {selectedCert?.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <p className="text-primary font-medium">{selectedCert?.organization}</p>
              <p className="text-sm text-muted-foreground">Obtenu en {selectedCert?.year}</p>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {selectedCert?.description}
            </p>
            
            {selectedCert?.pdfUrl ? (
              <Button 
                className="w-full bg-primary hover:bg-primary/90" 
                asChild
              >
                <a href={selectedCert.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Voir le certificat (PDF)
                </a>
              </Button>
            ) : (
              <p className="text-sm text-center text-muted-foreground">
                PDF non encore disponible
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
