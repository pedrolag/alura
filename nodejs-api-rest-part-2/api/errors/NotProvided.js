class NotProvided extends Error {
	constructor (field) {
		const message = 'Data was not provided'
		
		super(message) 

		this.name = 'NotProvided'
		this.id = 2
	}
}

module.exports = NotProvided