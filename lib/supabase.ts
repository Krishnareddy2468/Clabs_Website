import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL:', supabaseUrl)
  console.error('Supabase Key exists:', !!supabaseKey)
  throw new Error(
    'Missing Supabase environment variables.\n\n' +
      'Please create a .env.local file in your project root with:\n' +
      'NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co\n' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key\n\n' +
      'Get these from: https://supabase.com/dashboard/project/_/settings/api'
  )
}

if (!supabaseUrl.startsWith('http')) {
  throw new Error(
    `Invalid Supabase URL: "${supabaseUrl}"\n` +
      'Must start with https:// or http://'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      schools: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          banner_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          banner_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          banner_url?: string | null
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          location: string
          image_url: string | null
          amount: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          location: string
          image_url?: string | null
          amount?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          location?: string
          image_url?: string | null
          amount?: number
          created_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          image_url: string
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          image_url: string
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          image_url?: string
          category?: string | null
          created_at?: string
        }
      }
      contact_responses: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          status?: string
          created_at?: string
        }
      }
    }
  }
}
