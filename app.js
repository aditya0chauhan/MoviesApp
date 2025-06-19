//selectors
const container = document.querySelector('#container');
const add = document.querySelector('.add');
const body = document.querySelector("body");
const h1 = document.querySelector("h1");
const footer = document.querySelector("footer")

const createNote = (content = "") => {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="tool">
            <div class="heade">
                <img class="save" src="save.png" alt="">
                <img class="delete" src="delete_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" alt="">
            </div>
            <textarea>${content}</textarea>
        </div>`;

    const deleteButton = note.querySelector('.delete');  
    const saveButton = note.querySelector('.save');     
    const textarea = note.querySelector('textarea');

    // Delete note 

    deleteButton.addEventListener("click", () => {
        note.remove();
        updateLocalStorage();
    });

    // Save note

    saveButton.addEventListener("click", () => {
        if(textarea.value.trim() !== "") {
            updateLocalStorage();
            alert("Your Note is Saved");
        } else {
            alert("Cannot save empty note!");
        }
    });

    
    textarea.addEventListener('input', () => {
        if(textarea.value.trim() !== "") {
            updateLocalStorage();
        }
    });

    container.appendChild(note);
};

// Save notes to localStorage

const updateLocalStorage = () => {
    const notes = document.querySelectorAll('textarea');
    const data = [];
    notes.forEach(note => {
        if(note.value.trim() !== "") {
            data.push(note.value);
        }
    });
    if(data.length > 0) {  
        localStorage.setItem('notes', JSON.stringify(data));
    }
};

// Load saved notes

const loadNotes = () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    if(savedNotes.length === 0) {  
        createNote();
    } else {
        savedNotes.forEach(noteContent => {
            if(noteContent.trim() !== "") {
                createNote(noteContent);
            }
        });
    }
};

// Add new note when clicking add button

add.addEventListener('click', () => 
    createNote());

// Load saved notes when page loads

loadNotes();
