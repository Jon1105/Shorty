const urlHolder = document.getElementById('url-place')
const errorHolder = document.getElementById('error-place')
const linkInput = document.getElementById('link-input')
const apiLink = 'https://shorty2587.herokuapp.com/create/'

function create_url() {
    let url = linkInput.value
    fetch(apiLink, {
        method: "POST",
        body: JSON.stringify({ 'url': url })
    }).then((response) => {
        let short = JSON.parse(response.body)['url']
        if (short) {
            urlHolder.innerHTML = short
            errorHolder.innerHTML = ''
        } else {
            urlHolder.innerHTML = ''
            errorHolder.innerHTML = 'Invalid url'
        }
    })
}