const apiLink = 'https://shorty2587.herokuapp.com/api/create/'

async function create_url() {
    const output = document.getElementById('output')
    const urlBox = document.getElementById('link-input')
    const keyBox = document.getElementById('key-input')
    const keyCheck = document.getElementById('customKeyToggle')
    output.innerHTML = ''
    output.classList.remove('error')

    if (!validator.isURL(urlBox.value)) {
        output.innerHTML = 'Invalid Link'
        output.classList.add('error')
        return
    }

    let reqBody = { 'url': urlBox.value }

    if (keyCheck.checked) {
        if (keyBox.value.includes(" ")) {
            output.innerHTML = 'Invalid Custom Key'
            output.classList.add('error')
            return
        } else {
            reqBody['key'] = keyBox.value
        }
    }

    let response = await fetch(apiLink, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: { 'content-type': 'application/json' }
    })
    let body = JSON.parse(await response.text())
    if (!body.error) {
        output.innerHTML = `<a id=\"output-link\" href=\"${body.url}\">${body.url}</a>`
    } else {
        output.innerHTML = body.error
        output.classList.add('error')
    }
}

function validateInput() {
    const input = document.getElementById('link-input')
    input.classList.toggle('valid', validator.isURL(input.value))
}

function toggleCutstomKey() {
    const checkBox = document.getElementById('customKeyToggle')
    const customKeyDiv = document.getElementById('custom-key')
    customKeyDiv.style.display = (checkBox.checked) ? 'block' : 'none'
}
