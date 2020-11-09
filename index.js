const express = require('express')
const cors = require('cors')
const database = require('./api/database')
const path = require('path')
const validator = require('validator')

const app = express()
const db = new database('./api/data.json')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'website')))

const port = process.env.PORT || 3000
const website = 'https://shorty2587.herokuapp.com/'

app.get('/', (request, response) => {
    response.status(200).sendFile(path.join(__dirname, 'website', 'index.html'))
})

app.get('/:key', async (request, response) => {
    const key = request.params.key
    let url = await db.get_url(key)
    if (url == undefined) {
        response.status(404).sendFile(path.join(__dirname, 'website', '404.html'))
    }
    else {
        response.status(200).redirect(url)
    }
})

app.post('/api/create/', cors(), async (request, response) => {
    const [key, error, statusCode] = db.create(request.body.url, request.body.key);
    let responseJson
    if (error == null) responseJson = {'url': website + key}
    else responseJson = {'error': error}
    response.status(statusCode).json(responseJson)
})

app.listen(port)