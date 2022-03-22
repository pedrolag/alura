const InvalidContentType = require('./errors/InvalidContentType')
const jsonToXml = require('jsontoxml')

class Serializer {
	json (data) {
		return JSON.stringify(data)
	}

	xml (data) {
		let tag = this.tag

		if (Array.isArray(data)) {
			tag = this.tagGroup

			data = data.map(item => {
				return {
					[this.tag]: item
				}
			})
		}

		return jsonToXml({
			[tag]: data
		})
	}

	serialize (data) {
		const filteredData = this.filter(data)

		if (this.contentType === 'application/json') {
			return this.json(filteredData)
		}

		if (this.contentType === 'application/xml') {
			return this.xml(filteredData)
		}

		throw new InvalidContentType(this.contentType)
	}

	filterObject (data) {
		const newRequest = {}

		this.publicFields.forEach(field => {
			if (data.hasOwnProperty(field)) {
				newRequest[field] = data[field]
			}
		})

		return newRequest
	}

	filter (data) {
		if (Array.isArray(data)) {
			data = data.map(item => { 
				return this.filterObject(item)
			})
		} else {
			data = this.filterObject(data)
		}

		return data
	}
}

class ProviderSerializer extends Serializer {
	constructor (contentType, customFields) {
		super()
		this.tag = 'provider'
		this.tagGroup = 'providers'
		this.contentType = contentType
		this.publicFields = [
			'id',
			'company',
			'category'
		].concat(customFields || [])
	}
}

class ProductSerializer extends Serializer {
	constructor(contentType, customFields) {
		super()
		this.tag = 'product'
		this.tagGroup = 'products'
		this.contentType = contentType
		this.publicFields = [
			'id',
			'name'
		].concat(customFields || [])

	}
}

class ErrorSerializer extends Serializer {
	constructor (contentType, customFields) {
		super()
		this.tag = 'error'
		this.tagGroup = 'errors'
		this.contentType = contentType
		this.publicFields = [
			'id',
			'message'
		].concat(customFields || [])
	}
}

module.exports = {
	Serializer: Serializer,
	ProviderSerializer: ProviderSerializer,
	ProductSerializer: ProductSerializer,
	ErrorSerializer: ErrorSerializer,
	validContentTypes: [
		'application/json',
		'application/xml'
	]
}