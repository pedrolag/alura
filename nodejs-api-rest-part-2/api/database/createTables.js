const models = [
	require('../routes/providers/ModelTableProviders'),
	require('../routes/providers/products/ModelTableProducts'),
]

async function createTables() {
	models.forEach(model => {
		model.sync()
	})
}

createTables()