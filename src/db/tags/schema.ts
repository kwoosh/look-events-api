import { Schema } from 'mongoose'

export const tagsSchema = new Schema({ type: String, list: [String] }, { _id: false, versionKey: false })
