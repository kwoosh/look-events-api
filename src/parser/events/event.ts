import * as filters from './filters'
import { buildURI } from '../uri-builder'

export type Event = {
    id: number
    title: string
    description: string
    image: string
    uri: string
    place: string
    price: string
    time: string[]
    topics: string[]
}

export const formatEvent = (rawElem: Cheerio): Event => ({
    id: filters.id(rawElem),
    title: filters.title(rawElem),
    price: filters.price(rawElem),
    place: filters.place(rawElem),
    description: filters.description(rawElem),
    uri: buildURI({ id: filters.id(rawElem) }),
    image: '',
    time: filters.time(rawElem),
    topics: filters.topics(rawElem),
})
