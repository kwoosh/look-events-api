import * as moment from 'moment'
import { connect, connection } from 'mongoose'
import config from '../config'
import { parseAllEvents } from '../parser/events'
import { Event } from '../parser/events/event'
import { parseTags, Tags } from '../parser/tags'
import { EventModel, TagsModel } from './models'

connection.on('error', error => {
    console.error('Сonnection ERROR:', error)
})

connection.once('open', () => {
    console.log('Connected to db (^_^)')
})

class DB {
    constructor() {
        connect(
            process.env.DB_URI || config.LOCAL_DB_URI,
            { useNewUrlParser: true }
        )

        if (config.DEV) this.fill()
    }

    cleanEvent(event: any): Event {
        delete event._id
        return event
    }

    async fill() {
        console.log(`Start fillig Database...`)
        const startTime = moment()

        const events = await parseAllEvents()
        await this.deleteEvents()
        await this.insertEvents(events)

        const tags = await parseTags()
        await this.deleteTags()
        await this.insertTags(tags)

        const seconds = moment().diff(startTime, 'seconds')
        console.log(`Database successfuly filed with ${events.length} elements in ${seconds} seconds`)
    }

    insertEvents(events: Event[]) {
        return new Promise((resolve, reject) => {
            EventModel.insertMany(events)
                .then(resolve)
                .catch(reject)
        })
    }

    getEvent(id: number): Promise<Event | undefined> {
        return new Promise((resolve, reject) => {
            EventModel.findOne({ id })
                .then(doc => {
                    if (doc) {
                        const event: Event = doc.toJSON({ versionKey: false, minimize: false })
                        resolve(this.cleanEvent(event))
                    } else {
                        resolve(undefined)
                    }
                })
                .catch(reject)
        })
    }

    getEvents(tags: Tags, limit: number, offset: number): Promise<Event[]> {
        return new Promise((resolve, reject) => {
            let eventsQuery = EventModel.find()

            if (tags.places.length) eventsQuery = eventsQuery.where('places').in(tags.places)
            if (tags.topics.length) eventsQuery = eventsQuery.where('topics').in(tags.topics)

            eventsQuery
                .then((docs): Event[] => docs.map(doc => doc.toObject()))
                .then(events => events.slice(offset, offset + limit))
                .then(events => events.map(e => this.cleanEvent(e)))
                .then(resolve)
                .catch(reject)
        })
    }

    getEventsCount(): Promise<number> {
        return new Promise((resolve, reject) => {
            EventModel.find()
                .count()
                .then(resolve)
                .catch(reject)
        })
    }

    deleteEvents(): Promise<{}> {
        return new Promise((resolve, reject) => {
            EventModel.remove({})
                .then(resolve)
                .catch(reject)
        })
    }

    insertTags(tags: Tags): Promise<{}> {
        return new Promise((resolve, reject) => {
            TagsModel.insertMany([
                {
                    type: 'topics',
                    list: tags.topics,
                },
                {
                    type: 'places',
                    list: tags.places,
                },
            ])
                .then(resolve)
                .catch(reject)
        })
    }

    deleteTags(): Promise<{}> {
        return new Promise((resolve, reject) => {
            TagsModel.remove({})
                .then(resolve)
                .catch(reject)
        })
    }

    getTags(): Promise<Tags> {
        return new Promise((resolve, reject) => {
            TagsModel.find()
                .then(docs => {
                    const findByType = (type: string) => {
                        const doc = docs.find(doc => doc.toObject().type === type)
                        if (!doc) return []
                        return doc.toObject().list
                    }

                    const tags: Tags = { topics: findByType('topics'), places: findByType('places') }
                    return tags
                })
                .then(resolve)
                .catch(reject)
        })
    }
}

export const db = new DB()
