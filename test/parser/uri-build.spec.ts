import { buildURI, Params } from '../../src/parser/uri-builder'

test('buildURI function', () => {
    const def = 'https://dou.ua/calendar'

    const totest: { params: Params; uri: string }[] = [
        {
            params: { fromArchive: true },
            uri: 'archive/',
        },
        {
            params: { fromArchive: true, page: 12 },
            uri: 'archive/12/',
        },
        {
            params: { page: 5 },
            uri: 'page-5/',
        },
        {
            params: { page: 1 },
            uri: '',
        },
        {
            params: { page: 0 },
            uri: '',
        },
        {
            params: { id: 34252 },
            uri: '34252/',
        },
        {
            params: { id: 34252, page: 10, fromArchive: true },
            uri: '34252/',
        },
    ]

    totest.forEach(({ params, uri }) => {
        expect(buildURI(params)).toBe(encodeURI(`${def}/${uri}`))
    })
})
