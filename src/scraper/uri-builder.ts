export type Tags = {
    city?: string
    tag?: string
}

export const buildURI = ({ city, tag }: Tags = {}): string => {
    let url = 'https://dou.ua/calendar/'

    if (city && !tag) url += `city/${city}/`
    if (!city && tag) url += `tags/${tag}/`
    if (city && tag) url += `tags/${tag}/${city}`

    return encodeURI(url)
}
