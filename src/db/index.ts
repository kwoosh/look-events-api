import * as moment from 'moment'
import { connect, connection } from 'mongoose'
import config from '../config'
import { parseAllEvents } from '../parser/events'
import { parseTags } from '../parser/tags'
import EventsDB from './events'
import TagsDB from './tags'

connection.on('error', error => {
    console.error('Сonnection ERROR:', error)
})

connection.once('open', () => {
    console.log('Connected to db (^_^)')
})

class DB {
    events: EventsDB
    tags: TagsDB

    constructor() {
        connect(
            process.env.DB_URI || config.LOCAL_DB_URI,
            { useNewUrlParser: true }
        )

        if (process.env.NODE_ENV !== 'development') this.fill()

        this.events = new EventsDB()
        this.tags = new TagsDB()
    }

    async fill() {
        console.log(`Start fillig Database...`)
        const startTime = moment()

        const events = await parseAllEvents()
        await this.events.deleteList()
        await this.events.insertList(events)

        const tags = await parseTags()
        await this.tags.delete()
        await this.tags.insert(tags)

        const seconds = moment().diff(startTime, 'seconds')
        console.log(`Database successfuly filed with ${events.length} elements in ${seconds} seconds`)
    }
}

export const db = new DB()
