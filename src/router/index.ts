import * as Router from 'koa-router'
import { defaultTags } from '../parser/utils'
import DB, { Tags } from '../db'

const router = new Router()
const eventsDB = new DB()

setInterval(() => eventsDB.fill(), 1000 * 60 * 60) // refill Events DB every hour

router.get('/', async ctx => {
    ctx.body = {
        Version: '0.5.1',
        Author: 'Andrew Pashinnik',
        Contact: 'tobirawork@gmail.com',
        Home: 'https://look-events-api.herokuapp.com/',
        GitHub: 'https://github.com/kwoosh/look-events-api/',
    }
})

router.get('/events', async ctx => {
    const tags: Tags = typeof ctx.query.tags === 'string' ? JSON.parse(ctx.query.tags) : ctx.query.tags

    ctx.body = eventsDB.getList(tags)
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/event/:id', async ctx => {
    const event = eventsDB.get(ctx.params.id)

    ctx.body = event
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/tag/topics', async ctx => {
    ctx.body = defaultTags.topics
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/tag/places', async ctx => {
    ctx.body = defaultTags.places
    ctx.response.set({ 'Content-Type': 'application/json' })
})

export default router
