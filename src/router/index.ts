import * as Router from 'koa-router'
import { getEvents } from '../scraper/events'
import { Tags } from '../scraper/uri-builder'

const router = new Router()
const v1 = router.prefix('/v1')

v1.get('/events', async ctx => {
    const tags: Tags = {}

    if (ctx.query.city) tags.city = ctx.query.city
    if (ctx.query.tag) tags.tag = ctx.query.tag

    const events = await getEvents(tags)

    ctx.response.set({ 'Content-Type': 'application/json' })
    ctx.body = events
})

export default router
