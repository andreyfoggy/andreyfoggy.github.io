var http = new XMLHttpRequest()

http.onreadystatechange = function(){
  if ( this.readyState === 4 && this.status === 200 )
  {
      var response = JSON.parse(http.responseText)
      response.forEach(x => {
      var image = document.body.appendChild(document.createElement("img"))
      image.src = x.url
      image.title = x.title
      image.width = 200
  })
  }
}

http.open("GET","viva.json")
http.send()
