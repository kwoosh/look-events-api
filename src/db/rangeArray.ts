export function rangeArray<T>(arr: T[], limit: number = 0, offset: number = 0) {
    return arr.slice(offset, offset + limit)
}
