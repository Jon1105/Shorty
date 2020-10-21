const apiLink = 'https://shorty2587.herokuapp.com/create/'

async function create_url() {
    const output = document.getElementById('output')
    const urlBox = document.getElementById('link-input')
    output.innerHTML = ''
    output.classList.remove('error')
    let response = await fetch(apiLink, {
        method: 'POST',
        body: JSON.stringify({ 'url': urlBox.value }),
        headers: { 'content-type': 'application/json' }
    })
    let body = JSON.parse(await response.text())
    if (!body.error) {
        output.innerHTML = get_link(body.url)
    } else {
        output.innerHTML = body.error
        output.classList.add('error')
    }
}

function get_link(url) {
    return `<a id=\"output-link\" href=\"${url}\">${url}</a>`
}