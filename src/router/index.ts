import * as Router from 'koa-router'

const router = new Router()

router.get('/*', async ctx => {
    ctx.body = 'IT events API powered by DOU.ua'
})

export default router
