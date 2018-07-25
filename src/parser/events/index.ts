import { loadDOM } from '../load-dom'
import { Params } from '../uri-builder'
import { SELECTORS } from '../utils'
import { Event, formatEvent } from './event'

export function parseEventImage(id: number) {
    return loadDOM({ id }).then(dom => {
        if (dom) return dom.window.document.querySelector(SELECTORS.singleEventPicture).getAttribute('src')
    })
}

export function parseEventsFromPage(params?: Params): Promise<Event[]> {
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

export async function parseAllEvents(): Promise<Event[]> {
    const totalEvents: Event[] = []

    for (let page = 1; page < 50; page++) {
        const eventsFromPage = await parseEventsFromPage({ page })
        if (!eventsFromPage.length) break

        totalEvents.push(...eventsFromPage)
    }

    for (let event of totalEvents) {
        const image = await parseEventImage(event.id).catch(err => {
            console.error(err)
            return ''
        })

        event.image = image
    }

    return totalEvents
}
