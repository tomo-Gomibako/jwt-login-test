const Router = require("koa-router")

const path = require("path")

const jwt = require("../jwt")

const router = new Router()

const db = {
	users: [
		{ id: "admin", password: "password" },
		{ id: "user", password: "hoge" }
	],
	tokens: [],
	get(key) {
		return db[key]
	},
	set(key, value) {
		if(!db[key])
			throw new Error("no such tables")
		db[key].push(value)
	},
	remove(key, index) {
		if(index < 0)
			return
		if(!db[key])
			throw new Error("no such tables")
		if(db[key].length <= index)
			throw new Error("out of range")
		return db[key].splice(index, 1)
	}
}

router.post("/login", async ctx => {
	const { id, password, token } = ctx.request.body
	const res = {}
	if(token) {
		let user = {}
		try {
			user = await jwt.decrypt(token, path.resolve(__dirname, "../keys/private.key"))
		} catch(err) {
			res.status = "invalid token"
			ctx.body = res
			return
		}
		console.log(user)
		const db_data = db.get("tokens").filter(v => v.id === user.id)[0]
		if(db_data && db_data.token === token && user.expire >= +new Date() / 1000 | 0)
			res.status = "success"
		else
			res.status = "expired"
		ctx.body = res
		return
	}
	if(!db.get("users").filter(v => v.id === id && v.password === password).length) {
		res.status = "failure"
		ctx.body = res
		return
	}
	res.status = "success"
	const newToken = await jwt.encrypt({
		id,
		// expire: +new Date() / 1000 | 0 + 604800
		expire: +new Date() / 1000 | 0 + 60
	}, path.resolve(__dirname, "../keys/private.key"))
	res.token = newToken
	// console.log(await jwt.decrypt(newToken, path.resolve(__dirname, "../keys/private.key")))
	db.remove("tokens", db.get("tokens").indexOf(db.get("tokens").filter(v => v.id === id)[0]))
	db.set("tokens", {
		id,
		token: newToken
	})
	// console.log(db.tokens)
	ctx.body = res
})

router.post("/logout", async ctx => {
	const { token } = ctx.request.body
	const res = {}
	if(!token) {
		res.status = "empty token"
		ctx.body = res
		return
	}
	try {
		user = await jwt.decrypt(token, path.resolve(__dirname, "../keys/private.key"))
	} catch(err) {
		res.status = "invalid token"
		ctx.body = res
		return
	}
	db.remove("tokens", db.get("tokens").indexOf(db.get("tokens").filter(v => v.id === user.id)[0]))
	res.status = "success"
	ctx.body = res
})

module.exports = router
