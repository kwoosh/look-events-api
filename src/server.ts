import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import router from './router'

const app = new Koa()

app.use(logger())
app.use(bodyParser())
app.use(router.routes())

app.listen(3000)

console.log('Server running on port http://localhost:3000')
