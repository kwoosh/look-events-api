export type Tags = {
    city?: string
    tag?: string
    page?: number
    fromArchive?: boolean
}

export const buildURI = ({ city, tag, page, fromArchive }: Tags = { fromArchive: false }): string => {
    let url = fromArchive ? 'archive/' : ''

    if (city && !tag) url += `city/${city}/`
    if (!city && tag) url += `tags/${tag}/`
    if (city && tag) url += `tags/${tag}/${city}/`

    if (page >= 2 && !city && !tag) url += `page-${page}/`
    else if (page >= 2) url += `${page}/`

    return encodeURI(`https://dou.ua/calendar/${url}`)
}
