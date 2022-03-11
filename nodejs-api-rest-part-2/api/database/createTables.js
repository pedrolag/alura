const ModelTableProviders = require('../routes/providers/ModelTableProviders')

ModelTableProviders
	.sync()
	.then(() => console.log('Table "providers" has been created'))