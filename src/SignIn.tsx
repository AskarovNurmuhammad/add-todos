import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "./utils/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";
const SignIn = () => {
  useEffect(() => {
    getData();
  }, []);
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  function sigInUser() {
    signInWithEmailAndPassword(auth, user.email, user.password).then((res) => {
      console.log(res);
      localStorage.setItem("token", res.user.accessToken);
      localStorage.setItem("userId", res.user.uid);
      navigate("/");
    });
    console.log(user);
  }

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
    console.log(users);
  }
  return (
    <div className="card p-3 mx-auto w-25">
      <input
        placeholder="email..."
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="form-control mb-2"
        type="text"
      />
      <input
        placeholder="password..."
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="form-control mb-2"
        type="text"
      />
      <button onClick={sigInUser} className="btn btn-dark">
        Sing Up
      </button>
      <Link className="btn btn-primary" to="/sign-up">
        Register
      </Link>
    </div>
  );
};

export default SignIn;
