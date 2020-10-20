const apiLink = 'https://shorty2587.herokuapp.com/create/'

async function create_url() {
    console.log('function called')
    let url = document.getElementById('link-input').value
    let response = await fetch(apiLink, {
        method: 'POST',
        body: JSON.stringify({ 'url': url }),
        headers: { 'content-type': 'application/json' }
    })
    console.log(response)
    let short = JSON.parse(response.text())
    console.log(short)
    const urlHolder = document.getElementById('url-place')
    const errorHolder = document.getElementById('error-place')
    if (short) {
        urlHolder.innerHTML = short
        errorHolder.innerHTML = ''
    } else {
        urlHolder.innerHTML = ''
        errorHolder.innerHTML = 'Invalid url'
    }
    console.log('function ended')

}