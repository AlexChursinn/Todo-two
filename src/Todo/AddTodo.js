import { useState } from "react";
import PropTypes from "prop-types";

/* Создаём собственный хук */
function useInputValue(defaultValue = "") {
  /* Состояние input */
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(""),
    value: () => value,
  };
}

function AddTodo({ onCreate }) {
  /* Воспользуемся своим хуком в котором прячем логику которую обычно всегда передаем в input для обработки формы */
  const input = useInputValue("");

  function submitHandler(event) {
    event.preventDefault();

    /* Если input.value не пустой trim убирает лишние пробелы */
    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
      /* setValue(""); */
    }
  }

  return (
    <form style={{ marginBottom: "1rem" }} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type="submit">Add todo</button>
    </form>
  );
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default AddTodo;

/* 

Было
<input value={value} onChange={(event) => setValue(event.target.value)}

Стало

<input {...input} />
Поместит в input value и onChange функционал останется тот же самый

*/
