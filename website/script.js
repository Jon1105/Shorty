const apiLink = 'http://localhost:5000/create/'
const urlHolder = document.getElementById('url-place')
const errorHolder = document.getElementById('error-place')
const urlBox = document.getElementById('link-input')

async function create_url() {
    let url = urlBox.value
    urlHolder.innerHTML = ''
    errorHolder.innerHTML = ''
    let response = await fetch(apiLink, {
        method: 'POST',
        body: JSON.stringify({ 'url': url }),
        headers: { 'content-type': 'application/json' }
    })
    let body = JSON.parse(await response.text())
    if (!body.error) {
        urlHolder.innerHTML = contents.url
    } else {
        errorHolder.innerHTML = 'Invalid url'
    }

}