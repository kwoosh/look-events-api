import { Event } from '../../parser/events/event'
import { EventModel } from './model'
import { Tags } from '../../parser/tags'

export default class EventsDB {
    constructor() {}

    cleanEvent(event: any): Event {
        delete event._id
        return event
    }

    get(id: number): Promise<Event | undefined> {
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

    insertList(events: Event[]) {
        return new Promise((resolve, reject) => {
            EventModel.insertMany(events)
                .then(resolve)
                .catch(reject)
        })
    }

    getList(tags: Tags, limit: number, offset: number): Promise<Event[]> {
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

    deleteList(): Promise<{}> {
        return new Promise((resolve, reject) => {
            EventModel.remove({})
                .then(resolve)
                .catch(reject)
        })
    }

    getCount(): Promise<number> {
        return new Promise((resolve, reject) => {
            EventModel.find()
                .count()
                .then(resolve)
                .catch(reject)
        })
    }
}
