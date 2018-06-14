import * as Router from 'koa-router'
import { getAllEvents } from '../scraper/events'
import { topics, cities } from '../scraper/utils'

const router = new Router({ prefix: '/api/v1' })

router.get('/events', async ctx => {
    const events = await getAllEvents({
        city: ctx.query.city,
        tag: ctx.query.tag,
    })

    ctx.body = events
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/topics', async ctx => {
    ctx.body = topics
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/cities', async ctx => {
    ctx.body = cities
    ctx.response.set({ 'Content-Type': 'application/json' })
})

export default router
