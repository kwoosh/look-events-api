export type Tags = {
    city?: string
    tag?: string
    page?: number
}

export const buildURI = ({ city, tag, page }: Tags = {}): string => {
    let url = 'https://dou.ua/calendar/'

    if (city && !tag) url += `city/${city}/`
    if (!city && tag) url += `tags/${tag}/`
    if (city && tag) url += `tags/${tag}/${city}/`

    if (page >= 2 && !city && !tag) url += `page-${page}/`
    else if (page >= 2) url += `${page}/`

    return encodeURI(url)
}
