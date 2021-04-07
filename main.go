package main

import (
	"net/http"

	"github.com/Jon1105/Shorty/database"
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
			c.AbortWithStatusJSON(http.StatusBadRequest, jsonErr(err))
			return
		}
		c.Redirect(http.StatusOK, url)
	})

	router.POST("/api", func(c *gin.Context) {

	})

	router.Run(":8080")
}

func jsonErr(e error) map[string]string {
	return map[string]string{"error": e.Error()}
}
