import * as path from 'path'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import { getAllEvents, getEventPictureSrc } from '../parser/events'
import { Event } from '../parser/events/event'
import * as moment from 'moment'

export type Tags = { topics: string[]; places: string[] }

export default class DB {
    db: low.LowdbSync<{ events: Event[] }>

    constructor() {
        const events: Event[] = []

        this.db = low(new FileSync(path.join(__dirname, '/db.json')))
        this.db.defaults({ events }).write()

        if (process.env.NODE_ENV !== 'development') this.fill()
    }

    async fill() {
        const start = moment()
        console.log(`Start fillig Database`)

        const events = await getAllEvents()
        for (let event of events) {
            event.image = await getEventPictureSrc(event.id).catch(err => {
                console.error(err)
                return ''
            })
        }

        this.db.set('events', events).write()

        console.log(`Database successfuly filed with ${events.length} elements in ${moment().diff(start, 'seconds')} seconds`)
    }

    get(id: number): Event {
        return this.db
            .get('events')
            .find({ id: Number(id) })
            .value()
    }

    getList(tags?: Tags): Event[] {
        return this.db
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

                topics.forEach(topic => {
                    if (event.topics.includes(topic)) hasTopic = true
                })

                if (places.includes(event.place)) hasCity = true

                if (topics.length && !places.length) validEvent = hasTopic
                if (!topics.length && places.length) validEvent = hasCity
                if (topics.length && places.length) validEvent = hasCity && hasTopic

                return validEvent
            })
    }

    getCount(): number {
        return this.db.get('events').value().length
    }
}
