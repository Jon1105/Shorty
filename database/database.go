package database

import "errors"

var data = map[string]string{
	"12345": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	"67890": "golang.org",
}

func GetUrl(id string) (string, error) {
	var val, ok = data[id]
	if !ok {
		return "", errors.New("invalid key provided")
	}
	return val, nil
}

func SetUrl(id, url string) error {
	var _, ok = data[id]
	if ok {
		return errors.New("invalid key: already in use")
	}

	data[id] = url
	return nil
}
