const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const listSelector = document.getElementById('listSelector');
const todoList = document.getElementById('todoList');

let taskToDelete = null; 
let lastDeletedTask = null;
let lastDeletedTaskList = null;

const addTask = () => {
    const text = taskInput.value.trim();

    if (text === ""){
        alert("Input can't be empty");
        return;
    }

    const li = document.createElement('li');

    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
    <span class="task-text">${text}</span>
    <small class="text-muted ms-2 completion-date"></small>
    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
    `;

    li.addEventListener('click', () => {
        li.classList.toggle('task-done');
        const dateElement = li.querySelector('.completion-date');
        if (li.classList.contains('task-done')) {
 
            dateElement.textContent = `(Completed: ${new Date().toLocaleString([], { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
            })})`;
        } else {

            dateElement.textContent = "";
        }
    });

    const deleteBtn = li.querySelector('.delete-btn');

    deleteBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        taskToDelete = li; 
        document.getElementById('modalTaskText').textContent = text;
        const deleteModal = document.getElementById('delete-modal');
        deleteModal.style.display = 'block';
    });

    const targetListId = listSelector.value; 
    
    const targetList = document.getElementById(targetListId); 
    
    targetList.appendChild(li);
    taskInput.value = "";
    
};

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
});

const deleteModal = document.getElementById('delete-modal');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalDeleteBtn = document.getElementById('modalDeleteBtn');

modalCancelBtn.addEventListener('click', () => {
    deleteModal.style.display = 'none';  
});

modalDeleteBtn.addEventListener('click', () => {
    if (taskToDelete) {
        lastDeletedTask = taskToDelete;
        lastDeletedTaskList = taskToDelete.parentElement;
        taskToDelete.remove();
        deleteModal.style.display = 'none';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'z') {
        if (lastDeletedTask && lastDeletedTaskList) {
            lastDeletedTaskList.appendChild(lastDeletedTask);
            lastDeletedTask = null;
            lastDeletedTaskList = null;
        }
    }
});