"use client"

import { useState, useCallback } from "react"
import useSWR, { mutate } from "swr"
import { motion } from "framer-motion"
import { Upload, Trash2, FileText, Image, FolderOpen, ArrowLeft, Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const categories = [
  { id: "certifications", label: "Certifications", icon: FileText },
  { id: "diplomes", label: "Diplômes", icon: FileText },
  { id: "galerie", label: "Galerie Photos", icon: Image },
  { id: "documents", label: "Autres Documents", icon: FolderOpen },
]

interface Document {
  url: string
  pathname: string
  filename: string
  category: string
  size: number
  uploadedAt: string
}

export default function AdminPage() {
  const { data, error, isLoading } = useSWR<{ documents: Document[]; grouped: Record<string, Document[]> }>(
    "/api/documents",
    fetcher
  )
  const [uploading, setUploading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("certifications")
  const [dragActive, setDragActive] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleUpload = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    setUploadStatus(null)

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("category", selectedCategory)
        formData.append("title", file.name)

        const response = await fetch("/api/documents/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || "Erreur upload")
        }
      }

      setUploadStatus({ type: "success", message: `${files.length} fichier(s) uploadé(s) avec succès` })
      mutate("/api/documents")
    } catch (err) {
      setUploadStatus({ type: "error", message: err instanceof Error ? err.message : "Erreur lors de l'upload" })
    } finally {
      setUploading(false)
    }
  }, [selectedCategory])

  const handleDelete = async (url: string) => {
    if (!confirm("Supprimer ce document ?")) return

    try {
      const response = await fetch("/api/documents/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (response.ok) {
        mutate("/api/documents")
      }
    } catch (err) {
      console.error("Erreur suppression:", err)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleUpload(e.dataTransfer.files)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au portfolio
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Gestion des Documents</h1>
            <p className="text-muted-foreground mt-1">Uploadez et gérez vos certifications, diplômes et photos</p>
          </div>
        </div>

        {/* Upload Section */}
        <Card className="glass border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Uploader des fichiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Category Selection */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.id)}
                  className="gap-2"
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Drop Zone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${dragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}
              `}
            >
              <input
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={(e) => handleUpload(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
              
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                  <p className="text-muted-foreground">Upload en cours...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="text-foreground font-medium">
                    Glissez vos fichiers ici ou cliquez pour sélectionner
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, JPEG, PNG, WebP acceptés
                  </p>
                </div>
              )}
            </div>

            {/* Upload Status */}
            {uploadStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                  uploadStatus.type === "success" 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-destructive/20 text-destructive"
                }`}
              >
                {uploadStatus.type === "success" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                {uploadStatus.message}
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card className="glass border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-primary" />
              Documents uploadés
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            ) : error ? (
              <p className="text-center text-destructive py-8">Erreur lors du chargement des documents</p>
            ) : !data?.documents?.length ? (
              <p className="text-center text-muted-foreground py-8">Aucun document uploadé</p>
            ) : (
              <div className="space-y-6">
                {categories.map((cat) => {
                  const docs = data.grouped?.[cat.id] || []
                  if (docs.length === 0) return null

                  return (
                    <div key={cat.id}>
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <cat.icon className="h-5 w-5 text-primary" />
                        {cat.label}
                        <span className="text-sm text-muted-foreground font-normal">({docs.length})</span>
                      </h3>
                      <div className="grid gap-3">
                        {docs.map((doc) => (
                          <motion.div
                            key={doc.pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {doc.filename.endsWith(".pdf") ? (
                                <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                              ) : (
                                <img
                                  src={doc.url}
                                  alt={doc.filename}
                                  className="h-12 w-12 object-cover rounded flex-shrink-0"
                                />
                              )}
                              <div className="min-w-0">
                                <p className="font-medium text-foreground truncate">{doc.filename}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatFileSize(doc.size)} • {new Date(doc.uploadedAt).toLocaleDateString("fr-FR")}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                              >
                                <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                  Voir
                                </a>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => handleDelete(doc.url)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* URL Copy Helper */}
        {data?.documents && data.documents.length > 0 && (
          <Card className="glass border-border mt-8">
            <CardHeader>
              <CardTitle>URLs des documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Copiez ces URLs pour les utiliser dans vos certifications :
              </p>
              <div className="space-y-2">
                {data.documents.map((doc) => (
                  <div key={doc.pathname} className="flex items-center gap-2">
                    <Input
                      readOnly
                      value={doc.url}
                      className="font-mono text-xs"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(doc.url)}
                    >
                      Copier
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
