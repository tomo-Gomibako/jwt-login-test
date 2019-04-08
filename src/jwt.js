const jwt = require("jsonwebtoken")

const promisify = require("util").promisify
const fs = require("fs")
const readFile = promisify(fs.readFile)

module.exports = {
	encrypt: (data, key_path) => {
		if(typeof key_path !== "string")
			throw new Error("key_path must be a string")
		return new Promise(async (resolve, reject) => {
			const key = await readFile(key_path)
			resolve(jwt.sign(data, key, { algorithm: "HS256"}))
		})
	},
	decrypt: (token, key_path) => {
		if(typeof key_path !== "string")
			throw new Error("key_path must be a string")
		return new Promise(async (resolve, reject) => {
			const cert = await readFile(key_path)
			jwt.verify(token, cert, { algorithm: "HS256" }, function(err, payload) {
				if(err)
					reject(err)
				else
					resolve(payload)
			})
		})
	}
}
