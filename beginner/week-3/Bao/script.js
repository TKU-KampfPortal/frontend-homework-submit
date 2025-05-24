const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const noTasks = document.querySelector('.no-tasks');
let currentFilter = 'All'; // Track current filter status

let todoTasks = loadTodos();
updateTodoList();

// Set "All" filter as active by default
document.addEventListener('DOMContentLoaded', () => {
    const showAll = document.getElementById('showAll');
    if (showAll) {
        showAll.classList.add('active');
    }
});

// Add event listeners for filter buttons
document.getElementById('showAll').addEventListener('click', (event) => filterTodos('All', event));
document.getElementById('showActive').addEventListener('click', (event) => filterTodos('Active', event));
document.getElementById('showCompleted').addEventListener('click', (event) => filterTodos('Completed', event));

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
})

function addTask() {
    const todoContent = todoInput.value.trim();
    if (todoContent.length > 0) {
        const todoObject = {
            content: todoContent,
            completed: false,
            isNew: true // Mark as new for animation
        }
        todoTasks.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList() {
    const itemsLeft = todoTasks.length;
    todoList.innerHTML = "";
    
    // Show or hide the "No tasks yet" message based on whether there are any tasks
    if (itemsLeft === 0) {
        setTimeout(() => {
            noTasks.style.display = 'flex';
        }, 200);
    } else {
        noTasks.style.display = 'none';
    }

    todoTasks.forEach((task, taskIndex) => {
        const todoItem = createTodoItem(task, taskIndex);
        
        // Hide tasks based on filter
        if (currentFilter === 'Active' && task.completed) {
            todoItem.style.display = 'none';
        } else if (currentFilter === 'Completed' && !task.completed) {
            todoItem.style.display = 'none';
        }
        
        todoList.append(todoItem);
    });

    // Update items left count
    document.querySelector('.todo-container-footer label').textContent = `${itemsLeft} items left`;
}

function createTodoItem(task, taskIndex) {
    const todoID = "todo" + taskIndex;
    const todoItem = document.createElement("li");
    const todoContent = task.content;
    todoItem.className = "todo";
    
    if (task.isNew) {
        todoItem.classList.add("todo-appear");
        // Remove the isNew flag after animation
        setTimeout(() => {
            task.isNew = false;
            saveTodos();
        }, 300);
    }
    
    todoItem.innerHTML = `
        <li class="todo">
            <input type="checkbox" id="${todoID}">
            <label class="custom-checkbox" for="${todoID}">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                </svg>
            </label>
            <label class="todo-text" for="${todoID}">
                ${todoContent}
            </label>
            <button class="edit-button">
                <svg class="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                </svg>
            </button>
            <button class="delete-button">
                <svg class="delete" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"/>
                </svg>
            </button>
        </li>
    `;

    const editButton = todoItem.querySelector('.edit-button');
    const todoTextLabel = todoItem.querySelector('.todo-text');
    const deleteButton = todoItem.querySelector('.delete-button');
    const clearCompletedButton = document.getElementById('clearCompleted');
    
    editButton.addEventListener('click', () => {
        editTask(task, todoTextLabel);
    });
    deleteButton.addEventListener('click', () => {
        deleteTask(taskIndex);
    });
    clearCompletedButton.addEventListener('click', () => {
        clearCompletedTasks();
    });
    
    // Save checkbox status to local storage
    const checkbox = todoItem.querySelector('input');
    checkbox.addEventListener('change', () => {
        todoTasks[taskIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = task.completed;
    return todoItem;
}

function editTask(task, todoTextLabel) {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = task.content;
    
    // Replace label with input
    const originalTodo = todoTextLabel.parentNode;
    originalTodo.replaceChild(editInput, todoTextLabel);
    editInput.focus();
    
    editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            saveEdit();
        } else if (event.key === 'Escape') {
            cancelEdit();
        }
    });
    editInput.addEventListener('blur', saveEdit());
    
    function saveEdit() {
        const newValue = editInput.value.trim();
        if (newValue.length > 0) {
            task.content = newValue;
            todoTextLabel.textContent = newValue;
            originalTodo.replaceChild(todoTextLabel, editInput);
            saveTodos();
        } else {
            cancelEdit();
        }
    }
    
    function cancelEdit() {
        originalTodo.replaceChild(todoTextLabel, editInput);
    }
}

function deleteTask(taskIndex) {
    const todoItems = document.querySelectorAll('#todo-list > li');
    const todoItem = todoItems[taskIndex];
    
    if (todoItem) {
        todoItem.classList.add('todo-disappear');
        
        setTimeout(() => {
            todoTasks.splice(taskIndex, 1);
            updateTodoList();
            saveTodos();
        }, 300);
    } else {
        todoTasks.splice(taskIndex, 1);
        updateTodoList();
        saveTodos();
    }
}

function clearCompletedTasks() {
    // Get all completed todo items
    const completedItems = document.querySelectorAll('#todo-list > li input[type="checkbox"]:checked');
    
    if (completedItems.length > 0) {
        completedItems.forEach(checkbox => {
            const todoItem = checkbox.closest('li');
            if (todoItem) {
                todoItem.classList.add('todo-disappear');
            }
        });
        
        setTimeout(() => {
            todoTasks = todoTasks.filter(task => !task.completed);
            updateTodoList();
            saveTodos();
        }, 300);
    } else {
        todoTasks = todoTasks.filter(task => !task.completed);
        updateTodoList();
        saveTodos();
    }
}

function saveTodos() {
    const todoJSON = JSON.stringify(todoTasks);
    localStorage.setItem('todos', todoJSON);
}

function loadTodos() {
    // Check if there are any todos in localStorage. If not, create an empty array.
    const todos = localStorage.getItem('todos') || "[]";
    return JSON.parse(todos);
}

function filterTodos(filterType, event) {
    event.preventDefault();
    currentFilter = filterType;
    updateTodoList();
    
    // Update active state of filter buttons
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.id === `show${filterType}`) {
            button.classList.add('active');
        }
    });
}