const Sequelize = require('sequelize')
const instance = require('../../../database')

const columns = {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	price: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	inventory: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	providerId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: require('../ModelTableProviders'),
			key: 'id'
		}
	}
}

const options = {
	freezeTableName: true,
	tableName: 'products',
	timestamps: true,
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	version: 'version'
}

module.exports = instance.define(
	'product',
	columns,
	options
)