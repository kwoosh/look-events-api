import axios, { AxiosError } from 'axios'
import * as cheerio from 'cheerio'
import { buildURI, Tags } from './uri-builder'
import { cities, selectors } from './utils'

export function getPage(tags?: Tags): Promise<CheerioStatic | void> {
    return axios
        .get(buildURI(tags))
        .then(res => cheerio.load(res.data))
        .catch((err: AxiosError) => undefined)
}

export function getEventsForPage(tags?: Tags): Promise<Event[]> {
    return getPage(tags).then(page => {
        const events: Event[] = []

        if (page) {
            page(selectors.events).map((i, el) => {
                const event = cheerio(el)

                const id = Number(
                    event
                        .children('h2.title')
                        .children('a')
                        .attr('href')
                        .split('/')
                        .find(str => !!Number(str))
                )

                const title = event
                    .children('h2.title')
                    .text()
                    .trim()

                const description = event
                    .children('p.b-typo')
                    .text()
                    .trim()

                const topics = event
                    .children('div.more')
                    .find('a')
                    .map((i, elem) => cheerio(elem).text())
                    .get()

                const time = event
                    .children('div.when-and-where')
                    .find('span.date')
                    .text()
                    .trim()

                const price = event
                    .children('div.when-and-where')
                    .find('span')
                    .not('.date')
                    .text()
                    .trim()

                const place = event
                    .children('div.when-and-where')
                    .text()
                    .match(/[a-zA-Zа-яА-Я]+/g)
                    .find(str => {
                        if (str === 'Online') str = str.toLowerCase()
                        return cities.includes(str)
                    })

                events.push({ id, title, time, price, place, description, topics })
            })
        }

        return events
    })
}

export async function getAllEvents(tags?: Tags): Promise<Event[]> {
    const totalEvents: Event[] = []

    for (let i = 1; i < 50; i++) {
        const eventsFromPage = await getEventsForPage({ ...tags, page: i })
        if (!eventsFromPage.length) break
        totalEvents.push(...eventsFromPage)
    }

    return totalEvents
}

export type Event = {
    id: number
    title: string
    description: string
    time: string
    place: string
    price: string
    topics: string[]
}
