let currentFilter = 'all'
let deletedTaskStack = [];
const MAX_UNDO = 5;

function addTask() {
    var input = document.getElementById("taskInput")
    var taskText = input.value;

    if (taskText.trim() === ""){
        return;
    }

    var taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.setAttribute("data-completed", "false");

    var taskSpan = document.createElement("span")
    taskSpan.innerHTML = taskText;

    var checkIcon = document.createElement("i");
    checkIcon.className = "fa-solid fa-square-check";
    checkIcon.style.marginRight = "10px";
    checkIcon.style.cursor = "pointer";

    checkIcon.onclick = function() {
        taskDiv.classList.toggle("completed");
        const isDone = taskDiv.classList.contains("completed")
        taskDiv.setAttribute("data-completed", isDone ? "true" : "false");
        updateItemsLeft();
        filterTasks(currentFilter);
        saveTasksToLocalStorage();
    };

    var trashIcon = document.createElement("i");
    trashIcon.className = "fas fa-trash";

    trashIcon.onclick = function(){
        const taskList =  document.getElementById("taskList");
        const taskIndex = Array.from(taskList.children).indexOf(taskDiv);

        deletedTaskStack.push({
            element: taskDiv,
            index: taskIndex
        });

        if (deletedTaskStack.length > MAX_UNDO){
            deletedTaskStack.shift();
        }

        taskDiv.remove();
        updateItemsLeft();
        saveTasksToLocalStorage();
    };

    var iconContainer = document.createElement("div");
    iconContainer.className = "icons";
    iconContainer.appendChild(checkIcon);
    iconContainer.appendChild(trashIcon);
    
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(iconContainer);

    var taskList = document.getElementById("taskList");
    taskList.appendChild(taskDiv)
    updateItemsLeft();

    input.value = "";

    filterTasks(currentFilter);

    saveTasksToLocalStorage();
}

function updateItemsLeft(){
    const tasks = document.querySelectorAll('#taskList .task[data-completed="false"]');
    document.getElementById("itemsLeft").textContent = tasks.length;
}

document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function undoDelete(){
    if (deletedTaskStack.length > 0){
        const taskList = document.getElementById("taskList");
        const { element, index } = deletedTaskStack.pop();

        if (index >= 0 && index <= taskList.children.length) {
            taskList.insertBefore(element, taskList.children[index]);
        }
        else{
            taskList.appendChild(element);
        }

        updateItemsLeft();

        saveTasksToLocalStorage();
    }
}

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key.toLocaleLowerCase() === "z") {
        event.preventDefault();
        undoDelete();
    }
});
document.querySelector(".button_delete_all").addEventListener("click", function(){
    const taskList = document.getElementById("taskList");
    const tasks = taskList.querySelectorAll(".task");

    tasks.forEach(task => {
        if (task.classList.contains("completed")){
            task.remove();
        }
    });

    updateItemsLeft();

    saveTasksToLocalStorage();
});

function filterTasks(type) {
    currentFilter = type;
    document.querySelectorAll('.filter_button').forEach(btn => {
        btn.classList.remove('active-filter');
    });
    const buttonMap = {
        all: 0,
        completed: 1,
        active: 2
    };
    document.querySelectorAll('.filter_button')[buttonMap[type]].classList.add('active-filter');

    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        const isCompleted = task.getAttribute('data-completed') === 'true';
        if (type === 'all') {
            task.style.display = 'flex';
        }
        else if (type === 'completed') {
            task.style.display = isCompleted ? 'flex' : 'none';
        }
        else if (type === 'active') {
            task.style.display = !isCompleted ? 'flex' : 'none';
        }
    })
}
document.querySelectorAll(".filter_button").forEach(button => {
    button.addEventListener("click", function () {
        const type = this.getAttribute("data-type");
        filterTasks(type);
    });
});

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList .task').forEach(task => {
        const text = task.querySelector('span').innerHTML;
        const completed = task.getAttribute('data-completed') === 'true';
        tasks.push({
            text, completed
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task =>{
        var taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.setAttribute("data-completed", task.completed ? "true" : "false");
        if (task.completed) taskDiv.classList.add("completed");

        var taskSpan = document.createElement("span");
        taskSpan.innerHTML = task.text;

        var checkIcon = document.createElement("i");
        checkIcon.className = "fa-solid fa-square-check";
        checkIcon.style.marginRight = "10px";
        checkIcon.style.cursor = "pointer";

        checkIcon.onclick = function() {
            taskDiv.classList.toggle("completed");
            const isDone = taskDiv.classList.contains("completed");
            taskDiv.setAttribute("data-completed", isDone ? "true" : "false");
            updateItemsLeft();
            filterTasks(currentFilter);
            saveTasksToLocalStorage();
        };

        var trashIcon = document.createElement("i");
        trashIcon.className = "fas fa-trash";
        trashIcon.onclick = function () {
            const taskList = document.getElementById("taskList");
            const taskIndex = Array.from(taskList.children).indexOf(taskDiv);
            deletedTaskStack.push({
                element: taskDiv,
                index: taskIndex
            });
            if (deletedTaskStack.length > MAX_UNDO) {
                deletedTaskStack.shift();
            }
            taskDiv.remove();
            updateItemsLeft();
            saveTasksToLocalStorage();
        };

        var iconContainer = document.createElement("div");
        iconContainer.className = "icons";
        iconContainer.appendChild(checkIcon);
        iconContainer.appendChild(trashIcon);

        taskDiv.appendChild(taskSpan);
        taskDiv.appendChild(iconContainer);

        document.getElementById("taskList").appendChild(taskDiv);
    });
    
    updateItemsLeft();
    filterTasks('all');
}