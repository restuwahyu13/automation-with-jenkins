const http = require('http')

const server = http.createServer((req, res) => {
	res.setHeader('Content-Type', 'application/json')
	res.write(JSON.stringify({ id: Math.random(), message: 'Hello Wordl, Automation With Jenkins' }))
	res.end()
})

server.on('error', (err) => {
	console.error(`
	================================================
		HTTP SERVER ERROR
	================================================
		name: ${err.name}
		message: ${err.message}
		stack: ${JSON.stringify(err.stack)}
	================================================
	`)
})

server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
	console.info(`Server listening on host ${server.address().address} and port ${server.address().port}`)
})
