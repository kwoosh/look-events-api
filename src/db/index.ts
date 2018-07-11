import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import * as moment from 'moment'
import * as path from 'path'
import { parseAllEvents, parseEventImage } from '../parser/events'
import { Event } from '../parser/events/event'
import { parseTags, Tags } from '../parser/tags'
import { rangeArray } from './rangeArray'

type Options = {
    limit: number
    offset: number
}

export default class DB {
    db: low.LowdbSync<{ events: Event[]; tags: Tags }>

    constructor() {
        const events: Event[] = []
        const tags: Tags = { topics: [], places: [] }

        this.db = low(new FileSync(path.join(__dirname, '/db.json')))
        this.db.defaults({ events, tags }).write()

        if (process.env.NODE_ENV !== 'development') this.fill()
    }

    async fill() {
        const startTime = moment()
        console.log(`Start fillig Database`)

        const events = await parseAllEvents()
        for (let event of events) {
            const image = await parseEventImage(event.id).catch(err => {
                console.error(err)
                return ''
            })
            event.image = image
        }
        this.db.set('events', events).write()

        const tags = await parseTags()
        this.db.set('tags', tags).write()

        const seconds = moment().diff(startTime, 'seconds')
        console.log(`Database successfuly filed with ${events.length} elements in ${seconds} seconds`)
    }

    getEvent(id: number): Event {
        return this.db
            .get('events')
            .find({ id: Number(id) })
            .value()
    }

    getList(tags: Tags, options: Options): Event[] {
        const list = this.db
            .get('events')
            .value()
            .filter(event => {
                if (!tags) return true

                let { topics, places } = tags

                if (!topics) topics = []
                if (!places) places = []

                let validEvent = false

                let hasTopic = false
                let hasCity = false

                topics.forEach(t => {
                    const eventTopics = event.topics.map(t => t.toLowerCase())
                    if (eventTopics.includes(t.toLowerCase())) hasTopic = true
                })

                places.forEach(p => {
                    const eventPlaces = event.places.map(p => p.toLowerCase())
                    if (eventPlaces.includes(p.toLowerCase())) hasCity = true
                })

                if (topics.length && !places.length) validEvent = hasTopic
                if (!topics.length && places.length) validEvent = hasCity
                if (topics.length && places.length) validEvent = hasCity && hasTopic
                if (!topics.length && !places.length) validEvent = true

                return validEvent
            })

        return rangeArray<Event>(list, options.limit, options.offset)
    }

    getCount(): number {
        return this.db.get('events').value().length
    }

    getTags(): Tags {
        return this.db.get('tags').value()
    }
}
