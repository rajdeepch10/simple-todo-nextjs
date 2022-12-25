"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { Trash2 } from "react-feather";

type ToDo = {
  id: number;
  desc: String;
};

export default function Home() {
  const inputRef = useRef(null);
  const [todoList, setToDoList] = useState<ToDo[]>([]);

  const addToDo = () => {
    const currentToDoList = [...todoList];
    currentToDoList.push({
      id: currentToDoList.length + 1,
      desc: inputRef.current.value,
    });
    localStorage.setItem("todoList", JSON.stringify(currentToDoList));
    setToDoList(currentToDoList);
    inputRef.current.value = "";
  };

  const deleteToDo = (id) => {
    console.log(id);
    const deletedToDoList = todoList.filter((todo) => todo.id !== id);
    const currentToDoList = deletedToDoList.map((todo, index) => {
      return { id: index + 1, desc: todo.desc };
    });
    localStorage.setItem("todoList", JSON.stringify(currentToDoList));
    setToDoList(currentToDoList);
  };

  useEffect(() => {
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    console.log(todoList);
    if (todoList !== undefined && todoList !== null) {
      setToDoList(todoList);
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={styles.inputSubmit}>
            <input
              className={styles.taskInput}
              type="text"
              placeholder="Enter todo"
              ref={inputRef}
            />
            <button
              className={styles.submitButton}
              onClick={addToDo}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
        <div className={styles.list}>
          {todoList.map((todo) => {
            return (
              <div key={todo.id} className={styles.listItem}>
                <p>{todo.desc}</p>
                <button
                  title="deleteTask"
                  className={styles.deleteTask}
                  onClick={() => deleteToDo(todo.id)}
                >
                  <Trash2 />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
