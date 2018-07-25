import * as Router from 'koa-router'
import { db } from './db'
import { handleQueryStringTags } from './parser/tags'
import { REFILL_INTERVAL } from './parser/utils'

const router = new Router()

setInterval(() => db.fill(), REFILL_INTERVAL) // refill DB

router.get('/', async ctx => {
    ctx.body = {
        version: '0.9.1',
        author: 'Andrew Pashinnik',
        contact: 'tobirawork@gmail.com',
        home: 'https://look-events-api.herokuapp.com/',
        repo: 'https://github.com/kwoosh/look-events-api/',
    }
})

router.get('/events', async ctx => {
    const tags = handleQueryStringTags(ctx.query.tags)
    const limit = Number(ctx.query.limit)
    const offset = Number(ctx.query.offset)

    const options = {
        limit: limit || limit === 0 ? limit : 10000,
        offset: offset || 0,
    }

    ctx.body = await db.getEvents(tags, options.limit, options.offset)
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/events/count', async ctx => {
    const count = await db.getEventsCount()

    ctx.body = { count }
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/events/:id', async ctx => {
    const event = await db.getEvent(Number(ctx.params.id))
    if (!event) ctx.throw(404)

    ctx.body = event
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/tags/topics', async ctx => {
    const { topics } = await db.getTags()

    ctx.body = topics
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/tags/places', async ctx => {
    const { places } = await db.getTags()

    ctx.body = places
    ctx.response.set({ 'Content-Type': 'application/json' })
})

export default router
