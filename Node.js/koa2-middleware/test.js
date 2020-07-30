const Koa = require('./like-koa2')
const { rejects } = require('assert')

const app = new Koa()

app.use(async (ctx, next) => {
  await next()
  const rt = ctx['X-Request-Time']
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx['X-Request-Time'] = `${ms}ms`
})

function longQuest() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res('This is like koa2')
    }, 500)
  })
}

app.use(async (ctx, next) => {
  let data = await longQuest()
  ctx.response.end(data)
})

app.listen(5000, () => console.log('http://localhost:5000/'))
