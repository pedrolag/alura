class NotFound extends Error {
	constructor (content) {
		super(`${content} was not found`)

		this.name = 'NotFound'
		this.id = 0
	}
}

module.exports = NotFound