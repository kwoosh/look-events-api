import * as Router from 'koa-router'
import DB from '../db'
import { Tags } from '../parser/tags'
import { REFILL_INTERVAL } from '../parser/utils'

const router = new Router()
const eventsDB = new DB()

setInterval(() => eventsDB.fill(), REFILL_INTERVAL) // refill Events DB

router.get('/', async ctx => {
    ctx.body = {
        version: '0.8.0',
        author: 'Andrew Pashinnik',
        contact: 'tobirawork@gmail.com',
        home: 'https://look-events-api.herokuapp.com/',
        repo: 'https://github.com/kwoosh/look-events-api/',
    }
})

router.get('/events', async ctx => {
    const tags: Tags = typeof ctx.query.tags === 'string' ? JSON.parse(ctx.query.tags) : ctx.query.tags

    const limit = Number(ctx.query.limit)
    const offset = Number(ctx.query.offset)

    const options = {
        limit: limit || limit === 0 ? limit : 10000,
        offset: offset || 0,
    }

    ctx.body = eventsDB.getList(tags, options)
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/events/count', async ctx => {
    ctx.body = { count: eventsDB.getCount() }
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/events/:id', async ctx => {
    const event = eventsDB.getEvent(ctx.params.id)
    if (!event) ctx.throw(404)

    ctx.body = event
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/tags/topics', async ctx => {
    ctx.body = eventsDB.getTags().topics
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/tags/places', async ctx => {
    ctx.body = eventsDB.getTags().places
    ctx.response.set({ 'Content-Type': 'application/json' })
})

export default router
