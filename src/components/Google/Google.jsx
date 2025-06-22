import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Google() {
  const [user, setUser] = useState({});

  const provider = new GoogleAuthProvider();

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

  const signInUsingGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const resultUser = result.user;
        setUser(resultUser)
        console.log(token);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  console.log(user)

  return (
    <div
      style={{
        border: "1px solid goldenrod",
        padding: "10px",
        marginTop: "20px",
      }}
    >
        {
            user?.email ?
            <div className="">
                <p>{user?.email}</p>
                <p>{user?.displayName}</p>
                <img src={user.photoURL} alt={user?.email} />
            </div>
            :
            <button onClick={() => signInUsingGoogle()}>Sign in With Google</button>
        }
    </div>
  );
}
