console.log("------------sumka--------------")
function Sumka(){
  this.content = ["wallet"]
  this.add = function(elem)
  {
    this.content.push(elem)
  }
  this.delete = function(elem)
  {
    var index = this.content.indexOf(elem);
    if (index > -1) {
      this.content.splice(index, 1);
      console.log(`${elem} has been deleted`)
    }
    else{
      console.log("no such thing")
    }
  }
}
var gucci = new Sumka()
gucci.add("pomada")
console.log(gucci.content[0])
console.log(gucci.content[1])
gucci.delete("ak-47")
gucci.delete("wallet")


