class Invalid extends Error {
	constructor (field) {
		const message = `Invalid field: ${field}`
		
		super(message) 

		this.name = 'Invalid'
		this.id = 1
	}
}

module.exports = Invalid