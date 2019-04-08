const Router = require("koa-router")

const router = new Router()

router.get("/ping", ctx => {
	ctx.body = "pong"
})
router.post("/ping", ctx => {
	ctx.body = "pong"
})

module.exports = router
