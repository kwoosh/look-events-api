import { rangeList } from '../../src/db'

test('rangeList function', () => {
    const arr = ['lol', 'kek', 'some', 'other']

    const testOptions = [
        {
            limit: 2,
            offset: 0,
            result: ['lol', 'kek'],
        },
        {
            limit: 2,
            offset: 1,
            result: ['kek', 'some'],
        },
        {
            limit: 0,
            offset: 0,
            result: [],
        },
        {
            limit: 0,
            offset: 2,
            result: [],
        },
        {
            limit: 1000,
            offset: 0,
            result: ['lol', 'kek', 'some', 'other'],
        },
        {
            limit: 1,
            offset: 100,
            result: [],
        },
    ]

    testOptions.forEach(({ limit, offset, result }) => {
        const limited = rangeList<string>(arr, limit, offset)

        expect(limited).toEqual(result)
    })
})
