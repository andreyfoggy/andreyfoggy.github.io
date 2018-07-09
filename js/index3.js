console.log("------------Book--------------")
function LibraryBook(title,year,author){
  var title = title
  var year = year
  var author = author
  var readerName = ""
  var readerDate = ""
  
  var giveTheBook = function(client)
  {
    readerName = client
    readerDate = new Date()
  }
  
  this.getBookInfo = function()
  {
    if(readerName!=="")
      console.log(`book was taken at ${readerDate} by  ${readerName}`)
    else
      console.log("book is available")
  }
  
  this.getTheBook = function(client)
  {
    if(readerName!=="")
      return null
    else
      giveTheBook(client)
      return title
  }
  
  this.returnBook = function()
  {
    readerName = ""
    readerDate = ""
  }
}
var shantaram = new LibraryBook("Shantaram","2010","Gregory Roberts")

console.log(shantaram.getTheBook("Вова Следюк"))
shantaram.getBookInfo()
shantaram.returnBook()
shantaram.getBookInfo()