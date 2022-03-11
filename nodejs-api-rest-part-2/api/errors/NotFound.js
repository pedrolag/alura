class NotFound extends Error {
	constructor () {
		super('Provider was not found')

		this.name = 'NotFound'
		this.id = 0
	}
}

module.exports = NotFound