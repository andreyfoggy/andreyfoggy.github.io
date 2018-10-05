class EventHandlers {

    static destroyClickedElement(event){
        document.body.removeChild(event.target);
    }

    static saveTextAsFile(){
            let textToWrite = area.value;
            let textFileAsBlob = new Blob([textToWrite], {type:'text/plain'})
            let fileNameToSaveAs = "downloaded.txt"

            let downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null)
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob)
            else
            {
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob)
                downloadLink.onclick = EventHandlers.destroyClickedElement
                downloadLink.style.display = "none"
                document.body.appendChild(downloadLink)
            }
            downloadLink.click();
    }

    static getTableData() {
        let data = []
        let table = document.querySelector("table")
        let rows = table.querySelectorAll("tr")
        rows.forEach(( row, i)=>{
            row = row.querySelectorAll("td")
            data[i] = {}
            data[i].name = row[0].innerText
            data[i].value = row[1].innerText
        })
        area.value = ""
        if(this.innerText == "get CSV")
                area.value = EventHandlers.convertToCSV(JSON.stringify(data))
        else
                area.value = JSON.stringify(data)
    }

    static convertToCSV(objArray) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let cvs = '';

    for (let record of array) {
        let line = '';
        for (let field in record) {
            if (line != '') line += ','
            line += record[field];
        }
        cvs += line + '\n';
    }
    return cvs;
    }
}



let text = '[{"name":"Kate","value":"student"},{"name":"Alex","value":"kid"},{"name":"Lisa","value":"teacher"},{"name":"John","value":"driver"},{"name":"Finn","value":"doctor"},{"name":"Michael","value":"manager"}]'
let wrapper  = document.body.appendChild(document.createElement('div'))
wrapper.className = "wrapper"
let table = wrapper.appendChild(document.createElement("table"))
let area = wrapper.appendChild(document.createElement("textarea"))
area.value = text

let buttonGet = buttonCreate(wrapper,"get JSON",EventHandlers.getTableData)
let buttonGetCSV = buttonCreate(wrapper,"get CSV",EventHandlers.getTableData)
let buttonSet = buttonCreate(wrapper,"fill table",tableCreate)
let buttonDownload = buttonCreate(wrapper,"download text",EventHandlers.saveTextAsFile)

let fileReader = new FileReader ()
let selector = document.body.appendChild ( document.createElement ( 'input' ) )
selector.type = 'file'
selector.onchange = function handleFiles( event ) {
    let selected = event.target.files[0]
    fileReader.readAsText ( selected )
    fileReader.onload = function ( event ) {
    area.value = event.target.result
    }
}
let label =  document.body.appendChild ( document.createElement ( 'label' ) )
label.innerHTML = 'upload file <i class="fa fa-upload"></i>'
label.for = "file"

tableCreate()

function tableCreate(){

    table.innerHTML = ""
    let data = area.value
    if(data[0] === "[" || data[0] === "{") 
        data = JSON.parse(data)
    else{
        data = cvsToArray(data)
    }

    data.forEach((record, index) =>
    {
        let row = table.insertRow()

        for(let field in record){
            let td = row.insertCell();
            td.innerHTML = record[field]
            td.contentEditable = "true"
            }

        let deleteButtonCell = row.insertCell()
        let deleteButton = createCellElement("button","delete",deleteRow.bind(this,row))
        deleteButtonCell.appendChild(deleteButton)
        deleteButtonCell.width = "50px"

        let swapSell = row.insertCell()
        if(index != 0){
            let switchUp = createCellElement("a","<img src = 'img/upCheck.png'>",swapRows.bind(this, row, -1))
            switchUp.className = "up"
            swapSell.appendChild(switchUp)
        }
        if(index != (data.length - 1) ){
            let switchDown = createCellElement("a","<img src = 'img/downCheck.png'>",swapRows.bind(this, row, 1))
            switchDown.className = "down"
            swapSell.appendChild(switchDown)
        }

        swapSell.className = "switch"
    })
}

function createCellElement(type,text,action){
    let element = document.createElement(type)
    element.innerHTML = text
    element.onclick = action
    return element
}

function deleteRow(record){
    if(record.rowIndex == 0){
        let switchUp = table.rows[1].querySelector(".up")
        switchUp.parentNode.removeChild(switchUp)
    }
    if(record.rowIndex == (table.rows.length - 1)){
        let switchDown = table.rows[record.rowIndex -1].querySelector(".down")
        switchDown.parentNode.removeChild(switchDown)
    }
    record.parentNode.removeChild(record)
}

function swapRows(row, adder){
    let row1 = row.rowIndex
    let row2 = row1 + adder
    let name1 = table.rows[row1].cells[0];
    let name2 = table.rows[row2].cells[0];
    let value1 = table.rows[row1].cells[1];
    let value2 = table.rows[row2].cells[1];
    [name1.innerText,name2.innerText] = [name2.innerText,name1.innerText];
    [value1.innerText, value2.innerText] = [value2.innerText, value1.innerText];
}

function cvsToArray(cvs){
    let stringArray = cvs.split('\n')
    let objArray = stringArray.map((record) =>
        {return {name:record.split(',')[0],value:record.split(',')[1]} }
    )
    if(objArray[objArray.length -1].value === undefined)
        objArray.pop()
    return objArray 
}

function buttonCreate(parent,text, action) {
    let btn = parent.appendChild(document.createElement("button"))
    btn.innerText = text
    btn.onclick = action
    return btn
}
