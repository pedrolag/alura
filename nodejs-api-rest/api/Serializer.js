const InvalidContentType = require('./errors/InvalidContentType')

class Serializer {
	json (data) {
		return JSON.stringify(data)
	}

	serialize (data) {
		if (this.contentType === 'application/json') {
			return this.json(data)
		}

		throw new InvalidContentType(this.contentType)
	}
}

module.exports = Serializer