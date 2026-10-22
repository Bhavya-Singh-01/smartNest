
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "graphql_public": {
          Tables: {
            [_ in never]: never
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "graphql":
{ Args: { "extensions"?: Json,"operationName"?: string,"query"?: string,"variables"?: Json }; Returns: Json
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        },"public": {
          Tables: {
            "device_catalog": {
                  Row: {
                    "active": boolean,"brand": string | null,"category": Database["public"]['Enums']["device_category"],"connectivity": string | null,"created_at": string,"est_price_inr": number | null,"id": string,"is_sample": boolean,"model": string | null,"name": string,"needs_hub": boolean,"planner_slot": string | null,"slug": string,"source_url": string | null,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "active"?: boolean,"brand"?: string | null,"category": Database["public"]['Enums']["device_category"],"connectivity"?: string | null,"created_at"?: string,"est_price_inr"?: number | null,"id"?: string,"is_sample"?: boolean,"model"?: string | null,"name": string,"needs_hub"?: boolean,"planner_slot"?: string | null,"slug": string,"source_url"?: string | null,"updated_at"?: string
                  }
                  Update: {
                    "active"?: boolean,"brand"?: string | null,"category"?: Database["public"]['Enums']["device_category"],"connectivity"?: string | null,"created_at"?: string,"est_price_inr"?: number | null,"id"?: string,"is_sample"?: boolean,"model"?: string | null,"name"?: string,"needs_hub"?: boolean,"planner_slot"?: string | null,"slug"?: string,"source_url"?: string | null,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"home_plans": {
                  Row: {
                    "added_to_home_at": string | null,"budget": number,"created_at": string,"existing": (string)[],"home_type": Database["public"]['Enums']["home_type"],"id": string,"name": string,"owner_id": string,"priorities": (string)[],"rooms": number,"total": number,"updated_at": string,"warnings": (string)[]
                  }
                  ComputedFields: never
                  Insert: {
                    "added_to_home_at"?: string | null,"budget": number,"created_at"?: string,"existing"?: (string)[],"home_type": Database["public"]['Enums']["home_type"],"id"?: string,"name": string,"owner_id"?: string,"priorities": (string)[],"rooms": number,"total": number,"updated_at"?: string,"warnings"?: (string)[]
                  }
                  Update: {
                    "added_to_home_at"?: string | null,"budget"?: number,"created_at"?: string,"existing"?: (string)[],"home_type"?: Database["public"]['Enums']["home_type"],"id"?: string,"name"?: string,"owner_id"?: string,"priorities"?: (string)[],"rooms"?: number,"total"?: number,"updated_at"?: string,"warnings"?: (string)[]
                  }
                  Relationships: [
                    
                  ]
                },"homes": {
                  Row: {
                    "city": string | null,"created_at": string,"home_type": Database["public"]['Enums']["home_type"],"id": string,"name": string,"owner_id": string,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "city"?: string | null,"created_at"?: string,"home_type": Database["public"]['Enums']["home_type"],"id"?: string,"name": string,"owner_id"?: string,"updated_at"?: string
                  }
                  Update: {
                    "city"?: string | null,"created_at"?: string,"home_type"?: Database["public"]['Enums']["home_type"],"id"?: string,"name"?: string,"owner_id"?: string,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"maintenance_reminders": {
                  Row: {
                    "completed_at": string | null,"created_at": string,"device_id": string,"due_date": string,"id": string,"owner_id": string,"repeat_months": number | null,"title": string
                  }
                  ComputedFields: never
                  Insert: {
                    "completed_at"?: string | null,"created_at"?: string,"device_id": string,"due_date": string,"id"?: string,"owner_id"?: string,"repeat_months"?: number | null,"title": string
                  }
                  Update: {
                    "completed_at"?: string | null,"created_at"?: string,"device_id"?: string,"due_date"?: string,"id"?: string,"owner_id"?: string,"repeat_months"?: number | null,"title"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "maintenance_reminders_device_id_fkey"
      columns: ["device_id"]
isOneToOne: false
      referencedRelation: "user_devices"
      referencedColumns: ["id"]
    }
                  ]
                },"plan_items": {
                  Row: {
                    "catalog_id": string | null,"category": string,"device_category": Database["public"]['Enums']["device_category"] | null,"id": string,"item_key": string,"line_total": number,"name": string,"note": string | null,"plan_id": string,"position": number,"qty": number,"reason": string | null,"unit_price": number
                  }
                  ComputedFields: never
                  Insert: {
                    "catalog_id"?: string | null,"category": string,"device_category"?: Database["public"]['Enums']["device_category"] | null,"id"?: string,"item_key": string,"line_total": number,"name": string,"note"?: string | null,"plan_id": string,"position": number,"qty": number,"reason"?: string | null,"unit_price": number
                  }
                  Update: {
                    "catalog_id"?: string | null,"category"?: string,"device_category"?: Database["public"]['Enums']["device_category"] | null,"id"?: string,"item_key"?: string,"line_total"?: number,"name"?: string,"note"?: string | null,"plan_id"?: string,"position"?: number,"qty"?: number,"reason"?: string | null,"unit_price"?: number
                  }
                  Relationships: [
                    {
      foreignKeyName: "plan_items_catalog_id_fkey"
      columns: ["catalog_id"]
isOneToOne: false
      referencedRelation: "device_catalog"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "plan_items_plan_id_fkey"
      columns: ["plan_id"]
isOneToOne: false
      referencedRelation: "home_plans"
      referencedColumns: ["id"]
    }
                  ]
                },"profiles": {
                  Row: {
                    "created_at": string,"email": string | null,"full_name": string,"id": string,"phone": string | null,"role": Database["public"]['Enums']["user_role"],"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"email"?: string | null,"full_name": string,"id": string,"phone"?: string | null,"role"?: Database["public"]['Enums']["user_role"],"updated_at"?: string
                  }
                  Update: {
                    "created_at"?: string,"email"?: string | null,"full_name"?: string,"id"?: string,"phone"?: string | null,"role"?: Database["public"]['Enums']["user_role"],"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"rooms": {
                  Row: {
                    "created_at": string,"home_id": string,"id": string,"name": string,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"home_id": string,"id"?: string,"name": string,"updated_at"?: string
                  }
                  Update: {
                    "created_at"?: string,"home_id"?: string,"id"?: string,"name"?: string,"updated_at"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "rooms_home_id_fkey"
      columns: ["home_id"]
isOneToOne: false
      referencedRelation: "homes"
      referencedColumns: ["id"]
    }
                  ]
                },"support_tickets": {
                  Row: {
                    "assigned_to": string | null,"category": Database["public"]['Enums']["ticket_category"],"closed_at": string | null,"created_at": string,"description": string,"device_id": string | null,"id": string,"owner_id": string,"photo_path": string | null,"priority": Database["public"]['Enums']["ticket_priority"],"ref": string,"resolved_at": string | null,"room_id": string | null,"status": Database["public"]['Enums']["ticket_status"],"title": string,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "assigned_to"?: string | null,"category": Database["public"]['Enums']["ticket_category"],"closed_at"?: string | null,"created_at"?: string,"description": string,"device_id"?: string | null,"id"?: string,"owner_id"?: string,"photo_path"?: string | null,"priority"?: Database["public"]['Enums']["ticket_priority"],"ref"?: string,"resolved_at"?: string | null,"room_id"?: string | null,"status"?: Database["public"]['Enums']["ticket_status"],"title": string,"updated_at"?: string
                  }
                  Update: {
                    "assigned_to"?: string | null,"category"?: Database["public"]['Enums']["ticket_category"],"closed_at"?: string | null,"created_at"?: string,"description"?: string,"device_id"?: string | null,"id"?: string,"owner_id"?: string,"photo_path"?: string | null,"priority"?: Database["public"]['Enums']["ticket_priority"],"ref"?: string,"resolved_at"?: string | null,"room_id"?: string | null,"status"?: Database["public"]['Enums']["ticket_status"],"title"?: string,"updated_at"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "support_tickets_assigned_to_fkey"
      columns: ["assigned_to"]
isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "support_tickets_device_id_fkey"
      columns: ["device_id"]
isOneToOne: false
      referencedRelation: "user_devices"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "support_tickets_owner_id_fkey"
      columns: ["owner_id"]
isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "support_tickets_room_id_fkey"
      columns: ["room_id"]
isOneToOne: false
      referencedRelation: "rooms"
      referencedColumns: ["id"]
    }
                  ]
                },"ticket_updates": {
                  Row: {
                    "author_id": string | null,"author_role": Database["public"]['Enums']["user_role"],"created_at": string,"from_status": Database["public"]['Enums']["ticket_status"] | null,"id": string,"is_internal": boolean,"kind": Database["public"]['Enums']["ticket_update_kind"],"message": string | null,"ticket_id": string,"to_status": Database["public"]['Enums']["ticket_status"] | null
                  }
                  ComputedFields: never
                  Insert: {
                    "author_id"?: string | null,"author_role": Database["public"]['Enums']["user_role"],"created_at"?: string,"from_status"?: Database["public"]['Enums']["ticket_status"] | null,"id"?: string,"is_internal"?: boolean,"kind": Database["public"]['Enums']["ticket_update_kind"],"message"?: string | null,"ticket_id": string,"to_status"?: Database["public"]['Enums']["ticket_status"] | null
                  }
                  Update: {
                    "author_id"?: string | null,"author_role"?: Database["public"]['Enums']["user_role"],"created_at"?: string,"from_status"?: Database["public"]['Enums']["ticket_status"] | null,"id"?: string,"is_internal"?: boolean,"kind"?: Database["public"]['Enums']["ticket_update_kind"],"message"?: string | null,"ticket_id"?: string,"to_status"?: Database["public"]['Enums']["ticket_status"] | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "ticket_updates_author_id_fkey"
      columns: ["author_id"]
isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "ticket_updates_ticket_id_fkey"
      columns: ["ticket_id"]
isOneToOne: false
      referencedRelation: "support_tickets"
      referencedColumns: ["id"]
    }
                  ]
                },"user_devices": {
                  Row: {
                    "brand": string | null,"catalog_id": string | null,"category": Database["public"]['Enums']["device_category"],"created_at": string,"id": string,"manual_url": string | null,"model": string | null,"name": string,"notes": string | null,"owner_id": string,"purchase_date": string | null,"room_id": string | null,"updated_at": string,"warranty_expiry": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "brand"?: string | null,"catalog_id"?: string | null,"category": Database["public"]['Enums']["device_category"],"created_at"?: string,"id"?: string,"manual_url"?: string | null,"model"?: string | null,"name": string,"notes"?: string | null,"owner_id"?: string,"purchase_date"?: string | null,"room_id"?: string | null,"updated_at"?: string,"warranty_expiry"?: string | null
                  }
                  Update: {
                    "brand"?: string | null,"catalog_id"?: string | null,"category"?: Database["public"]['Enums']["device_category"],"created_at"?: string,"id"?: string,"manual_url"?: string | null,"model"?: string | null,"name"?: string,"notes"?: string | null,"owner_id"?: string,"purchase_date"?: string | null,"room_id"?: string | null,"updated_at"?: string,"warranty_expiry"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "user_devices_catalog_id_fkey"
      columns: ["catalog_id"]
isOneToOne: false
      referencedRelation: "device_catalog"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "user_devices_room_id_fkey"
      columns: ["room_id"]
isOneToOne: false
      referencedRelation: "rooms"
      referencedColumns: ["id"]
    }
                  ]
                },"user_feedback": {
                  Row: {
                    "comment": string | null,"created_at": string,"id": string,"owner_id": string,"rating": number,"ticket_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "comment"?: string | null,"created_at"?: string,"id"?: string,"owner_id": string,"rating": number,"ticket_id": string
                  }
                  Update: {
                    "comment"?: string | null,"created_at"?: string,"id"?: string,"owner_id"?: string,"rating"?: number,"ticket_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "user_feedback_owner_id_fkey"
      columns: ["owner_id"]
isOneToOne: false
      referencedRelation: "profiles"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "user_feedback_ticket_id_fkey"
      columns: ["ticket_id"]
isOneToOne: true
      referencedRelation: "support_tickets"
      referencedColumns: ["id"]
    }
                  ]
                }
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "add_plan_to_home":
{ Args: { "p_plan_id": string }; Returns: number
                           },
"assign_ticket_to_me":
{ Args: { "p_ticket_id": string }; Returns: undefined
                           },
"check_message":
{ Args: { "p_message": string,"p_required": boolean }; Returns: string
                           },
"complete_reminder":
{ Args: { "p_reminder_id": string }; Returns: undefined
                           },
"customer_confirm_resolution":
{ Args: { "p_comment": string,"p_rating": number,"p_ticket_id": string }; Returns: undefined
                           },
"customer_reopen_ticket":
{ Args: { "p_message": string,"p_ticket_id": string }; Returns: undefined
                           },
"customer_reply":
{ Args: { "p_message": string,"p_ticket_id": string }; Returns: undefined
                           },
"is_admin":
{ Args: Record<PropertyKey, never>; Returns: boolean
                           },
"owns_device":
{ Args: { "p_device_id": string }; Returns: boolean
                           },
"owns_home":
{ Args: { "p_home_id": string }; Returns: boolean
                           },
"owns_plan":
{ Args: { "p_plan_id": string }; Returns: boolean
                           },
"owns_room":
{ Args: { "p_room_id": string }; Returns: boolean
                           },
"save_home_plan":
{ Args: { "p_budget": number,"p_existing": (string)[],"p_home_type": Database["public"]['Enums']["home_type"],"p_items": Json,"p_name": string,"p_plan_id": string,"p_priorities": (string)[],"p_rooms": number,"p_warnings": (string)[] }; Returns: string
                           },
"staff_update_ticket":
{ Args: { "p_internal": boolean,"p_message": string,"p_status": Database["public"]['Enums']["ticket_status"],"p_ticket_id": string }; Returns: undefined
                           },
"ticket_transition_allowed":
{ Args: { "p_from": Database["public"]['Enums']["ticket_status"],"p_staff": boolean,"p_to": Database["public"]['Enums']["ticket_status"] }; Returns: boolean
                           }
          }
          Enums: {
            "device_category": "hub"|"lighting"|"plug"|"lock"|"camera"|"door_sensor"|"motion_sensor"|"speaker"|"climate"|"energy"|"other","home_type": "apartment"|"house"|"studio","ticket_category": "device_offline"|"connectivity"|"installation"|"automation"|"malfunction"|"security_privacy"|"other","ticket_priority": "low"|"normal"|"high"|"urgent","ticket_status": "submitted"|"under_review"|"in_progress"|"resolved"|"closed","ticket_update_kind": "created"|"status_change"|"staff_reply"|"internal_note"|"customer_reply"|"assignment","user_role": "customer"|"admin"
          }
          CompositeTypes: {
            [_ in never]: never
          }
        }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "graphql_public": {
          Enums: {
            
          }
        },"public": {
          Enums: {
            "device_category": ["hub", "lighting", "plug", "lock", "camera", "door_sensor", "motion_sensor", "speaker", "climate", "energy", "other"],"home_type": ["apartment", "house", "studio"],"ticket_category": ["device_offline", "connectivity", "installation", "automation", "malfunction", "security_privacy", "other"],"ticket_priority": ["low", "normal", "high", "urgent"],"ticket_status": ["submitted", "under_review", "in_progress", "resolved", "closed"],"ticket_update_kind": ["created", "status_change", "staff_reply", "internal_note", "customer_reply", "assignment"],"user_role": ["customer", "admin"]
          }
        }
} as const
