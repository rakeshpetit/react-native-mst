import {types} from 'mobx-state-tree';

const Todo = types
  .model('Todo', {
    title: types.string,
    completed: types.boolean,
  })
  .actions(self => {
    return {
      setTitle(newTitle) {
        self.title = newTitle;
      },
      toggleCompleted() {
        self.completed = !self.completed;
      },
    };
  });

const TodoStore = types
  .model('TodoStore', {
    todos: types.array(Todo),
  })
  .views(self => {
    return {
      get completedTodos() {
        return self.todos.filter(t => t.completed);
      },
      get incompleteTodos() {
        return self.todos.filter(t => !t.completed);
      },
    };
  })
  .actions(self => {
    return {
      addTodo(title) {
        self.todos.push({
          title,
          completed: false,
        });
      },
    };
  });

// TodoStore.addTodo('Get milk')

const store = TodoStore.create({
  todos: [
    {
      title: 'Get coffee',
      completed: false,
    },
  ],
});
// store.todos.addTodo('Get milk');
export default store;

// export default TodoStore.create({
//   todos: [
//     {
//       title: 'Get biscuit',
//       completed: false,
//     },
//   ],
// });
