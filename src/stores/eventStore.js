import { writable } from "svelte/store";
import { supabase } from "../supabase.js"


export const events = writable([])

export const loadEvents = async () => {
  const { data, error } = await supabase.from('events').select()
  if (error) {
    return console.error(error)
  }

  events.set(data)
}

export const addEvent = async (event_id, user_id) => {
  const { data, error } = await supabase.from('user_event_bridges').insert([{ event_id, user_id }])
  if (error) {
    return console.error(error)
  }
  // don't add the user_event_bridge to the events being rendered
  // events.update((current) => [...current, data[0]])
}

export const userEventBridgeIsPresentForEvent = async (event_id, user_id) => {
  // see if there's a userEventBridge that matches this event and user id
  const { data, error } = await supabase
    .from('user_event_bridges')
    .select('event_id, user_id')
    .match({ event_id, user_id })
  if (data.length > 0) {
    console.log(data)
    return true
  } else {
    console.log('no data')
    return false
  }
}
