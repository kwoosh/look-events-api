import * as moment from 'moment'
import { PARSE_DATE_REGEX, PARSE_PLACE_REGEX } from '../utils'

export function id(element: Element): number {
    return Number(
        element
            .querySelector('h2.title a')
            .getAttribute('href')
            .split('/')
            .find(str => !!Number(str))
    )
}

export function title(element: Element): string {
    return element.querySelector('h2.title a').textContent.trim()
}

export function description(element: Element): string {
    return element.querySelector('p.b-typo').textContent.trim()
}

export function topics(element: Element): string[] {
    const topics: string[] = []

    element.querySelectorAll('div.more a').forEach(e => {
        topics.push(e.textContent)
    })

    return topics
}

export function price(element: Element): string {
    const el = element.querySelector('div.when-and-where')

    return el.lastElementChild.textContent.trim()
}

export function places(element: Element): string[] {
    const el = element.querySelector('div.when-and-where')

    el.removeChild(el.querySelector('span.date'))
    if (el.children.length) el.removeChild(el.querySelector('span'))

    return el.textContent.trim().match(PARSE_PLACE_REGEX)
}

export function time(element: Element): { dates: string[]; raw: string } {
    const rawDate = element.querySelector('div.when-and-where span.date').textContent

    const matched = rawDate.match(PARSE_DATE_REGEX).map(str => str.trim())

    if (Number(matched[0])) {
        const month = matched[1].split(' ')[1]
        matched[0] = `${matched[0]} ${month}`
    }

    const dates = matched.map(str => moment(str, 'DD MMM YYYY', 'ru').toISOString())

    return { raw: rawDate, dates }
}
