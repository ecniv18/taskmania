const containerDOM = document.querySelector('#task-container');
const addTaskButton = document.querySelector('#add-task-button');
const taskTextInput = document.querySelector('#task-text-input');


// INITIALIZATION
const storageName = 'default';
renderTaskToDOM();


// CONSTRUCTORS
class Task {
    constructor(text){
        this.text = text;
        this.isCompleted = false;
        this.id = generateID();
    }

    completeToggle() {
        this.isCompleted != this.isCompleted
    }

    edit(text) {
        this.text = text;
    }
}

// INTERACTIVITIES

/** add/create task **/
addTaskButton.addEventListener('click', () => {
    const text = taskTextInput.value;
    createTask(text);
    renderTaskToDOM();
})



// UTILITIES

function createTask(text) {
    addToLocalStorage(storageName, new Task(text));
    console.log(JSON.parse(localStorage.getItem(storageName)));
}

function generateID() {
    const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0'];
    let generated = '';
    for(let i = 0; i < 8; i++) {
        const randNum = Math.random() * 36 - 1;
        generated += chars[Math.trunc(randNum)];
        
    }
    return generated;
}

function taskHtmlTemplate(task) {
    const el = document.createElement('li');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button')
    const p = document.createElement('p');
    const div = document.createElement('div');

    el.classList.add('task');
    p.classList.add('task-text');
    div.classList.add('task-buttons');
    editBtn.classList.add('edit-button');
    deleteBtn.classList.add('delete-button');

    p.innerHTML = task.text;
    editBtn.innerText = 'Edit';
    deleteBtn.innerText = 'Delete'

    editBtn.id = task.id;
    deleteBtn.id = task.id;

    el.appendChild(p);
    el.appendChild(div);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    editBtn.addEventListener('click', () => {
        console.log(`${task.id}: edit button`);
    })

    deleteBtn.addEventListener('click', () => {
        console.log(`${task.id}: delete button`);
        deleteTask(task.id, storageName);
    })

    return el;
}

function renderTaskToDOM() {
    const LS = JSON.parse(localStorage.getItem(storageName))
    containerDOM.innerHTML = '';
    if(localStorage.length == 0) {
        containerDOM.innerHTML = `<h1>Empty</h1>`;
    } else if (LS.length == 0) {
        containerDOM.innerHTML = `<h1>Empty</h1>`;
    } else {
        LS.forEach(task => {
            containerDOM.appendChild(taskHtmlTemplate(task))
        }) 
    }

}

function addToLocalStorage(storage, task) {
    if(JSON.parse(localStorage.getItem(storageName)) == null) {
        localStorage.setItem(storage, JSON.stringify([task]));
    } else {
        localStorage.setItem(storage, JSON.stringify([...JSON.parse(localStorage.getItem(storageName)), task]));
    }
}

function editTask() {
    // tba
}

function deleteTask(taskId, storage){
    taskList = JSON.parse(localStorage.getItem(storageName));
    taskList = taskList.filter(t => {
        return t.id !== taskId;
    })
    
    localStorage.setItem(storage, JSON.stringify(taskList));
    renderTaskToDOM();
}