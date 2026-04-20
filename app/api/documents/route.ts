import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list()

    const documents = blobs.map((blob) => {
      const parts = blob.pathname.split('/')
      const category = parts[0] || 'documents'
      const filename = parts.pop() || 'unknown'
      
      return {
        url: blob.url,
        pathname: blob.pathname,
        filename,
        category,
        size: blob.size,
        uploadedAt: blob.uploadedAt,
      }
    })

    // Grouper par catégorie
    const grouped = documents.reduce((acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = []
      }
      acc[doc.category].push(doc)
      return acc
    }, {} as Record<string, typeof documents>)

    return NextResponse.json({ documents, grouped })
  } catch (error) {
    console.error('Erreur listing:', error)
    return NextResponse.json({ error: 'Échec du listing' }, { status: 500 })
  }
}
