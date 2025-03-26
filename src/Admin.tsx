import React, { useEffect, useState } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { database } from "./utils/firebase.config";

type AdminType = {
  email: string;
  password: string;
};

const Admin = () => {
  useEffect(() => {
    getData();
  }, []);
  const [users, setUsers] = useState([]);

  const [admin, setAdmin] = useState<AdminType>({
    email: "",
    password: "",
  });
  const options = users.map((item) => {
    return { value: item.id, label: item.name };
  });

  const [selectedOption, setSelectedOption] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const login = () => {
    if (admin.email === "admin@gmail.com" && admin.password === "admin123") {
      setIsLogin(true);
    } else {
      alert("Email xato");
    }
  };

  function getData() {
    const data = ref(database, "users");
    onValue(data, (snapshot) => {
      if (snapshot.exists()) {
        const usersArray = Object.keys(snapshot.val()).map((key) => ({
          id: key,
          ...snapshot.val()[key],
        }));
        setUsers(usersArray);
      } else {
        setUsers([]);
      }
      console.log(users);
    });
  }

  function postTodo() {
    if (!taskName || !selectedOption || !taskDate) {
      alert("Barcha maydonlarni to'ldiring!");
      return;
    }

    const todoRef = ref(database, "todos");
    const newTodoRef = push(todoRef);

    set(newTodoRef, {
      taskName: taskName,
      userId: selectedOption,
      taskDate: taskDate,
      status: "create",
    }).then(() => {
      console.log("Todo muvaffaqiyatli qo'shildi:", newTodoRef.key);
      setTaskName("");
      setSelectedOption("");
      setTaskDate("");
    });
  }

  return (
    <div>
      {!isLogin ? (
        <div className="card p-3 mx-auto w-25 d-flex flex-column gap-3">
          <input
            type="email"
            className="form-control"
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
          />
          <input
            type="password"
            className="form-control"
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          />
          <button className="btn btn-dark" onClick={login}>
            Login
          </button>
        </div>
      ) : null}
      <div>
        {isLogin ? (
          <div className="card p-3 mx-auto w-25 d-flex flex-column gap-3">
            <input
              type="text"
              className="form-control"
              placeholder="task name..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <select
              className="form-control"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Select an option</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="form-control"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
            />
            <button onClick={postTodo} className="btn btn-dark">
              Add
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Admin;
