import React, { useEffect, useState } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context"; /* Подключаем контекст */
/* import AddTodo from "./Todo/AddTodo";  Будем делать через LazyLoading */
import Loader from "./Loader";
import Modal from "./Modal/Modal";

/* LazyLoading  */
const AddTodo = React.lazy(() => import("./Todo/AddTodo"));

function App() {
  /* Состояние todos */
  const [todos, setTodos] = useState([]);

  /* Состоянии чтобы следить за loading */
  const [loading, setLoading] = useState(true);

  /* 
  Получаем todos с сервера
  [] список зависимостей чтобы отрабатывать данному callBack */
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos) => {
        setTodos(todos);
        setLoading(false); /* Убираем loading */
      });
  }, []);

  /* Когда нажимаем чекбокс то выполняем задачу */
  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }

  /* Удаляем на кнопку */
  function removeTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  /* Добавление из формы todo */
  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    /*
    Передаем Контекст
    Первые {} указывают как бы ковычки а вторые {} отвечают за тот объект который передаём*/
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal />

        {/* LazyLoading AddTodo 
        fallback={<p>Loading...</p>} что будет показываться пока компонента грузится
        */}
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}

        {/* Если туду не пустой то TodoList если пустой то No todos */}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;

/* https://loading.io/css/ Можно брать для Preloader */
