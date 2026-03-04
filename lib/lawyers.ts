export type Lawyer = {
  id: string
  name: string
  specialties: string[]
  location?: string
  avatar?: string
  contact?: string
}

// Minimal sample data — fallback if DB fails
const DEFAULT_LAWYERS: Lawyer[] = [
  {
    id: '1',
    name: "A'zam Abdullaev",
    specialties: ['oil va gaz', 'kontrakt', 'ijro'],
    location: 'Toshkent',
    avatar: '/avatars/azam.jpg',
    contact: '+998901112233',
  },
  {
    id: '2',
    name: 'Nilufar Qoziyeva',
    specialties: ['mehnat huquqi', 'firma tashkil etish'],
    location: 'Samarqand',
    avatar: '/avatars/nilufar.jpg',
    contact: '+998909998877',
  },
  {
    id: '3',
    name: 'Bekzod Ruslanov',
    specialties: ['oilaviy', 'mulk huquqi'],
    location: 'Fargona',
    avatar: '/avatars/bekzod.jpg',
    contact: '+998933332211',
  },
]

// Fetch lawyers from database
export async function fetchLawyersFromDB(): Promise<Lawyer[]> {
  try {
    const { neon } = await import('@neondatabase/serverless')
    const sql = neon(process.env.DATABASE_URL!)
    const result = await sql`
      SELECT 
        id::text, 
        full_name as name, 
        specialization, 
        location, 
        avatar, 
        phone as contact
      FROM users
      WHERE role = 'lawyer' AND avatar IS NOT NULL AND avatar != ''
      ORDER BY created_at DESC, full_name ASC
    `

    if (result.length === 0) return DEFAULT_LAWYERS

    return result.map((r: any) => ({
      id: r.id,
      name: r.name,
      specialties: r.specialization ? [r.specialization] : [],
      location: r.location || undefined,
      avatar: r.avatar || '/avatars/default.jpg',
      contact: r.contact || undefined,
    }))
  } catch (e) {
    console.error('Failed to fetch lawyers from DB:', e)
    return DEFAULT_LAWYERS
  }
}

// Very small keyword-based matcher. 
export function matchLawyer(query: string): Lawyer | null {
  const q = query.toLowerCase()
  // Extract possible location from query (simple city match)
  const cities = ["toshkent", "samarqand", "fargona", "buxoro", "andijon", "namangan", "navoiy", "qarshi", "urganch", "jizzax", "guliston"];
  let queryLocation = "";
  for (const city of cities) {
    if (q.includes(city)) { queryLocation = city; break; }
  }

  let best: Lawyer | null = null
  let bestScore = 0
  for (const l of DEFAULT_LAWYERS) {
    let score = 0
    for (const s of l.specialties) {
      const t = s.toLowerCase()
      if (q.includes(t)) score += 2
      for (const w of t.split(/\s+/)) if (q.includes(w)) score += 1
    }
    if (q.includes(l.name.toLowerCase())) score += 2
    // Location bonus
    if (queryLocation && l.location && l.location.toLowerCase().includes(queryLocation)) score += 2
    // If user location is available, bonus for matching
    if (l.location && process.env.USER_LOCATION && l.location.toLowerCase().includes(process.env.USER_LOCATION.toLowerCase())) score += 1
    if (score > bestScore) {
      bestScore = score
      best = l
    }
  }
  return best || null
}
