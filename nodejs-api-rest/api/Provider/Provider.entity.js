const Sequelize = require('sequelize')
const connection = require('../database')

const columns = {
	company: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	category: {
		type: Sequelize.ENUM('food', 'toy'),
		allowNull: false
	},
}

const options = {
	freezeTableName: true,
	tableName: 'providers',
	timestamps: true,
	createdAt: 'createdAt',
	updatedAt: 'updatedAt',
	version: 'version'
}

module.exports = connection.define(
	'provider',
	columns,
	options
)