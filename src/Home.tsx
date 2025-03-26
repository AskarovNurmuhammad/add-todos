import React, { useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { database } from "./utils/firebase.config";
import { Link } from "react-router-dom";

const Home = () => {
  interface Todo {
    id: string;
    taskName: string;
    taskDate: string;
    status: string;
    userId: string; // User ID maydonini qo‘shish
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const userId = localStorage.getItem("userId"); // LocalStorage'dan foydalanuvchi ID sini olish

  useEffect(() => {
    const todoRef = ref(database, "todos");
    onValue(todoRef, (snapshot) => {
      if (snapshot.exists()) {
        const todosArray = Object.keys(snapshot.val()).map((key) => ({
          id: key,
          ...snapshot.val()[key],
        }));
        setTodos(todosArray);
      } else {
        setTodos([]);
      }
    });
  }, []);

  // ✅ Faqat login qilgan userning todosini chiqaramiz
  const userTodos = todos.filter((todo) => todo.userId === userId);

  // Status bo‘yicha filtrlash
  const createTodos = userTodos.filter((todo) => todo.status === "create");
  const progressTodos = userTodos.filter((todo) => todo.status === "progress");
  const doneTodos = userTodos.filter((todo) => todo.status === "done");

  const updateStatus = (todo: Todo) => {
    let newStatus = "";
    if (todo.status === "create") {
      newStatus = "progress";
    } else if (todo.status === "progress") {
      newStatus = "done";
    }

    const todoRef = ref(database, `todos/${todo.id}`);
    update(todoRef, { status: newStatus });
  };

  console.log("LocalStorage'dagi user ID:", userId);
  console.log("Filterlangan todos:", userTodos);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end">
        <Link className="btn btn-primary" to="/sign-in">
          Login
        </Link>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card border-success mb-3">
            <div className=" bg-success text-white">Create</div>
            <div className="card-body">
              {createTodos.map((todo) => (
                <div key={todo.id} className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{todo.taskName}</h5>
                    <p className="card-text">{todo.taskDate}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => updateStatus(todo)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-warning mb-3">
            <div className=" bg-warning text-white">Progress</div>
            <div className="card-body">
              {progressTodos.map((todo) => (
                <div key={todo.id} className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{todo.taskName}</h5>
                    <p className="card-text">{todo.taskDate}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => updateStatus(todo)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-primary mb-3">
            <div className=" bg-primary text-white">Done</div>
            <div className="card-body">
              {doneTodos.map((todo) => (
                <div key={todo.id} className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{todo.taskName}</h5>
                    <p className="card-text">{todo.taskDate}</p>
                    <button className="btn btn-success">Done</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
