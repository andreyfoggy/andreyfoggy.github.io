var par = document.createElement('p')
document.body.appendChild(par)
par.innerHTML = "paragraph"
var picture = document.body.appendChild(document.createElement('img'))

par.onclick = function(event) {
	this.style.display = "none"
  picture.style.display = "inline-block"
  picture.style.margin = "50px"
  picture.style.transition = "width 1s"
  picture.style.width = "100px"
  picture.src = "http://easyscienceforkids.com/wp-content/uploads/2013/04/Giraffe-Couple.jpg"
}
picture.onmouseover = function(event){
	picture.style.width = "200px"
}
picture.onclick = function(event){
	this.style.display = "none"
  par.style.display = "block"
}