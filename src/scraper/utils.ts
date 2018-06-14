import * as path from 'path'
import * as fs from 'fs'
import { getPage } from './events'

export const mainRoot =
    'body > div.g-page > div.l-content.m-content > div > div.col70.m-cola > div > div > div.col50.m-cola'

export const selectors = {
    events: `${mainRoot} > article.b-postcard`,
    cities: `${mainRoot} > div.page-head > h1 > select:nth-child(2) > option`,
    topics: `${mainRoot} > div.page-head > h1 > select:nth-child(3) > option`,
}

export const cities = [
    'по всем городам',
    'Винница',
    'Днепр',
    'Запорожье',
    'Ивано-Франковск',
    'Киев',
    'Кременчуг',
    'Кропивницкий',
    'Львов',
    'Минск',
    'Мюнхен',
    'Одесса',
    'Ровно',
    'Тернополь',
    'Харьков',
    'Хмельницкий',
    'Черновцы',
    'Шостка',
    'online',
]

export const topics = [
    'по всем темам',
    '.NET',
    '3D',
    'Agile',
    'AI',
    'Android',
    'BA',
    'Blockchain',
    'C',
    'C++',
    'cloud',
    'Data Science',
    'DevOps',
    'Front-end',
    'gamedev',
    'Go',
    'golang',
    'HR',
    'iOS',
    'IoT',
    'Java',
    'JavaScript',
    'mobile',
    'PHP',
    'Python',
    'QA',
    'Ruby',
    'Sales',
    'английский',
    'безопасность',
    'бизнес',
    'вебинар',
    'вечеринка',
    'дизайн',
    'карьера',
    'клубные встречи',
    'конкурс',
    'конференция',
    'курсы',
    'маркетинг',
    'менеджмент',
    'семинар',
    'соревнование',
    'соревнования',
    'стартап',
    'хакатон',
]

export function writeTags2File(): void {
    getPage()
        .then(page => {
            const cities = page(selectors.cities)
                .map((i, el) => el.children[0].data)
                .get()
                .map(str => {
                    if (str === 'онлайн') str = 'online'
                    return str
                })

            const topics = page(selectors.topics)
                .map((i, el) => el.children[0].data)
                .get()

            return { topics, cities }
        })
        .then(data => {
            fs.writeFileSync(path.join(__dirname, '/tags.json'), JSON.stringify(data))
        })
}
