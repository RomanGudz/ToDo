const todoForm = document.getElementById('form-todo');
const author = document.getElementById('author');
const post = document.getElementById('post');
const list = document.querySelector('.todo__list');
const countTodo = document.querySelector('.todo__count');

const base = {
  employee: 'Петров Сергей Иванович',
  todo: getTodoLS(),
  check(id) {
    for (let i = 0; i < base.todo.length; i++) {
      if (base.todo[i].id === id) {
        base.todo[i].ready = true;
      };
    };

  },
  addTodo(author, post) {
    const todo = {
      id: 'td' + (Date.now()),
      author,
      post,
      ready: false,
    }

    base.todo.push(todo);
    setTodoLS();
    checkTodoCount();
    return todo;
  },
  deleteTodo(id) {
    const newTodo = this.todo.filter(item => {
      return item.id !== id;
    })

    this.todo = newTodo;
    setTodoLS();
    list.innerHTML = '';
    renderTodo();
  }
};


function addTodo(e) {
  e.preventDefault();
  const authorText = author.value;
  const postText = post.value;

  const objTodo = base.addTodo(authorText, postText);
  const todoLi = createTodo(objTodo);

  list.append(todoLi);

  todoForm.reset();
}

function createTodo(todo) {
  const todoItem = ` 
  <article class="post ${todo.ready ? 'post_complete' : ''}">
      <h3 class="post__author" >${todo.author}</ >
                  <p class="post__todo">${todo.post}</p>
                  ${todo.ready ? `<button class="post__delete" type="button" data-id="${todo.id}">&#10006;</button>` : `<button class="post__ready" type="button" data-id="${todo.id}">✔</button>
                `}</article >
    `;

  const li = document.createElement('li');
  li.innerHTML = todoItem;
  li.classList.add('todo__list-item');

  return li;
};

function renderTodo() {
  for (let i = 0; i < base.todo.length; i++) {
    const todoLi = createTodo(base.todo[i]);
    list.append(todoLi);
  }
};

function checkTodoAndDel(event) {
  const btn = event.target.closest('.post__ready');
  const btnDel = document.querySelector('.post__delete');

  if (btn) {
    const post = btn.closest('.post');

    post.classList.add('post_complete');

    btn.textContent = '✖';
    btn.classList.replace('post__ready', 'post__delete');
    const id = btn.dataset.id;
    base.check(id);
    return setTodoLS();
  }
  if (btnDel) {
    const btnDel = event.target.dataset.id;
    base.deleteTodo(btnDel);
    checkTodoCount()
  }

};

function getTodoLS() {
  if (localStorage.getItem('todo')) {
    checkTodoCount();
    return JSON.parse(localStorage.getItem('todo'));
  };

  return [];

};

function setTodoLS() {
  localStorage.setItem('todo', JSON.stringify(base.todo));
};



function checkTodoCount() {
  countTodo.textContent = JSON.parse(localStorage.getItem('todo')).length;
}



renderTodo();

todoForm.addEventListener('submit', addTodo);
list.addEventListener('click', checkTodoAndDel);


const x = document.querySelector('#x');
const y = document.querySelector('#y');
const result = document.querySelector('.calc__result');
const btnCalc = document.querySelector('.calc__btn-wrapper');


function calcResult(event) {
  const target = event.target;
  if (target.textContent === '+') {
    result.textContent = Number(x.value) + Number(y.value);
  } else if (target.textContent === '-') {
    result.textContent = x.value - y.value;
  } else if (target.textContent === 'х') {
    result.textContent = x.value * y.value;
  } else {
    result.textContent = x.value / y.value;
  }

}

btnCalc.addEventListener('click', calcResult);