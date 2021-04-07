package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	validator "net/url"

	"github.com/Jon1105/shorty/database"
	"github.com/gin-gonic/gin"
)

func main() {
	var router = gin.Default()

	router.LoadHTMLFiles("index.html")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	router.GET("/:id", func(c *gin.Context) {
		var id = c.Param("id")
		var url, err = database.GetUrl(id)
		if err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
			return
		}
		c.Redirect(http.StatusOK, url)
	})

	router.POST("/api", func(c *gin.Context) {
		var d, err = ioutil.ReadAll(c.Request.Body)
		if err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
		}
		var v = make(map[string]string)
		if err := json.Unmarshal(d, &v); err != nil {
			c.AbortWithError(http.StatusBadRequest, err)
		}

		var url, urlOk = v["url"]
		if !urlOk {
			c.AbortWithError(http.StatusBadRequest, errors.New("bad request: url not provided"))
		}
		var id, idOk = v["id"]
		if !idOk {
			c.AbortWithError(http.StatusBadRequest, errors.New("bad request: url not provided"))
		}

		// validate url
		var urlRef, err2 = validator.Parse(url)
		if err2 != nil {
			c.AbortWithError(http.StatusBadRequest, errors.New("bad request: invalid url provided"))
		}

		var err3 = database.SetUrl(id, urlRef.String())
		if err3 != nil {
			c.AbortWithError(http.StatusInternalServerError, err2)
		}

		c.JSON(http.StatusCreated, gin.H{
			"url": "localhost:8080/" + "id",
		})
	})

	router.Run(":8080")
}
