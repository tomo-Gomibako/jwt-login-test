const Koa = require("koa")

const app = new Koa()

const ping = require("./ping")
const hoge = require("./hoge")

app.use(ping.routes())
app.use(ping.allowedMethods())
app.use(hoge.routes())
app.use(hoge.allowedMethods())

app.listen(3000)
