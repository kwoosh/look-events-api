import * as cheerio from 'cheerio'
import { Tags } from '../uri-builder'
import { selectors } from '../utils'
import { getPage } from '../get-page'
import { Event, formatEvent } from './event'

export function getEventsForPage(tags?: Tags): Promise<Event[]> {
    return getPage(tags).then(page => {
        const events: Event[] = []

        if (page) page(selectors.events).map((i, element) => events.push(formatEvent(cheerio(element))))

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
