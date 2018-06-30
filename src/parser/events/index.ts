import { loadDOM } from '../load-dom'
import { Params } from '../uri-builder'
import { SELECTORS } from '../utils'
import { Event, formatEvent } from './event'

export function getEventPictureSrc(id: number) {
    return loadDOM({ id }).then(dom => {
        if (dom) return dom.window.document.querySelector(SELECTORS.singleEventPicture).getAttribute('src')
    })
}

export function getEventsForPage(params?: Params): Promise<Event[]> {
    return loadDOM(params).then(async dom => {
        const events: Event[] = []

        if (dom)
            dom.window.document.querySelectorAll(SELECTORS.events).forEach(elem => {
                const event = formatEvent(elem)
                events.push(event)
            })

        return events
    })
}

export async function getAllEvents(): Promise<Event[]> {
    const totalEvents: Event[] = []

    for (let page = 1; page < 50; page++) {
        const eventsFromPage = await getEventsForPage({ page })
        if (!eventsFromPage.length) break

        totalEvents.push(...eventsFromPage)
    }

    return totalEvents
}
