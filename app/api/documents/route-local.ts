import { NextResponse } from 'next/server'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads')

// Assurer que le dossier uploads existe
if (!existsSync(UPLOAD_DIR)) {
  mkdir(UPLOAD_DIR, { recursive: true })
}

export async function GET() {
  try {
    // Simuler des documents pour la démo
    const mockDocuments = [
      {
        url: '/placeholder.pdf',
        pathname: 'certifications/certification-demo.pdf',
        filename: 'certification-demo.pdf',
        category: 'certifications',
        size: 1024000,
        uploadedAt: new Date().toISOString(),
      }
    ]

    const grouped = {
      certifications: mockDocuments,
      diplomes: [],
      galerie: [],
      documents: []
    }

    return NextResponse.json({ documents: mockDocuments, grouped })
  } catch (error) {
    console.error('Erreur listing:', error)
    return NextResponse.json({ error: 'Échec du listing' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Créer le dossier de catégorie si nécessaire
    const categoryDir = join(UPLOAD_DIR, category)
    if (!existsSync(categoryDir)) {
      mkdir(categoryDir, { recursive: true })
    }

    // Sauvegarder le fichier
    const filePath = join(categoryDir, file.name)
    await writeFile(filePath, buffer)

    const document = {
      url: `/uploads/${category}/${file.name}`,
      pathname: `${category}/${file.name}`,
      filename: file.name,
      category,
      size: file.size,
      uploadedAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, document })
  } catch (error) {
    console.error('Erreur upload:', error)
    return NextResponse.json({ error: 'Échec de l\'upload' }, { status: 500 })
  }
}
