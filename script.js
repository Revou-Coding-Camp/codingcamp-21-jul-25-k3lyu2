document.addEventListener("DOMContentLoaded", function() {
    const todos = [];
    const taskInput = document.getElementById("task-input");
    const dateInput = document.getElementById("date-input");
    const addBtn = document.getElementById("add-btn");
    const todoBody = document.getElementById("todo-body");
    const deleteAllBtn = document.getElementById("delete-all-btn");
    const filterBtn = document.getElementById("filter-btn");

    function renderTodos(list = todos) {
        todoBody.innerHTML = "";
        if (list.length === 0) {
            todoBody.innerHTML = `<tr>
                <td colspan="4" class="no-task">No task found</td>
            </tr>`;
            return;
        }
        list.forEach((todo, idx) => {
            todoBody.innerHTML += `
                <tr>
                    <td>${todo.task}</td>
                    <td>${todo.dueDate}</td>
                    <td class="${todo.done ? 'status-done' : 'status-pending'}">
                        ${todo.done ? 'Done' : 'Pending'}
                    </td>
                    <td>
                        <button class="action-btn" onclick="toggleTodo(${idx})">${todo.done ? 'Undo' : 'Done'}</button>
                        <button class="action-btn" onclick="deleteTodo(${idx})">Delete</button>
                    </td>
                </tr>
            `;
        });
    }

    window.toggleTodo = function(idx) {
        todos[idx].done = !todos[idx].done;
        renderTodos();
    };

    window.deleteTodo = function(idx) {
        todos.splice(idx, 1);
        renderTodos();
    };

    addBtn.addEventListener("click", function() {
        const task = taskInput.value.trim();
        const dueDate = dateInput.value;
        if (!task || !dueDate) return;
        todos.push({ task, dueDate, done: false });
        taskInput.value = "";
        dateInput.value = "";
        renderTodos();
    });

    deleteAllBtn.addEventListener("click", function() {
        todos.length = 0;
        renderTodos();
    });

    filterBtn.addEventListener("click", function() {
        const filtered = todos.filter(todo => !todo.done);
        renderTodos(filtered);
    });

    renderTodos();
});