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
    response.sendFile(path.join(__dirname, 'website', 'index.html'))
})

app.get('/:key', async (request, response) => {
    const key = request.params.key
    let url = await db.get_url(key)
    if (key.length != 6 || url == undefined) {
        response.sendFile(path.join(__dirname, 'website', '404.html'))
    }
    else {
        response.status(200).redirect(url)
    }
})

app.post('/create/', cors(), async (request, response) => {
    let link = request.body.url
    if (!link) {
        response.status(400).json({ errorCode: 400, error: 'No url provided' })
    }
    else if (validator.isURL(link)) {
        response.status(200).json({ 'url': website + await db.write_url(link) })
    } else {
        response.status(400).json({ errorCode: 400, error: 'Invalid url' })
    }
})

app.listen(port)