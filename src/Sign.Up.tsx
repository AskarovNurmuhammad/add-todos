import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./utils/firebase.config";
import { ref, set } from "firebase/database"; // Firestore emas, Realtime Database
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  function signUpUser() {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        const userId = res.user.uid; // Firebase auth ID
        set(ref(db, "users/" + userId), {
          name: user.name,
          email: user.email,
          password: user.password, // Parolni saqlash tavsiya etilmaydi!
        }).then(() => {
          navigate("/sign-in");
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
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
        type="password"
      />
      <button onClick={signUpUser} className="btn btn-dark">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
