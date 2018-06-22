import * as cheerio from 'cheerio'
import { Params } from '../uri-builder'
import { selectors } from '../utils'
import { loadPage } from '../load-page'
import { Event, formatEvent } from './event'

export function getEventPictureSrc(id: number) {
    return loadPage({ id }).then(page => {
        if (page) return page(selectors.singleEventPicture).attr('src')
    })
}

export function getEventsForPage(params?: Params): Promise<Event[]> {
    return loadPage(params).then(async page => {
        const events: Event[] = []

        if (page)
            page(selectors.events).map((_, element) => {
                events.push(formatEvent(cheerio(element)))
            })

        return events
    })
}

export async function getAllEvents(params?: Params): Promise<Event[]> {
    const totalEvents: Event[] = []

    for (let page = 1; page < 50; page++) {
        const eventsFromPage = await getEventsForPage({ ...params, page })
        if (!eventsFromPage.length) break

        totalEvents.push(...eventsFromPage)
    }

    return totalEvents
}
