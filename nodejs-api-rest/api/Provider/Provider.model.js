class Provider {
	constructor({
		id,
		company,
		email,
		category,
		createdAt,
		updatedAt,
		version
	}) {
		this.id = id
		this.company = company
		this.email = email
		this.category = category
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.version = version
	}
}

module.exports = Provider