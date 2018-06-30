import { buildURI } from '../uri-builder'
import * as filters from './filters'

export type Event = {
    id: number
    title: string
    description: string
    image: string
    link: string
    price: string
    places: string[]
    topics: string[]
    time: { dates: string[]; raw: string }
}

export const formatEvent = (raw: Element): Event => ({
    id: filters.id(raw),
    title: filters.title(raw),
    time: filters.time(raw),
    price: filters.price(raw),
    places: filters.places(raw),
    description: filters.description(raw),
    link: buildURI({ id: filters.id(raw) }),
    topics: filters.topics(raw),
    image: '',
})
