import { writable } from "svelte/store";
import { supabase } from "../supabase.js"
import { eventIdsBelongingToUser } from './eventStore.js'

export const userSongs = writable([])

export const loadUserSongs = async (user_id) => {
  const userSongIds = await getUserSongIdsFromUserEventBridges(user_id)

  const { data, error } = await supabase
    .from('songs')
    .select()
    .in('id', userSongIds)

  if (error) {
    return console.error(error)
  }

  userSongs.set(data)
}

const getUserSongIdsFromUserEventBridges = async (user_id) => {
  const userEventsIds = await eventIdsBelongingToUser(user_id)
  const userSongEventBridges = await supabase
    .from('song_event_bridges')
    .select()
    .in('event_id', userEventsIds)

  return userSongEventBridges.body.map((userSongEventBridge) => userSongEventBridge.song_id)
}

export const timesSeen = async (song, user_id) => {
  const userSongIds = await getUserSongIdsFromUserEventBridges(user_id)
  let count = 0
  userSongIds.forEach((songId) => {
    if (songId === song.id) {
      count += 1
    }
  })

  return count
}