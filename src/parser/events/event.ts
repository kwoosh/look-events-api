import * as filters from './filters'
import { buildURI } from '../uri-builder'

export type Event = {
    id: number
    title: string
    description: string
    image: string
    link: string
    place: string
    price: string
    topics: string[]
    time: { dates: string[]; raw: string }
}

export const formatEvent = (raw: Element): Event => ({
    id: filters.id(raw),
    title: filters.title(raw),
    price: filters.price(raw),
    time: filters.time(raw),
    place: filters.place(raw),
    description: filters.description(raw),
    link: buildURI({ id: filters.id(raw) }),
    topics: filters.topics(raw),
    image: '',
})
