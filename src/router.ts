import * as Router from 'koa-router'
import { schedule } from 'node-cron'
import { db } from './db'
import { handleQueryStringTags } from './parser/tags'

schedule('0 0 */3 * * *', () => {
    db.fill()
})

const router = new Router()

router.get('/', async ctx => {
    ctx.body = {
        version: '0.9.3',
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

    ctx.body = await db.events.getList(tags, options.limit, options.offset)
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/events/count', async ctx => {
    const count = await db.events.getCount()

    ctx.body = { count }
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/events/:id', async ctx => {
    const event = await db.events.get(Number(ctx.params.id))
    if (!event) ctx.throw(404)

    ctx.body = event
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/tags/topics', async ctx => {
    const { topics } = await db.tags.get()

    ctx.body = topics
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/tags/places', async ctx => {
    const { places } = await db.tags.get()

    ctx.body = places
    ctx.response.set({ 'Content-Type': 'application/json' })
})

export default router
