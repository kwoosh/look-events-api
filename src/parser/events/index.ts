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

    for (let page = 1; page < 50; page++) {
        const eventsFromPage = await getEventsForPage({ ...tags, page })

        if (!eventsFromPage.length) break

        totalEvents.push(...eventsFromPage)
    }

    return totalEvents
}
