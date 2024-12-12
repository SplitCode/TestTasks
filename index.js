document.addEventListener('DOMContentLoaded', () => {
  const MAX_LENGTH = 50; // макс длина записи

  const app = document.getElementById('todo-app');
  app.innerHTML = `
    <div class="mb-3">
      <input id="todo-input" type="text" class="form-control" placeholder="Введите новую задачу (до ${MAX_LENGTH} символов)">
      <button id="add-btn" class="btn btn-primary mt-2">Добавить</button>
    </div>
    <ul id="todo-list" class="list-group"></ul>
    <div class="mt-3">
      <button id="filter-all" class="btn btn-secondary">Все</button>
      <button id="filter-active" class="btn btn-secondary">Текущие</button>
      <button id="filter-completed" class="btn btn-secondary">Выполненные</button>
    </div>
    <p class="mt-3">Выполненные: <span id="completed-count">0</span> | Текущие: <span id="active-count">0</span></p>
  `;

  // Состояние приложения
  let todos = [];
  let filter = 'all'; // 'all', 'active', 'completed'

  // Элементы управления
  const input = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  const completedCount = document.getElementById('completed-count');
  const activeCount = document.getElementById('active-count');
  const filterButtons = {
    all: document.getElementById('filter-all'),
    active: document.getElementById('filter-active'),
    completed: document.getElementById('filter-completed'),
  };

  // Обновление списка задач
  function render() {
    todoList.innerHTML = '';
    const filteredTodos = todos.filter((todo) => {
      if (filter === 'all') return true;
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
    });

    filteredTodos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = `list-group-item todo-item ${todo.completed ? 'completed' : ''}`;
      li.textContent = todo.text;
      li.addEventListener('click', () => toggleCompletion(index));

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Удалить';
      deleteBtn.className = 'btn btn-danger btn-sm float-end';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTodo(index);
      });

      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });

    completedCount.textContent = todos.filter((todo) => todo.completed).length;
    activeCount.textContent = todos.filter((todo) => !todo.completed).length;
  }

  // Добавление задачи
  function addTodo() {
    const text = input.value.trim();
    if (text.length > 0 && text.length <= MAX_LENGTH) {
      todos.push({ text, completed: false });
      input.value = '';
      render();
    } else {
      alert(`Задача должна быть длиной до ${MAX_LENGTH} символов!`);
    }
  }

  // Удаление задачи
  function deleteTodo(index) {
    todos.splice(index, 1);
    render();
  }

  // Переключение статуса выполнения
  function toggleCompletion(index) {
    todos[index].completed = !todos[index].completed;
    render();
  }

  // Установка фильтра
  function setFilter(newFilter) {
    filter = newFilter;
    render();
  }

  // Обработчики событий
  addBtn.addEventListener('click', addTodo);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
  });
  filterButtons.all.addEventListener('click', () => setFilter('all'));
  filterButtons.active.addEventListener('click', () => setFilter('active'));
  filterButtons.completed.addEventListener('click', () =>
    setFilter('completed')
  );

  render();
});
