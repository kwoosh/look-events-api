import * as Router from 'koa-router'
import { getAllEvents } from '../scraper/events'
import { tags } from '../scraper/utils'

const router = new Router()

router.get('/events', async ctx => {
    const events = await getAllEvents({
        city: ctx.query.city,
        tag: ctx.query.tag,
    })

    ctx.body = events
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/tag/topics', async ctx => {
    ctx.body = tags.topics
    ctx.response.set({ 'Content-Type': 'application/json' })
})

router.get('/tag/cities', async ctx => {
    ctx.body = tags.cities
    ctx.response.set({ 'Content-Type': 'application/json' })
})

export default router
