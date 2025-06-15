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
      careers: {
        Row: {
          created_at: string
          department: string | null
          description: string | null
          id: number
          is_active: boolean | null
          location: string | null
          title: string
          type: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          location?: string | null
          title: string
          type?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          location?: string | null
          title?: string
          type?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string | null
          id: number
          is_read: boolean | null
          message: string | null
          name: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          is_read?: boolean | null
          message?: string | null
          name?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          is_read?: boolean | null
          message?: string | null
          name?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      locations: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          id: number
          name: string
          phone: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name: string
          phone?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: number
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category_id: number | null
          created_at: string
          description: string | null
          documents: Json | null
          features: Json | null
          gallery: Json | null
          id: number
          image_url: string | null
          in_stock: boolean | null
          manufacturer: string | null
          name: string
          popular: boolean | null
          price: string | null
          rating: number | null
          specifications: Json | null
          warranty: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          documents?: Json | null
          features?: Json | null
          gallery?: Json | null
          id?: number
          image_url?: string | null
          in_stock?: boolean | null
          manufacturer?: string | null
          name: string
          popular?: boolean | null
          price?: string | null
          rating?: number | null
          specifications?: Json | null
          warranty?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          description?: string | null
          documents?: Json | null
          features?: Json | null
          gallery?: Json | null
          id?: number
          image_url?: string | null
          in_stock?: boolean | null
          manufacturer?: string | null
          name?: string
          popular?: boolean | null
          price?: string | null
          rating?: number | null
          specifications?: Json | null
          warranty?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          area: string | null
          budget: string | null
          category: string | null
          challenges: Json | null
          client: string | null
          created_at: string
          description: string | null
          end_date: string | null
          gallery_images: Json | null
          hero_image_url: string | null
          id: number
          location: string | null
          long_description: string | null
          name: string
          results: Json | null
          slug: string
          solutions: Json | null
          specifications: Json | null
          start_date: string | null
          status: string | null
          tags: Json | null
          team_members: Json | null
          testimonial: Json | null
          timeline: Json | null
          year: number | null
        }
        Insert: {
          area?: string | null
          budget?: string | null
          category?: string | null
          challenges?: Json | null
          client?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          gallery_images?: Json | null
          hero_image_url?: string | null
          id?: number
          location?: string | null
          long_description?: string | null
          name: string
          results?: Json | null
          slug: string
          solutions?: Json | null
          specifications?: Json | null
          start_date?: string | null
          status?: string | null
          tags?: Json | null
          team_members?: Json | null
          testimonial?: Json | null
          timeline?: Json | null
          year?: number | null
        }
        Update: {
          area?: string | null
          budget?: string | null
          category?: string | null
          challenges?: Json | null
          client?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          gallery_images?: Json | null
          hero_image_url?: string | null
          id?: number
          location?: string | null
          long_description?: string | null
          name?: string
          results?: Json | null
          slug?: string
          solutions?: Json | null
          specifications?: Json | null
          start_date?: string | null
          status?: string | null
          tags?: Json | null
          team_members?: Json | null
          testimonial?: Json | null
          timeline?: Json | null
          year?: number | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: number
          image_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: number
          image_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: number
          image_url?: string | null
          name?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          created_at: string
          email: string | null
          id: number
          is_read: boolean | null
          message: string | null
          name: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          is_read?: boolean | null
          message?: string | null
          name?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          is_read?: boolean | null
          message?: string | null
          name?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
