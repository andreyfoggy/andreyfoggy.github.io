var urls = []
var galleries = []
var currentDiv
fetch ( 'server.json' )
        .then ( response => {
                response.json().then ( response =>{
                  urls = response
                  galleries[0] = new Gallery("selfie_animals",urls[0])
                  galleries[1] = new Gallery("laugh_gifs",urls[1])
                  
                  galleries[0].deleteImage.call(document.querySelector(`#${galleries[0].name}`).firstChild)
                })
        })
var Gallery = function(name,urls){

  Gallery.prototype.addImage = function(url){
    var image = document.createElement("IMG")
    image.src = url
    image.ondblclick = this.deleteImage
    this.appendChild(image)
  }
  
  Gallery.prototype.applyChanges = function(event){
    var newPic = document.querySelector("#pic").value
    this.addImage.call(currentDiv,newPic)
    document.body.querySelector("form").style.display = "none"
  }
  
  Gallery.prototype.deleteImage = function(){
      this.parentNode.removeChild(this)
  }
  
  this.name = name
  var hide = document.body.appendChild(document.createElement("BUTTON"))
  var adder = document.body.appendChild(document.createElement("BUTTON"))
  var div = document.body.appendChild(document.createElement("DIV"))
  div.id = name
  
  hide.style.display = "inline-block"
  hide.innerText = `hide ${name}`
  hide.onclick = function(event){
    if(div.style.display != "none") {
      div.style.display = "none"
      adder.style.display = "none"
      hide.style.display = "block"
       hide.innerText = `show ${name}`
    }
    else{
        hide.style.display = "inline-block"
        div.style.display = "block"
        adder.style.display = "inline-block"
        hide.innerText = `hide ${name}`
    }
  }
  
  adder.innerText = `add pic to ${name}`
  adder.onclick = function(){
    document.body.querySelector("form").style.display = "block"
    currentDiv = document.querySelector(`#${div.id}`)
  }
  
  urls.forEach(x=>{
    var image = document.createElement("IMG")
    image.src = x
    image.ondblclick = this.deleteImage
    div.appendChild(image)
  })
}



