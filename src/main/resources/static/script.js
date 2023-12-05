const apiUrl = 'http://localhost:8080/api/todos';

function addTodo() {
    var todoInput = document.getElementById('new-todo');
    var todoText = todoInput.value.trim();

    if (todoText !== "") {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: todoText })
        })
        .then(response => response.json())
        .then(newTodo => {
            // Update the frontend UI with the new todo
            var todoList = document.getElementById('todo-list');
            var newTodoItem = document.createElement('li');
            newTodoItem.innerHTML = `${newTodo.text} <button onclick="removeTodo(${newTodo.id})">Remove</button>`;
            todoList.appendChild(newTodoItem);

            todoInput.value = "";
        })
        .catch(error => console.error('Error adding todo:', error));
    }
}

function removeTodo(id) {
    fetch(apiUrl + '/' + id, {
        method: 'DELETE'
    })
    .then(() => {
        // Update the frontend UI by removing the todo item
        var todoItem = document.getElementById(`todo-item-${id}`);
        if (todoItem) {
            todoItem.parentNode.removeChild(todoItem);
        }
    })
    .catch(error => console.error('Error deleting todo:', error));
}

// Fetch initial todos
function fetchTodos() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(todos => {
        var todoList = document.getElementById('todo-list');
        todoList.innerHTML = "";

        todos.forEach(todo => {
            var todoItem = document.createElement('li');
            todoItem.id = `todo-item-${todo.id}`;
            todoItem.innerHTML = `${todo.text} <button onclick="removeTodo(${todo.id})">Remove</button>`;
            todoList.appendChild(todoItem);
        });
    })
    .catch(error => console.error('Error fetching todos:', error));
}

// Fetch initial todos when the page loads
fetchTodos();
