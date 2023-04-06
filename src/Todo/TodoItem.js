import PropTypes from "prop-types";
import { useContext } from "react";
import Context from "../context"; /* Подключаем контекст */

/* Стили для li и imput */
const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: ".5rem",
  },
  input: {
    marginRight: "1rem",
  },
};

function TodoItem({ todo, index, onChange }) {
  /* Получаем  removeTodo из Context*/
  const { removeTodo } = useContext(Context);

  /* Заводим classes когда чекбокс будет выделен то добавится в стили класс done */
  const classes = [];

  if (todo.completed) {
    classes.push("done");
  }

  return (
    <li style={styles.li}>
      {/* Добавим стиль done */}
      <span className={classes.join(" ")}>
        <input
          type="checkbox"
          checked={todo.completed}
          style={styles.input}
          onChange={() => onChange(todo.id)}
        />
        <strong>{index + 1}</strong>
        {/* 	&nbsp; символ пробела */}
        &nbsp;
        {todo.title}
      </span>
      {/* &times; иконка крестика */}
      <button className="rm" onClick={removeTodo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default TodoItem;

/* npm install prop-types  Подобие TypeScript
Чтобы определять входящие свойства
*/

/*  onClick={() => removeTodo(todo.id)}

можно так 

onClick={removeTodo.bind(null, todo.id)}

null просто должны что-то передать
*/
