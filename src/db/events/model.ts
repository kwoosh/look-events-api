import { model } from 'mongoose'
import { eventSchema } from './schema'

export const EventModel = model('Event', eventSchema, 'events')
