var tagNames = [ "div", "div", "div", "div", "button" ]
var divStyle = `
             display: inline-block;
             width: 100px;
             height: 100px;
             border-radius: 50%;
             border: solid 1px green;
             font-size: 25px;
        `
elements = tagNames.map ( x => document.body.appendChild ( document.createElement ( x ) ) )

elements.filter ( element => element.tagName === "DIV" )
        .forEach ( ( element, num ) => {
                        element.style = divStyle
                        element.innerText = num
                   })
elements.filter ( element => element.tagName === "BUTTON" )
        .forEach ( element => {
                        element.innerHTML = "closureRecursRemove"
                        element.onclick = function ( event ) {
                                recursRemove ()
                        }
                        element.style.margin = "0px 10px 0px 0px"
                   })


var recursButton = document.body.appendChild(document.createElement("button"))
recursButton.innerHTML = "recurseRemove"
recursButton.onclick = function ( event ){
  recursRemove2 ()
}

var recursRemove = (function(){
  var currentDiv = x => document.querySelector("DIV")
  return function removeDiv(){
    currentDiv().parentNode.removeChild(currentDiv())
    currentDiv()?removeDiv():null
  }()
})

var recursRemove2 = function(){
  var div = document.querySelector("DIV")
  div.parentNode.removeChild(div)
  div?recursRemove():null
}