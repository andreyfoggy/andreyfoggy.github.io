var reg_form = document.querySelector("#reg_form")
var sign_form = document.querySelector("#sign_form")
var mainPage = document.querySelector("#main")
var newName = document.querySelector("#edit_name")
var newPhoto = document.querySelector("#edit_photo")
var editor = document.querySelector("#edit")
var users =[]
var count = 0
var currentUser = -1
function insertUser(){
	var name = document.querySelector("#name")
	var mail = document.querySelector("#mail")
  	var pasw = document.querySelector("#pasw")
  	var user = {}

  	if ( !mail.value || !pasw.value ) return

  	if( users.find(x=>{return (mail.value==x.mail)}) != undefined ) return
 	 user.name = name.value
     user.mail = mail.value
     user.key = Sha256.hash ( mail.value + pasw.value )
     user.src = "https://i.pinimg.com/736x/82/fa/8a/82fa8a8d0abac9e28614df1f5c45efeb.jpg"
     users.push(user)
     reg_form.style.display = "none"
     profile(count++)
}
function signIn(){
	var mail = document.querySelector("#sign_mail")
  	var pasw = document.querySelector("#sign_pasw")
  	var key = Sha256.hash ( mail.value + pasw.value )

	if ( !mail.value || !pasw.value ) return
	var user = users.findIndex(x=>{return (key==x.key)})
	if( user == -1 ) 
		return
	sign_form.style.display = "none"
	profile(user)
}
function showSignForm(){
	reg_form.style.display = "none"
	sign_form.style.display = "block"
}
function showRegForm(){
	sign_form.style.display = "none"
  	reg_form.style.display = "block"
}
function logOff(){
	mainPage.style.display = "none"
	sign_form.style.display = "block"
}
function profile(index){
	currentUser = index
	mainPage.style.display = "block"

	var mail = document.querySelector("#user_mail")                
	mail.innerText = `e-mail: ${users[index].mail}`       
	mainPage.appendChild(mail)

	var name = document.querySelector("#user_name")                
	name.innerText = `name: ${users[index].name}`       
	mainPage.appendChild(name)

	document.querySelector("IMG").src = users[index].src

}
function changeData(){
	editor.style.display = "block"
	newName.value = users[currentUser].name
	newPhoto.value = users[currentUser].src
}
function applyChanges(){
	editor.style.display = "none"
	users[currentUser].name = newName.value
	users[currentUser].src = newPhoto.value
	profile(currentUser)
}