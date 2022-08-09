import React from "react";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { FaUserAlt } from "react-icons/fa";
import { ImEarth } from "react-icons/im";

import "./Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password, confirmPassword);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3 >
        {" "}
        <FaUserAlt /> Sign up
      </h3>

      <div className="inputForm">
        <input
          type={"text"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Name"
        />

        <input
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />

        <input
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />

        <input
          type={"password"}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          placeholder="Confirm Password"
        />
      </div>
      <div className="selectCountry">
        <ImEarth />
        <select>
          <optgroup label="--Choose Country--">
            <option value=""> --Choose Country--</option>
            <option value="jordan">Jordan</option>
            <option value="eau">EAU</option>
          </optgroup>
        </select>
      </div>

      <button disabled={isLoading} type={"submit"}>
        Sign up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
