const Koa = require("koa")
const logger = require("koa-logger")
const session = require("koa-session")
const serve = require("koa-static")
const body = require("koa-body")

const path = require("path")

const routes = require("./routes")
// const jwt = require("./jwt")

const app = new Koa()

app.use(serve(path.resolve(__dirname, "../public")))
app.use(logger())
app.use(body())
app.use(session({
	key: "koa:sess",
	maxAge: 86400000,
	overwrite: true,
	httpOnly: true,
	signed: true
}, app))

for(const key in routes) {
	app.use(routes[key].routes())
	app.use(routes[key].allowedMethods())
}

// async function main() {
// 	let token
// 	console.log(token = await jwt.encrypt({ hoge: "fuga" }, "./keys/private.key"))
// 	console.log(await jwt.decrypt(token, "./keys/public.key"))
// }
// main()

app.listen(3000)
