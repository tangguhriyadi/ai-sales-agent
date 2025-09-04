import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      media: {
        Row: {
          id: number
          created_at: string
          file_name: string
          mime_type: string
          file_type: string
          file_url: string
          file_size: string
        }
        Insert: {
          id?: number
          created_at?: string
          file_name: string
          mime_type: string
          file_type: string
          file_url: string
          file_size: string
        }
        Update: {
          id?: number
          created_at?: string
          file_name?: string
          mime_type?: string
          file_type?: string
          file_url?: string
          file_size?: string
        }
      }
    }
  }
}