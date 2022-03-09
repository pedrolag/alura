const service = require('./Provider.service')

module.exports = {
	getAll(response) {
		const result = service.getAll()

		response.send(
			JSON.stringify(result)
		)
	},

	create(request, response) {
		const result = service.create(request)

		response.send(
			JSON.stringify(result)
		)
	}
}