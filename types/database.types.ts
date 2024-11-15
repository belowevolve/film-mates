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
      invites: {
        Row: {
          created_at: string
          id: string
          list_id: number
        }
        Insert: {
          created_at?: string
          id?: string
          list_id: number
        }
        Update: {
          created_at?: string
          id?: string
          list_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "invites_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: true
            referencedRelation: "movieslists"
            referencedColumns: ["id"]
          },
        ]
      }
      movies: {
        Row: {
          id: string
          poster_path: string | null
          release_date: string | null
          title: string
        }
        Insert: {
          id: string
          poster_path?: string | null
          release_date?: string | null
          title: string
        }
        Update: {
          id?: string
          poster_path?: string | null
          release_date?: string | null
          title?: string
        }
        Relationships: []
      }
      movieslists: {
        Row: {
          created_by: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_by: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_by?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "movieslists_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      movieslists_items: {
        Row: {
          added_by: string
          id: number
          list_id: number
          movie_id: string
          updated_at: string
        }
        Insert: {
          added_by: string
          id?: number
          list_id: number
          movie_id: string
          updated_at?: string
        }
        Update: {
          added_by?: string
          id?: number
          list_id?: number
          movie_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "movieslist_items_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movieslist_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "movieslists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movieslists_items_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
        ]
      }
      movieslists_members: {
        Row: {
          id: number
          joined_at: string
          list_id: number
          user_id: string
        }
        Insert: {
          id?: number
          joined_at?: string
          list_id: number
          user_id: string
        }
        Update: {
          id?: number
          joined_at?: string
          list_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "movieslists_members_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "movieslists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "movieslists_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_movie_to_list: {
        Args: {
          p_tmdb_id: string
          p_title: string
          p_poster_path: string
          p_release_date: string
          p_list_id: number
        }
        Returns: undefined
      }
      add_user_to_list: {
        Args: {
          invite_id: string
        }
        Returns: undefined
      }
      is_list_creator: {
        Args: {
          list_id: number
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
