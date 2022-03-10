const EntityProvider = require('../Provider/Provider.entity')

EntityProvider
	.sync()
	.then(() => console.log("Table \"Providers\" has been created"))
	.catch(console.log)