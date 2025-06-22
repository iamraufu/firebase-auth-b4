import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [user, setUser] = useState({});
  const [firebaseError, setFirebaseError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => signUpWithEmailPassword(formData);

  const firebaseConfig = {
    apiKey: "AIzaSyA_k5G_a0w0KElAzenvL4S846JxDVotziI",
    authDomain: "fir-auth-b4.firebaseapp.com",
    projectId: "fir-auth-b4",
    storageBucket: "fir-auth-b4.firebasestorage.app",
    messagingSenderId: "367010344130",
    appId: "1:367010344130:web:1ec92438ac0727d2e05f5b",
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const signUpWithEmailPassword = (data) => {
    const email = data.email;
    const password = data.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setFirebaseError(errorMessage);
      });
  };
  
  return (
    <div className="">
      <Link to={'/'}>Home</Link>
      {user.email && <h2>You are signed up with {user?.email}</h2>}
      <form
        style={{
          border: "1px solid lightgray",
          padding: "10px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2
          style={{
            fontSize: "16px",
          }}
        >
          Sign Up with Email and Password
        </h2>
        <input
          type="email"
          style={{
            padding: "10px",
            width: "250px",
            margin: "10px",
          }}
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <br />
        {errors.email && (
          <span
            style={{
              color: "red",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            Email is required
          </span>
        )}

        <br />
        <input
          type="password"
          style={{
            padding: "10px",
            width: "250px",
            margin: "10px",
          }}
          {...register("password", { required: true })}
          placeholder="Password"
        />
        <br />
        {errors.password && (
          <span
            style={{
              color: "red",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            Password is required
          </span>
        )}

        <br />
        <input
          style={{
            padding: "15px",
            width: "270px",
            margin: "10px",
            backgroundColor: "green",
            border: "none",
          }}
          type="submit"
        />
        <br />
        <span
          style={{
            color: "red",
            fontSize: "14px",
            margin: "10px",
          }}
        >
          {firebaseError}
        </span>
      </form>
      <p>Already Have an account? <Link to={'/login'}>Login</Link></p>
    </div>
  );
}
