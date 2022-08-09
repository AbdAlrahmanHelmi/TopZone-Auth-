import React from "react";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { BiLogIn } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>
        <BiLogIn /> Log in
      </h3>
      <div className="loginInput">
        <input
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Your Email"
        />

        <input
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Your Password"
        />
      </div>
      <button disabled={isLoading} type={"submit"}>
        Log in
      </button>

      <p>
        Dont i have an account? <Link to={"/signup"}>Sign up</Link>
      </p>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
