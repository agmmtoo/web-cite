import { RealtimePostgresInsertPayload, RealtimePostgresDeletePayload } from '@supabase/supabase-js'
import { anonClient, getRealtimeClient } from './supabase.api'

import { Note } from '../types/notes.types'
import { RealtimeClient, RealtimeChannel } from '@supabase/realtime-js'

export const anonChannel = anonClient.channel('test-channel')

const getChannel = (client: RealtimeClient, channelName = 'db-changes'): RealtimeChannel => client.channel(channelName)

export const subscribeInsert = (apiKey, onInsert: (payload: RealtimePostgresInsertPayload<Note>) => void) => {
  const client = getRealtimeClient(apiKey)
  const channel = getChannel(client)
  return channel.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notes' }, onInsert)
}

export const subscribeDelete = (apiKey, onDelete: (payload: RealtimePostgresDeletePayload<Note>) => void) => {
  const client = getRealtimeClient(apiKey)
  const channel = getChannel(client)
  return channel.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'notes' }, onDelete)
}

export const subscribeInsertAnon = (onInsert: (payload: RealtimePostgresInsertPayload<Note>) => void) =>
  anonChannel.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notes' }, onInsert)
