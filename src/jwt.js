const jwt = require("jsonwebtoken")

const path = require("path")
const promisify = require("util").promisify
const fs = require("fs")
const readFile = promisify(fs.readFile)

module.exports = {
	encrypt: (data, key_path) => {
		return new Promise(async (resolve, reject) => {
			const privateKey = await readFile(path.resolve(__dirname, key_path))
			resolve(jwt.sign(data, privateKey, { algorithm: "RS256"}))
		})
	},
	decrypt: (token, key_path) => {
		return new Promise(async (resolve, reject) => {
			const publicKey = await readFile(path.resolve(__dirname, key_path))
			jwt.verify(token, publicKey, { algorithms: ["RS256"] }, function(err, payload) {
				if(err)
					reject(err)
				else
					resolve(payload)
			})
		})
	}
}
