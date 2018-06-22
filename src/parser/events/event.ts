import * as filters from './filters'

export type Event = {
    id: number
    title: string
    description: string
    image?: string
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
    time: filters.time(rawElem),
    topics: filters.topics(rawElem),
})
