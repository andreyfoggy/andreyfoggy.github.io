var picture = document.createElement("img")
fetch('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD49MwDX0pEH73vpfulFxooFFumaFhdfIk5sqCw-9dtvrzy1VTFA').then(response=>{
  response.blob().then(response=>{
    var url = URL.createObjectURL(response)
    picture.src = url
    document.body.appendChild(picture)
  })
})
