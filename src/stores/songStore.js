import { writable } from "svelte/store";
import { supabase } from "../supabase.js"
import { eventIdsBelongingToUser } from './eventStore.js'

export const userSongs = writable([])

const compareTimesSeen = (a, b) => {
  if (a.timesSeen > b.timesSeen) {
    return -1;
  }
  if (a.timesSeen < b.timesSeen) {
    return 1;
  }
  return 0;
}

export const loadUserSongs = async (user_id) => {
  const userSongIds = await getUserSongIdsFromUserEventBridges(user_id)

  const { data, error } = await supabase
    .from('songs')
    .select()
    .in('id', userSongIds)

  if (error) {
    return console.error(error)
  }

  data.forEach((userSong) => {
    const count = timesSeen(userSong, userSongIds)
    userSong.timesSeen = count
  })

  console.log(data)
  data.sort(compareTimesSeen)
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

const timesSeen = (song, userSongIds) => {
  let count = 0

  userSongIds.forEach((songId) => {
    if (songId === song.id) {
      count += 1
    }
  })

  return count
}