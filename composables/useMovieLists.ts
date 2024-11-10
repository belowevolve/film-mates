import type { Database } from '~/types/database.types'

export function useMovieLists() {
  const supabase = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  return useAsyncData('movieLists', async () => {
    if (!user.value)
      throw new Error('User not found')
    const { data } = await supabase
      .from('movieslists_members')
      .select(`
        movieslists(
          id,
          name
        )
      `)
      .eq('user_id', user.value.id)

    return data
  })
}
