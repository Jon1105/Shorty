const express = require('express')
const cors = require('cors')
const database = require('./database')

const app = express()
const db = new database('./data.json')

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000
const website = 'https://shorty2587.herokuapp.com/'

app.get('/:key', async (request, response) => {
    const key = request.params.key
    let url = await db.get_url(key)
    if (url != undefined) {
        response.redirect(url)
    } else {
        response.status(400).send('Invalid short link')
    }
})

app.post('/reg/', async (request, response) => {
    let link = request.body.url
    if (db.isValidURL(link)) {
        const key = await db.write_url(link)
        response.status(200).send(JSON.stringify({ 'url': website + key }))
    } else { response.status(400).send('Invalid url') }
})


app.listen(port)