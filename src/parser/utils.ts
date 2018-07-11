export const PARSE_REGEXPS = {
    date: /(\d){1,2}\s([а-я]+)?(\s)?((\d){4})?/gi,
    place: /[а-яА-Яa-zA-Z\-]+/gi,
}

export const REFILL_INTERVAL = 1000 * 60 * 60 * 3

const mainRoot = 'body > div.g-page > div.l-content.m-content > div > div.col70.m-cola > div > div > div.col50.m-cola'

export const SELECTORS = {
    events: `${mainRoot} > article.b-postcard`,
    cities: `${mainRoot} > div.page-head > h1 > select:nth-child(2) > option`,
    topics: `${mainRoot} > div.page-head > h1 > select:nth-child(3) > option`,
    singleEventPicture:
        'body > div.g-page > div.l-content.m-content > div.l-content-wrap > div.cell.g-right-shadowed.mobtab-maincol > div.event-info > img',
}

export function unique(arr: string[]) {
    return arr.filter((v, i, a) => a.indexOf(v) === i)
}
