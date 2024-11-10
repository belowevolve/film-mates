import type { Database } from '@/types/database.types'

export const useSupabase = useSupabaseClient<Database>()
export const useUser = useSupabaseUser()
