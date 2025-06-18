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
      about_content: {
        Row: {
          content: Json | null
          created_at: string
          id: number
          is_active: boolean | null
          section_key: string
          sort_order: number | null
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: number
          is_active?: boolean | null
          section_key: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: number
          is_active?: boolean | null
          section_key?: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      careers: {
        Row: {
          created_at: string
          department: string | null
          description: string | null
          experience_required: string | null
          id: number
          is_active: boolean | null
          location: string | null
          requirements: Json | null
          salary_range: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          description?: string | null
          experience_required?: string | null
          id?: number
          is_active?: boolean | null
          location?: string | null
          requirements?: Json | null
          salary_range?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          description?: string | null
          experience_required?: string | null
          id?: number
          is_active?: boolean | null
          location?: string | null
          requirements?: Json | null
          salary_range?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      careers_cards: {
        Row: {
          card_type: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: number
          is_active: boolean | null
          sort_order: number | null
          title: string
          unit: string | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          card_type?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: number
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          unit?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          card_type?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: number
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          unit?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      careers_content: {
        Row: {
          content: Json | null
          created_at: string | null
          description: string | null
          id: number
          is_active: boolean | null
          section_key: string
          sort_order: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          section_key: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_active?: boolean | null
          section_key?: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_items: {
        Row: {
          created_at: string
          details: Json | null
          icon: string | null
          id: string
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          icon?: string | null
          id?: string
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          icon?: string | null
          id?: string
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          id: number
          is_read: boolean | null
          message: string | null
          name: string | null
          phone: string | null
          service_id: number | null
          subject: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: number
          is_read?: boolean | null
          message?: string | null
          name?: string | null
          phone?: string | null
          service_id?: number | null
          subject?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          id?: number
          is_read?: boolean | null
          message?: string | null
          name?: string | null
          phone?: string | null
          service_id?: number | null
          subject?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          file_name: string
          file_size: string | null
          file_type: string
          file_url: string
          id: number
          is_active: boolean | null
          is_public: boolean | null
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          file_name: string
          file_size?: string | null
          file_type: string
          file_url: string
          id?: number
          is_active?: boolean | null
          is_public?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          file_name?: string
          file_size?: string | null
          file_type?: string
          file_url?: string
          id?: number
          is_active?: boolean | null
          is_public?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      footer_content: {
        Row: {
          content: Json | null
          created_at: string
          id: number
          is_active: boolean | null
          section_key: string
          sort_order: number | null
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          id?: number
          is_active?: boolean | null
          section_key: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          id?: number
          is_active?: boolean | null
          section_key?: string
          sort_order?: number | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      header_content: {
        Row: {
          company_name: string
          created_at: string
          id: number
          logo_url: string | null
          updated_at: string
        }
        Insert: {
          company_name?: string
          created_at?: string
          id?: number
          logo_url?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: number
          logo_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      locations: {
        Row: {
          address: string | null
          business_hours: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          gallery: Json | null
          id: number
          is_headquarters: boolean
          latitude: number | null
          longitude: number | null
          map_embed_url: string | null
          map_image_url: string | null
          name: string
          phone: string | null
        }
        Insert: {
          address?: string | null
          business_hours?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          gallery?: Json | null
          id?: number
          is_headquarters?: boolean
          latitude?: number | null
          longitude?: number | null
          map_embed_url?: string | null
          map_image_url?: string | null
          name: string
          phone?: string | null
        }
        Update: {
          address?: string | null
          business_hours?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          gallery?: Json | null
          id?: number
          is_headquarters?: boolean
          latitude?: number | null
          longitude?: number | null
          map_embed_url?: string | null
          map_image_url?: string | null
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      page_backgrounds: {
        Row: {
          created_at: string | null
          id: number
          image_url: string | null
          is_active: boolean | null
          overlay_opacity: number | null
          page_name: string
          section_key: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          overlay_opacity?: number | null
          page_name: string
          section_key: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          overlay_opacity?: number | null
          page_name?: string
          section_key?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      page_content: {
        Row: {
          content: Json | null
          created_at: string
          element_id: string
          id: string
          page: string
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          element_id: string
          id?: string
          page: string
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          element_id?: string
          id?: string
          page?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_sections: {
        Row: {
          content: Json | null
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          is_active: boolean | null
          page_name: string
          section_key: string
          sort_order: number | null
          subtitle: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          page_name: string
          section_key: string
          sort_order?: number | null
          subtitle?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          page_name?: string
          section_key?: string
          sort_order?: number | null
          subtitle?: string | null
          title?: string | null
          updated_at?: string | null
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
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
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
          created_at: string | null
          description: string | null
          features: Json | null
          icon: string | null
          id: number
          image_url: string | null
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: Json | null
          icon?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: Json | null
          icon?: string | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      support_content_sections: {
        Row: {
          background_color: string | null
          content: string | null
          created_at: string | null
          icon: string | null
          id: number
          is_active: boolean | null
          section_type: string | null
          sort_order: number | null
          text_color: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          background_color?: string | null
          content?: string | null
          created_at?: string | null
          icon?: string | null
          id?: number
          is_active?: boolean | null
          section_type?: string | null
          sort_order?: number | null
          text_color?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          background_color?: string | null
          content?: string | null
          created_at?: string | null
          icon?: string | null
          id?: number
          is_active?: boolean | null
          section_type?: string | null
          sort_order?: number | null
          text_color?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      support_downloads: {
        Row: {
          created_at: string
          description: string | null
          file_size: string
          file_type: string
          file_url: string | null
          id: number
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_size: string
          file_type: string
          file_url?: string | null
          id?: number
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_size?: string
          file_type?: string
          file_url?: string | null
          id?: number
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      support_faqs: {
        Row: {
          answer: string
          created_at: string
          id: number
          is_active: boolean | null
          question: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          id?: number
          is_active?: boolean | null
          question: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          id?: number
          is_active?: boolean | null
          question?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      support_options: {
        Row: {
          action_text: string | null
          action_type: string | null
          action_url: string | null
          availability: string | null
          contact_info: Json | null
          created_at: string
          description: string | null
          icon: string | null
          id: number
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string
        }
        Insert: {
          action_text?: string | null
          action_type?: string | null
          action_url?: string | null
          availability?: string | null
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: number
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          action_text?: string | null
          action_type?: string | null
          action_url?: string | null
          availability?: string | null
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: number
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      support_page_content: {
        Row: {
          content: Json | null
          created_at: string
          description: string | null
          id: number
          is_active: boolean | null
          section_key: string
          title: string | null
          updated_at: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean | null
          section_key: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean | null
          section_key?: string
          title?: string | null
          updated_at?: string
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
      get_user_display_name: {
        Args: { user_id: string }
        Returns: string
      }
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
