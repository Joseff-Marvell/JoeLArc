const express = require('express')
const app = express()
app.use(express.static('static'))
path = __dirname + '/views/'
var route = require('./controller')
app.get('/', route.main)
app.get('/list/:id/', route.listObjects)
app.get('/obj/:id/', route.arcObject)
app.use("*", route.page404)
var port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Listening on " + port)
})
