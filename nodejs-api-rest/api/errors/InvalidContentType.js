class InvalidContentType extends Error {
	constructor (contentType) {
		const message = `Invalid content type: ${contentType}`
		
		super(message) 

		this.name = 'InvalidContentType'
		this.id = 3
	}
}

module.exports = InvalidContentType