export const todo = () => {
  const todoForm = document.getElementById('form-todo');
  const author = document.getElementById('author');
  const post = document.getElementById('post');
  const list = document.querySelector('.todo__list');
  const countTodo = document.querySelector('.todo__count');

  const base = {
    init() {
      this.todo = this.getTodoLS();
    },
    employee: 'Петров Сергей Иванович',
    todo: [],
    check(id) {
      for (let i = 0; i < this.todo.length; i++) {
        if (this.todo[i].id === id) {
          this.todo[i].ready = true;
        };
      };
      this.setTodoLS();
    },
    addTodo(author, post) {
      const todo = {
        id: 'td' + (Date.now()),
        author,
        post,
        ready: false,
      }

      this.todo.push(todo);
      this.setTodoLS();
      checkTodoCount();
      return todo;
    },
    getTodoLS() {
      if (localStorage.getItem('todo')) {
        checkTodoCount();
        return JSON.parse(localStorage.getItem('todo'));
      };

      return [];

    },
    setTodoLS() {
      localStorage.setItem('todo', JSON.stringify(this.todo));
    },
    deleteTodo(id) {
      const newTodo = this.todo.filter(item => {
        return item.id !== id;
      })

      this.todo = newTodo;
      this.setTodoLS();
      list.innerHTML = '';
      renderTodo();
    }
  };


  const addTodo = (e) => {
    e.preventDefault();
    const authorText = author.value;
    const postText = post.value;

    const objTodo = base.addTodo(authorText, postText);
    const todoLi = createTodo(objTodo);

    list.append(todoLi);

    todoForm.reset();
  }

  const createTodo = (todo) => {
    const { ready, author, id, post } = todo;

    const todoItem = ` 
  <article class="post ${ready ? 'post_complete' : ''}">
      <h3 class="post__author" >${author}</ >
                  <p class="post__todo">${post}</p>
                  ${ready ? `<button class="post__delete" type="button" data-id="${id}">&#10006;</button>` : `<button class="post__ready" type="button" data-id="${id}">✔</button>
                `}</article >
    `;

    const li = document.createElement('li');
    li.innerHTML = todoItem;
    li.classList.add('todo__list-item');

    return li;
  };

  const renderTodo = () => {
    for (let i = 0; i < base.todo.length; i++) {
      const todoLi = createTodo(base.todo[i]);
      list.append(todoLi);
    }
  };

  const checkTodoAndDel = (event) => {
    const btn = event.target.closest('.post__ready');
    const btnDel = document.querySelector('.post__delete');

    if (btn) {
      const post = btn.closest('.post');

      post.classList.add('post_complete');

      btn.textContent = '✖';
      btn.classList.replace('post__ready', 'post__delete');
      const id = btn.dataset.id;
      base.check(id);
      return;
    };
    if (btnDel) {
      const btnDel = event.target.dataset.id;
      base.deleteTodo(btnDel);
      checkTodoCount();
    };

  };





  const checkTodoCount = () => {
    countTodo.textContent = JSON.parse(localStorage.getItem('todo')).length;
  }

  todoForm.addEventListener('submit', addTodo);
  list.addEventListener('click', checkTodoAndDel);

  base.init();
  renderTodo();
};


