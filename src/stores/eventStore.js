import { writable } from "svelte/store";
import { supabase } from "../supabase.js"


export const events = writable([])

export const loadEvents = async () => {
  console.log("loading events.....")
  const { data, error } = await supabase.from('events').select()
  if (error) {
    return console.error(error)
  }
  console.log("done loading events.....")
  events.set(data)
}

const userEventBridgeExistsForUserAndEvent = async (event_id, user_id) => {
  const { data, error } = await supabase
    .from('user_event_bridges')
    .select('event_id, user_id')
    .match({ event_id, user_id })

  if (error) {
    return console.error(error)
  }
  if (data.length > 0) {
    return true
  } else {
    return false
  }
}

export const addEvent = async (event_id, user_id) => {
  const userEventBridgeExists = await userEventBridgeExistsForUserAndEvent(event_id, user_id)
  if (userEventBridgeExists) {
    // delete the existing bridge
    await deleteUserEventBridge(event_id, user_id)
    alert("Event Removed 🚨")
  } else {
    // create a new bridge
    const { data, error } = await supabase.from('user_event_bridges').insert([{ event_id, user_id }])
    if (error) {
      return console.error(error)
    }
    console.log(data)
    alert("Event Added 🌻")
    // don't add an event to the events store - we want to just create a join table record or we'll render the event twice. 
  }
}

const deleteUserEventBridge = async (event_id, user_id) => {
  const { error } = await supabase.from('user_event_bridges').delete().match({ event_id, user_id })

  if (error) {
    return console.error(error)
  }

  // don't delete the event to the events store - we want to just delete the join table
}

export const eventsBelongingToUser = async (user_id) => {
  // see if there's a userEventBridge that matches this event and user id
  const { data, error } = await supabase
    .from('user_event_bridges')
    .select('event_id, user_id')
    .match({ user_id })

  if (error) {
    return console.error(error)
  }
  // return an array of event Ids that belong to the user 
  return data.map((user_event_bridge) => user_event_bridge.event_id)
}
