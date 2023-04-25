import React, { useState, useEffect, useContext } from "react";
import { auth } from "../auth/firebase";
import { IsLoggedIn } from "../auth/authContext";
import LoginForm from "./LoginForm";
import Header from "./HeaderForLogin";

function Login() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // console.log("chala");
    const unsub = auth.onAuthStateChanged((user) => {
      //state changed matlab naya userid ya password aaya to ab latest user nuje mil jaega, ab me us user ko set kar sakta hu
      //user kya hai, auth vaala user object hai
      setUser(user);
    });

    //jab ye component unmount hoga, to uspe se event listener hat jaega
    return () => {
      unsub(); //clean up
    };
  }, []);
  return (
    <IsLoggedIn.Provider value={user}>
      <Header></Header>
      <LoginForm></LoginForm>
    </IsLoggedIn.Provider>
  );
}

export default Login;
