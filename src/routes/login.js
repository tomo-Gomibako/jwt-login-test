const Router = require("koa-router")

const router = new Router()

router.post("/login", ctx => {
	const { id, password } = ctx.request.body
	const res = {}
	res.status = check(id, password) ? "success" : "failure"
	ctx.body = res
})

function check(id, password) {
	const db = [
		{ id: "admin", password: "password" },
		{ id: "user", password: "hoge" }
	]
	for(const v of db) {
		if(v.id === id && v.password === password)
			return true
	}
	return false
}

module.exports = router
