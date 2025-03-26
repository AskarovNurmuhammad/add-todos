import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./utils/firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  function signUpUser() {
    createUserWithEmailAndPassword(auth, user.email, user.password).then(
      (res) => {
        navigate("/sign-in");
        addDoc(collection(db, "users"), user);
      }
    );
    console.log(user);
  }

  return (
    <div className="card p-3 mx-auto w-25">
      <input
        placeholder="name..."
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="form-control mb-2"
        type="text"
      />
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
      <button onClick={signUpUser} className="btn btn-dark">
        Sing Up
      </button>
    </div>
  );
};

export default SignUp;
