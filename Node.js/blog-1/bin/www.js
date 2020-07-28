const http = require('http')

const serverHandle = require('../app')

const PORT = process.env.PORT

const app = http.createServer(serverHandle)

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}/`))
