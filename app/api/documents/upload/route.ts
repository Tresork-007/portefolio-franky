import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'documents'
    const title = formData.get('title') as string || file.name

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Valider le type de fichier (PDF, images)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non autorisé. Utilisez PDF, JPEG, PNG ou WebP.' },
        { status: 400 }
      )
    }

    // Créer un chemin organisé: category/timestamp-filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const pathname = `${category}/${timestamp}-${sanitizedName}`

    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: false,
    })

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      title,
      category,
      contentType: file.type,
      size: file.size,
    })
  } catch (error) {
    console.error('Erreur upload:', error)
    return NextResponse.json({ error: 'Échec de l\'upload' }, { status: 500 })
  }
}
