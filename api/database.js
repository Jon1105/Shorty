const { readFile, writeFile } = require("fs").promises

const chars = 'abcdefghijklmnopqrstuvwxyz1234567890'

class Database {
    constructor(path) {
        this.path = path
    }

    async __read() {
        return JSON.parse(await readFile(this.path))
    }

    async get_url(key) {
        const contents = await this.__read()
        return contents[key]
    }

    async __write_url(url, key) {
        const contents = await this.__read()
        if (!(url.startsWith('https://') || url.startsWith('http://'))) {
            url = 'http://' + url
        }
        contents[key] = url
        await writeFile(this.path, JSON.stringify(contents))
        return key
    }

    __randInt(low, high) {
        return Math.floor((Math.random() * (high - low)) + low)
    }

    async __new_key() {
        let key = ''
        for (let i = 0; i < 6; i++) {
            key += chars.charAt(this.__randInt(0, chars.length))
        }
        if (await this.get_url(key) != undefined) { return await this.__new_key() }
        return key
    }

    async create(url, key) {
        if (url == undefined) return [null, new Error('No url provided'), 400]
        else if (key == undefined) {
            return [await this.__write_url(url, await this.__new_key()), null, 200]
        } else {
            if (await this.get_url(key) != undefined) {
                return [null, new Error('Key unavailable'), 409]
            }
            return [await this.__write_url(url, key), null, 200]
        }
    }
}

module.exports = Database
