"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { X, ZoomIn, Camera } from "lucide-react"
import Image from "next/image"

const categories = ["Tous", "Conférences", "Enseignement", "Événements"]

const galleryItems = [
  {
    id: 1,
    category: "Conférences",
    title: "Séminaire LAB/FT 2024",
    description: "Présentation sur la conformité anti-blanchiment",
    placeholder: true,
  },
  {
    id: 2,
    category: "Enseignement",
    title: "Cours AFRAM",
    description: "Session de droit des assurances - Licence 3",
    placeholder: true,
  },
  {
    id: 3,
    category: "Événements",
    title: "Forum des Assurances",
    description: "Participation au forum annuel du secteur",
    placeholder: true,
  },
  {
    id: 4,
    category: "Conférences",
    title: "Masterclass Prise de Parole",
    description: "Atelier de formation en communication",
    placeholder: true,
  },
  {
    id: 5,
    category: "Enseignement",
    title: "Remise de Diplômes",
    description: "Cérémonie de fin d'année académique",
    placeholder: true,
  },
  {
    id: 6,
    category: "Événements",
    title: "Réunion Direction",
    description: "Session de travail à la DNA",
    placeholder: true,
  },
]

export function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCategory, setActiveCategory] = useState("Tous")
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null)

  const filteredItems = activeCategory === "Tous" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <section id="gallery" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase">
            Souvenirs
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Galerie <span className="text-gradient">Photo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Moments capturés lors de conférences, sessions d&apos;enseignement 
            et événements professionnels.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <div className="glass rounded-2xl overflow-hidden aspect-[4/3] relative">
                  {/* Placeholder for images */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Camera className="h-12 w-12 text-muted-foreground/50" />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs text-primary font-medium mb-1">{item.category}</p>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Ajoutez vos photos pour personnaliser cette galerie
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="glass rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Camera className="h-20 w-20 text-muted-foreground/50" />
                </div>
                <div className="p-6">
                  <p className="text-xs text-primary font-medium mb-1">{selectedImage.category}</p>
                  <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-muted-foreground">{selectedImage.description}</p>
                </div>
              </div>
            </motion.div>
            
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-secondary/50 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
