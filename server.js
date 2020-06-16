const http = require('http')
const fs = require('fs')
const path = require('path')
const websocket = require('ws')

const server = http.createServer((req, res) => {
	// the express res.sendFile methods substitute
	res.writeHead(200, {"Content-Type": "text/html"});
  fs.createReadStream(path.resolve(__dirname, 'index.html')) 
    .pipe(res);
})

const wss = new websocket.Server({server})
// websocket connection headers
wss.on('headers', (data) => {
	console.log('ws headers', data)
})

// connection established 
// listen to messages from the body of callback function
wss.on('connection', (ws, req) => {
	// get the sent data
	// default message type is string
	// so stringifying the object 4 flexibility
	ws.on('message', (data) => {
		wss.clients.forEach((client) => {
			client.send(data)
		})
		// switch case on data.type etc. to have better
		// control on the flow
	})
})

server.listen(4000, () => {
	console.log('server is up and running')
})