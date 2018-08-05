import { model } from 'mongoose'
import { tagsSchema } from './schema'

export const TagsModel = model('Tags', tagsSchema, 'tags')
