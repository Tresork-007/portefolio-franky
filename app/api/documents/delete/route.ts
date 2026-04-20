import { del } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'Aucune URL fournie' }, { status: 400 })
    }

    await del(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur suppression:', error)
    return NextResponse.json({ error: 'Échec de la suppression' }, { status: 500 })
  }
}
