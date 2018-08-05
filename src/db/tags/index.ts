import { Tags } from '../../parser/tags'
import { TagsModel } from './model'

export default class TagsDB {
    constructor() {}

    insert(tags: Tags): Promise<{}> {
        return new Promise((resolve, reject) => {
            TagsModel.insertMany([
                {
                    type: 'topics',
                    list: tags.topics,
                },
                {
                    type: 'places',
                    list: tags.places,
                },
            ])
                .then(resolve)
                .catch(reject)
        })
    }

    delete(): Promise<{}> {
        return new Promise((resolve, reject) => {
            TagsModel.remove({})
                .then(resolve)
                .catch(reject)
        })
    }

    get(): Promise<Tags> {
        return new Promise((resolve, reject) => {
            TagsModel.find()
                .then((docs: any) => {
                    const findByType = (type: string) => {
                        const doc = docs.find((doc: any) => doc.toObject().type === type)
                        if (!doc) return []
                        return doc.toObject().list
                    }

                    const tags: Tags = { topics: findByType('topics'), places: findByType('places') }
                    return tags
                })
                .then(resolve)
                .catch(reject)
        })
    }
}
