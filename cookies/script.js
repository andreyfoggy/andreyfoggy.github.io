var userName = document.querySelector("#name")
var city = document.querySelector("#city")
var age = document.querySelector("#age")
var form = document.querySelector("FORM")
var button_save = document.querySelector("#button_save")
var button_sign = document.querySelector("#button_sign")
var fields = [userName,city,age]

button_save.onclick = function(event){
  fields.forEach(x=>{
    if(!x.value)
      x.value = "..."
    document.cookie = (`${x.id}=${x.value}`)
  })
  form.style.display = "none"
  button_sign.style.display = "block"
}
button_sign.onclick = function(event){
  form.style.display = "block"
  event.target.style.display = "none"
  var cookies = document.cookie.split(";",3).map(x=>x.split("=")[1])
  var count = 0
  fields.forEach(x=>{
    if(cookies[count])
       x.value = cookies[count++]
    else
        x.value = "..."
  })
}

