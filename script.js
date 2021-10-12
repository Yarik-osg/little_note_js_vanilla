let addBtn = document.getElementById("add-btn")
let addTitle = document.getElementById("note-title")
let addTxt = document.getElementById("note-text")
let addCat = document.getElementById("note-category")
let addDate = document.getElementById("note-date")
let time = new Date().toDateString()
addBtn.addEventListener("click", (e) => {
    if (addTitle.value === "" || addTxt.value === "" || addCat.value === "") {
        return alert("Please complete Note")
    }
    let notesObj
    let notes = localStorage.getItem("notes")
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    if (addTxt.value.length > 10) {
        addTxt.value = addTxt.value.slice(0, 7) + "..."
    }
    if (addTitle.value.length > 10) {
        addTitle.value = addTitle.value.slice(0, 7) + "..."
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,

        time: time,
        category: addCat.value,
        date: addDate.value
    }
    notesObj.push(myObj)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTitle.value = ""
    addTxt.value = ""
    addCat.value = ""
    addDate.value=""
    showNotes()
    showArchiveNotes()
    showSummary()
})
function showNotes() {
    let notes = localStorage.getItem("notes")
    let notesObj
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = ""
    notesObj.forEach(function (element, index) {
        html += `<div class="items">
                 
              
                <h3 class="note-title"> ${element.title}</h3> 
                 <p class="note-text"> ${time}</p>
                 <p class="note-text">${element.category}</p>
                <p class="note-text"> ${element.text}</p>
                <p class="note-text">${element.date}</p>
                <div style="display: grid; grid-auto-flow: column;gap: 1rem">
                 <button id="${index}" onclick="archiveNote(this.id)" class="note-btn-archieve"><i class="fa fa-archive"></i></button>
                     <button id="${index}" onclick="editNote(this.id)" class="note-btn-edit"><i class="fa fa-edit"></i></button>
                    <button id="${index}" onclick="deleteNote(this.id)" class="note-btn-delete"><i class="fa fa-trash"></i></button>
                </div>
            </div>
            <hr>
        `
    })
    let noteElm = document.getElementById("notes")
    if (notesObj.length !== 0) {
        noteElm.innerHTML = html
    } else {
        noteElm.innerHTML = "at First, add the note, please"
    }
}
function showSummary() {
    let notes = localStorage.getItem("notes")
    let notesObj
    let archiveNotesObj
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let archiveNotes = localStorage.getItem("archive-notes")
    if (archiveNotes === null) {
        archiveNotesObj = [];
    } else {
        archiveNotesObj = JSON.parse(archiveNotes)
    }
    console.log(notesObj)
    let task=0;
    let random =0;
    let archive_task=0
    let archive_random=0

    for (let key in notesObj)
    {
        console.log(notesObj[key].category)

        if(notesObj[key].category==="Task")
            task++;
        else
            random++;

    }
    for (let keys in archiveNotesObj)
    {


        if(archiveNotesObj[keys].category==="Task")
            archive_task++;
        else
            archive_random++;

    }
    let html = ""

    html += `<div class="items1">
            <p>Task</p>
            <p>${task}</p>
            <p>${archive_task}</p>
            </div>
            <div class="items1">
            <p>Random thought</p>
            <p>${random}</p>
            <p>${archive_random}</p>
            </div>
        `
    task=0
    random = 0
    let noteElm = document.getElementById("summary-notes")
    noteElm.innerHTML = html

}

function deleteNote(index) {
    let confirmDel = confirm("You are deleting this note")
    let notesObj
    if (confirmDel === true) {
        let notes = localStorage.getItem("notes")
        if (notes === null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes)
        }
        notesObj.splice(index, 1)
        localStorage.setItem("notes", JSON.stringify(notesObj))
        showNotes()
        showSummary()
        showArchiveNotes()
    }
}


function editNote(index) {
    let notes = localStorage.getItem("notes")
    if (addTitle.value !== "" || addTxt.value !== "") {
        return alert("Please clear the form")
    }
    let notesObj
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.findIndex((element, index) => {
        addTitle.value = element.title
        addTxt.value = element.text
        time.value=element.time
        addCat.value = element.category
        addDate.value=element.date

    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes()
    showSummary()
    showArchiveNotes()
}


function archiveNote(index) {
    let notes = localStorage.getItem("notes")
    let archiveNotes = localStorage.getItem("archive-notes")
    let notesObj
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let archiveNotesObj
    if (archiveNotes === null) {
        archiveNotesObj = [];
    } else {
        archiveNotesObj = JSON.parse(archiveNotes)
    }
    archiveNotesObj.push(notesObj[index])
    localStorage.setItem("archive-notes", JSON.stringify(archiveNotesObj))
    notesObj.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes()
    showSummary()
    showArchiveNotes()
}
function unArchiveNote(index) {
    let notes = localStorage.getItem("notes")
    let archiveNotes = localStorage.getItem("archive-notes")
    let notesObj
    let archiveNotesObj
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    if (archiveNotes === null) {
        archiveNotesObj = [];
    } else {
        archiveNotesObj = JSON.parse(archiveNotes)
    }
    notesObj.push(archiveNotesObj[index])
    localStorage.setItem("notes", JSON.stringify(notesObj))
    archiveNotesObj.splice(index, 1);

    localStorage.setItem("archive-notes", JSON.stringify(archiveNotesObj))
    showNotes()
    showSummary()
    showArchiveNotes()
}
function showArchiveNotes() {
    let archiveNotes = localStorage.getItem("archive-notes")
    let archiveNotesObj
    if (archiveNotes === null) {
        archiveNotesObj = [];
    } else {
        archiveNotesObj = JSON.parse(archiveNotes)
    }
    console.log(archiveNotesObj)
    let html = ""
    archiveNotesObj.forEach(function (element, index) {
        html += `<div class="items">
                <h3 class="note-title"> ${element.title}</h3> 
                 <p class="note-text"> ${time}</p>
                 <p class="note-text">${element.category}</p>
                <p class="note-text"> ${element.text}</p>
                <p class="note-text">${element.date}</p>
                <div style="display: grid; grid-auto-flow: column;gap: 1rem">
                 <button id="${index}" onclick="unArchiveNote(this.id)" class="note-btn-archieve"><i class="fa fa-archive"></i></button>
                
                </div>
            </div>
            <hr>
        `
    })
    let noteElm = document.getElementById("archive-notes")
    if (archiveNotesObj.length !== 0) {
        noteElm.innerHTML = html
    } else {
        noteElm.innerHTML = "at First, add the note, please"
    }
}

showNotes()
showSummary()
showArchiveNotes()
