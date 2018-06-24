import * as Router from 'koa-router'
import { defaultTags, REFILL_INTERVAL } from '../parser/utils'
import DB, { Tags } from '../db'

const router = new Router()
const eventsDB = new DB()

setInterval(() => eventsDB.fill(), REFILL_INTERVAL) // refill Events DB every 3 hours

router.get('/', async ctx => {
    ctx.body = {
        Version: '0.6.0',
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

router.get('/events/count', async ctx => {
    ctx.body = { count: eventsDB.getCount() }
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/events/:id', async ctx => {
    ctx.body = eventsDB.get(ctx.params.id)
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
