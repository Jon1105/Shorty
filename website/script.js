// const apiLink = 'https://shorty2587.herokuapp.com/create/'
const apiLink = 'http://localhost:3000/create/'

async function create_url() {
    console.log('Function called')
    const output = document.getElementById('output')
    const urlBox = document.getElementById('link-input')
    output.innerHTML = ''
    output.classList.remove('error')
    if (!validator.isURL(urlBox.value)) {
        output.innerHTML = 'Invalid Link'
        output.classList.add('error')
        return
    }
    let response = await fetch(apiLink, {
        method: 'POST',
        body: JSON.stringify({ 'url': urlBox.value }),
        headers: { 'content-type': 'application/json' }
    })
    console.log(response.headers)
    console.log('Finished request')
    let body = JSON.parse(await response.text())
    if (!body.error) {
        output.innerHTML = `<a id=\"output-link\" href=\"${body.url}\">${body.url}</a>`
    } else {
        output.innerHTML = body.error
        output.classList.add('error')
    }
    console.log('Finish function')
}

function validateInput() {
    const input = document.getElementById('link-input')
    input.classList.toggle('valid', validator.isURL(input.value))
}