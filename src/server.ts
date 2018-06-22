import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import router from './router'

const app = new Koa()

app.use(logger())
app.use(bodyParser())
app.use(router.routes())

app.use((ctx, next) => {
    ctx.body = { error: 'Invalid or incomplete endpoint' }
})

app.listen(process.env.PORT || 3000)

if (process.env.NODE_ENV === 'development') console.log('Server running on port http://localhost:3000')
