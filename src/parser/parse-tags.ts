import { Tags } from '../db'
import { loadDOM } from './load-dom'
import { SELECTORS, unique } from './utils'

function loadTags({ fromArchive }: { fromArchive: boolean }) {
    return loadDOM({ fromArchive }).then(dom => {
        if (dom) {
            const places: string[] = []
            const topics: string[] = []

            dom.window.document.querySelectorAll(SELECTORS.cities).forEach(elem => {
                let place = elem.textContent
                if (place === 'онлайн') place = 'Online'
                places.push(place)
            })

            dom.window.document.querySelectorAll(SELECTORS.topics).forEach(elem => {
                topics.push(elem.textContent)
            })

            return { topics, places }
        }
    })
}

export async function parseTags(): Promise<Tags> {
    const archiveTags = await loadTags({ fromArchive: true })
    const calendarTags = await loadTags({ fromArchive: false })

    return {
        topics: unique([...archiveTags.topics, ...calendarTags.topics]),
        places: unique([...archiveTags.places, ...calendarTags.places]),
    }
}
