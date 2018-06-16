import * as cheerio from 'cheerio'
import * as moment from 'moment'
import { tags, parseDateRegExp } from '../utils'

export function id(elem: Cheerio): number {
    return Number(
        elem
            .children('h2.title')
            .children('a')
            .attr('href')
            .split('/')
            .find(str => !!Number(str))
    )
}

export function title(elem: Cheerio): string {
    return elem
        .children('h2.title')
        .text()
        .trim()
}

export function description(elem: Cheerio): string {
    return elem
        .children('p.b-typo')
        .text()
        .trim()
}

export function topics(elem: Cheerio): string[] {
    return elem
        .children('div.more')
        .find('a')
        .map((_, a) => cheerio(a).text())
        .get()
}

export function price(elem: Cheerio): string {
    return elem
        .children('div.when-and-where')
        .find('span')
        .not('.date')
        .text()
        .trim()
}

export function place(elem: Cheerio): string {
    return elem
        .children('div.when-and-where')
        .text()
        .match(/[a-zA-Zа-яА-Я]+/g)
        .find(str => tags.cities.map(city => city.toLowerCase()).includes(str.toLowerCase()))
}

export function time(elem: Cheerio): string[] {
    const rawDates = elem
        .children('div.when-and-where')
        .find('span.date')
        .text()
        .trim()
        .match(parseDateRegExp)
        .map(str => str.trim())

    if (Number(rawDates[0])) {
        const month = rawDates[1].split(' ')[1]
        rawDates[0] = `${rawDates[0]} ${month}`
    }

    return rawDates.map(str => moment(str, 'DD MMM YYYY', 'ru').toISOString())
}
