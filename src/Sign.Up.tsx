import React, { useEffect, useState } from "react";
import { ref, onValue, set, remove, update } from "firebase/database";
import { auth, database } from "./utils/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (editId) {
      const selectedUser = users.find((u) => u.id === editId);
      if (selectedUser) {
        setUser({
          name: selectedUser.name,
          email: selectedUser.email,
          password: selectedUser.password,
        });
      }
    }
  }, [editId]);

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
    });
  }

  function signUpUser() {
    createUserWithEmailAndPassword(auth, user.email, user.password).then(
      (res) => {
        set(ref(database, `users/${res.user.uid}`), {
          name: user.name,
          email: res.user.email,
          password: user.password,
        });
      }
    );
  }

  function delItem(id) {
    remove(ref(database, `users/${id}`));
  }

  function editItem(id) {
    setEditId(id);
  }

  function updateUser() {
    if (editId) {
      update(ref(database, `users/${editId}`), {
        name: user.name,
        email: user.email,
        password: user.password,
      }).then(() => {
        setUser({ name: "", email: "", password: "" });
        setEditId(null);
      });
    }
  }

  return (
    <div>
      <div className="card p-3 mx-auto w-25">
        <input
          value={user.name}
          placeholder="name..."
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="form-control mb-2"
          type="text"
        />
        <input
          value={user.email}
          placeholder="email..."
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="form-control mb-2"
          type="text"
        />
        <input
          value={user.password}
          placeholder="password..."
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="form-control mb-2"
          type="text"
        />
        {editId ? (
          <button onClick={updateUser} className="btn btn-success">
            Update
          </button>
        ) : (
          <button onClick={signUpUser} className="btn btn-dark">
            Sign Up
          </button>
        )}
      </div>
      {/* 
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <button
                  onClick={() => delItem(item.id)}
                  className="btn btn-danger"
                >
                  X
                </button>
                <button
                  onClick={() => editItem(item.id)}
                  className="btn btn-warning"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default App;
