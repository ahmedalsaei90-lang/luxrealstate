export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          price: number
          listing_type: 'sale' | 'rent'
          property_type: string
          governorate: string
          area: string
          address: string | null
          bedrooms: number
          bathrooms: number
          area_sqm: number
          amenities: string[]
          featured_image_url: string | null
          images: string[]
          status: 'pending' | 'approved' | 'rejected' | 'sold' | 'rented'
          rejection_reason: string | null
          featured: boolean
          verified: boolean
          view_count: number
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          price: number
          listing_type: 'sale' | 'rent'
          property_type: string
          governorate: string
          area: string
          address?: string | null
          bedrooms: number
          bathrooms: number
          area_sqm: number
          amenities?: string[]
          featured_image_url?: string | null
          images?: string[]
          status?: 'pending' | 'approved' | 'rejected' | 'sold' | 'rented'
          rejection_reason?: string | null
          featured?: boolean
          verified?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          price?: number
          listing_type?: 'sale' | 'rent'
          property_type?: string
          governorate?: string
          area?: string
          address?: string | null
          bedrooms?: number
          bathrooms?: number
          area_sqm?: number
          amenities?: string[]
          featured_image_url?: string | null
          images?: string[]
          status?: 'pending' | 'approved' | 'rejected' | 'sold' | 'rented'
          rejection_reason?: string | null
          featured?: boolean
          verified?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'properties_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      inquiries: {
        Row: {
          id: string
          property_id: string
          user_id: string | null
          name: string
          email: string
          phone: string
          inquiry_type: 'viewing' | 'info' | 'offer' | 'general'
          message: string
          preferred_contact: string
          status: 'new' | 'read' | 'responded' | 'closed'
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          user_id?: string | null
          name: string
          email: string
          phone: string
          inquiry_type: 'viewing' | 'info' | 'offer' | 'general'
          message: string
          preferred_contact?: string
          status?: 'new' | 'read' | 'responded' | 'closed'
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          user_id?: string | null
          name?: string
          email?: string
          phone?: string
          inquiry_type?: 'viewing' | 'info' | 'offer' | 'general'
          message?: string
          preferred_contact?: string
          status?: 'new' | 'read' | 'responded' | 'closed'
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'inquiries_property_id_fkey'
            columns: ['property_id']
            referencedRelation: 'properties'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'inquiries_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          property_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'favorites_property_id_fkey'
            columns: ['property_id']
            referencedRelation: 'properties'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'favorites_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Property = Database['public']['Tables']['properties']['Row']
export type Inquiry = Database['public']['Tables']['inquiries']['Row']
export type Favorite = Database['public']['Tables']['favorites']['Row']

export type PropertyInsert = Database['public']['Tables']['properties']['Insert']
export type PropertyUpdate = Database['public']['Tables']['properties']['Update']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
