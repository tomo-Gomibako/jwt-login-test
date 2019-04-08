async function login() {
	const data = {
		id: document.querySelector("#id").value,
		password: document.querySelector("#password").value
	}
	console.log(await post("/login", data))
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
