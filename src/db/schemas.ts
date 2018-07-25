import { Schema } from 'mongoose'

export const tagsSchema = new Schema({ type: String, list: [String] }, { _id: false, versionKey: false })

export const eventSchema = new Schema(
    {
        id: Number,
        title: String,
        description: String,
        image: String,
        link: String,
        price: String,
        places: [String],
        topics: [String],
        time: {
            dates: [String],
            raw: String,
        },
    },
    { _id: false, versionKey: false }
)
