import { buildURI, Tags } from '../src/parser/uri-builder'

test('buildURI function', () => {
    const def = 'https://dou.ua/calendar'

    const totest: { tags: Tags; uri: string }[] = [
        {
            tags: { fromArchive: true },
            uri: 'archive/',
        },
        {
            tags: { page: 1 },
            uri: '',
        },
        {
            tags: { page: 2 },
            uri: 'page-2/',
        },
        {
            tags: { tag: 'golang' },
            uri: 'tags/golang/',
        },
        {
            tags: { tag: 'golang', page: 2 },
            uri: 'tags/golang/2/',
        },
        {
            tags: { tag: 'golang', city: 'Киев' },
            uri: 'tags/golang/Киев/',
        },
        {
            tags: { tag: 'golang', city: 'Киев', page: 2 },
            uri: 'tags/golang/Киев/2/',
        },
        {
            tags: { city: 'Киев' },
            uri: 'city/Киев/',
        },
        {
            tags: { city: 'Киев', page: 2 },
            uri: 'city/Киев/2/',
        },
    ]

    totest.forEach(({ tags, uri }) => {
        expect(buildURI(tags)).toBe(encodeURI(`${def}/${uri}`))
    })
})
