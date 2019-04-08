(async function () {
	const token = localStorage.getItem("token")
	console.log("have token:", !!token)
	if(token) {
		const res = await post("/login", { token })
		console.log(res)
		if(res.status === "success") {
			msg("You already logged in!")
		} else {
			localStorage.removeItem("token")
			msg("Your token is expired.")
		}
	}
})()

async function login() {
	const data = {
		id: document.querySelector("#id").value,
		password: document.querySelector("#password").value
	}
	const res = await post("/login", data)
	console.log(res)
	if(res.token) {
		localStorage.setItem("token", res.token)
		msg("You just logged in!")
	}
}

async function logout() {
	// const res = await post("/login", data)
	// console.log(res)
	// if(res.token)
	// 	localStorage.setItem("token", res.token)
}

function post(url, data) {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json; charset=utf-8"
			},
			redirect: "follow",
			referrer: "no-referrer",
			body: JSON.stringify(data)
		}).then(response => {
			resolve(response.json())
		}).catch(err => {
			reject(err)
		})
	})
}

function msg(str) {
	document.querySelector("#display").innerText = str
}
