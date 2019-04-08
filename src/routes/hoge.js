const Router = require("koa-router")

const router = new Router()

router.get("/hoge", ctx => {
	ctx.body = "fuga"
})

module.exports = router
