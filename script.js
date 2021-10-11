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
    showAchieveNotes()
    showSummary()
})

function showNotes() {
    let notes = localStorage.getItem("notes")
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
                 <button id="${index}" onclick="achieveNote(this.id)" class="note-btn-archieve"><i class="fa fa-archive"></i></button>
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

function deleteNote(index) {
    let confirmDel = confirm("You are deleting this note")

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
        showAchieveNotes()
    }
}


function editNote(index) {
    let notes = localStorage.getItem("notes")
    if (addTitle.value !== "" || addTxt.value !== "") {
        return alert("Please clear the form")
    }
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
    showAchieveNotes()
}


function achieveNote(index) {
    let notes = localStorage.getItem("notes")
    let achieveNotes = localStorage.getItem("achieve-notes")
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    if (achieveNotes === null) {
        achieveNotesObj = [];
    } else {
        achieveNotesObj = JSON.parse(achieveNotes)
    }
    achieveNotesObj.push(notesObj[index])
    localStorage.setItem("achieve-notes", JSON.stringify(achieveNotesObj))
    notesObj.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes()
    showSummary()
    showAchieveNotes()
}
function unAchieveNote(index) {
    let notes = localStorage.getItem("notes")
    let achieveNotes = localStorage.getItem("achieve-notes")
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    if (achieveNotes === null) {
        achieveNotesObj = [];
    } else {
        achieveNotesObj = JSON.parse(achieveNotes)
    }
    notesObj.push(achieveNotesObj[index])
    localStorage.setItem("notes", JSON.stringify(notesObj))
    achieveNotesObj.splice(index, 1);

    localStorage.setItem("achieve-notes", JSON.stringify(achieveNotesObj))
    showNotes()
    showSummary()
    showAchieveNotes()
}
function showAchieveNotes() {
    let achieveNotes = localStorage.getItem("achieve-notes")
    if (achieveNotes === null) {
        achieveNotesObj = [];
    } else {
        achieveNotesObj = JSON.parse(achieveNotes)
    }
    console.log(achieveNotesObj)
    let html = ""
    achieveNotesObj.forEach(function (element, index) {
        html += `<div class="items">
                <h3 class="note-title"> ${element.title}</h3> 
                 <p class="note-text"> ${time}</p>
                 <p class="note-text">${element.category}</p>
                <p class="note-text"> ${element.text}</p>
                <p class="note-text">${element.date}</p>
                <div style="display: grid; grid-auto-flow: column;gap: 1rem">
                 <button id="${index}" onclick="unAchieveNote(this.id)" class="note-btn-archieve"><i class="fa fa-archive"></i></button>
                
                </div>
            </div>
            <hr>
        `
    })
    let noteElm = document.getElementById("achieve-notes")
    if (achieveNotesObj.length !== 0) {
        noteElm.innerHTML = html
    } else {
        noteElm.innerHTML = "at First, add the note, please"
    }
}
function showSummary() {
    let notes = localStorage.getItem("notes")
    if (notes === null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    let achieveNotes = localStorage.getItem("achieve-notes")
    if (achieveNotes === null) {
        achieveNotesObj = [];
    } else {
        achieveNotesObj = JSON.parse(achieveNotes)
    }
    console.log(notesObj)
    let task=0;
    let random =0;
    let achieve_task=0
    let achieve_random=0

    for (let key in notesObj)
    {
        console.log(notesObj[key].category)

        if(notesObj[key].category==="Task")
            task++;
        else
            random++;

    }
    for (let keys in achieveNotesObj)
    {
        console.log(achieveNotesObj[keys].category)

        if(achieveNotesObj[keys].category==="Task")
            achieve_task++;
        else
            achieve_random++;

    }
    console.log(task)
    console.log(random)
    console.log(achieve_task)
    console.log(achieve_random)
    let html = ""

    html += `<div class="items1">
            <p>Task</p>
            <p>${task}</p>
            <p>${achieve_task}</p>
            </div>
            <div class="items1">
            <p>Random thought</p>
            <p>${random}</p>
            <p>${achieve_random}</p>
            </div>
        `
    task=0
    random = 0
    let noteElm = document.getElementById("summary-notes")
    if (notesObj.length !== 0) {
        noteElm.innerHTML = html
    } else {
        noteElm.innerHTML = "at First, add the note, please"
    }
}

showNotes()
showSummary()
showAchieveNotes()
