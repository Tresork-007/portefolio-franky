"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function Loader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient">FME</span>
              </h1>
              <p className="text-muted-foreground mt-2">Portfolio</p>
            </motion.div>

            {/* Loading bar */}
            <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden mx-auto">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
