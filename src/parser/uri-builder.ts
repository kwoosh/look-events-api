export type Params = {
    id?: number
    page?: number
    fromArchive?: boolean
}

export const buildURI = ({ page, fromArchive, id }: Params = { fromArchive: false }): string => {
    let url = fromArchive ? 'archive/' : ''

    if (page >= 2 && fromArchive) url += `${page}/`
    if (page >= 2 && !fromArchive) url += `page-${page}/`
    if (id) url = `${id}/`

    return encodeURI(`https://dou.ua/calendar/${url}`)
}
