const express = require('express')
const cors = require('cors')
const database = require('./api/database')
const path = require('path')

const app = express()
const db = new database('./api/data.json')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'website')))
app.use(cors())

const port = process.env.PORT || 3000
const website = 'https://shorty2587.herokuapp.com/'

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'website', 'index.html'))
})

app.get('/:key', async (request, response) => {
    const key = request.params.key
    let url = await db.get_url(key)
    if (url != undefined) {
        response.redirect(200, url)
    } else {
        response.status(400).json({ errorCode: 400, errorMessage: 'Invalid short link' })
    }
})

app.post('/create/', async (request, response) => {
    let link = request.body.url
    if (!link) { response.status(400).json({ errorCode: 400, errorMessage: 'No url' }) }
    else if (db.isValidURL(link)) {
        const key = await db.write_url(link)
        response.status(200).json({ 'url': website + key })
    } else { response.status(400).json({ errorCode: 400, errorMessage: 'Invalid url' }) }
})


app.listen(port)