import { unique } from '../../src/parser/utils'

test('unique function', () => {
    const arr = ['some', 'lol', 'kek', 'lol', 'some', 'some', 'some', 'kek', 'nan']
    const arrOfUnique = ['some', 'lol', 'kek', 'nan']

    expect(unique(arr)).toEqual(arrOfUnique)
})
