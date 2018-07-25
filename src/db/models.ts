import { model } from 'mongoose'
import { eventSchema, tagsSchema } from './schemas'

export const EventModel = model('Event', eventSchema, 'events')
export const TagsModel = model('Tags', tagsSchema, 'tags')
