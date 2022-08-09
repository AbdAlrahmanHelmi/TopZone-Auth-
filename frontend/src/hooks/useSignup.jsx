import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsloding] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (name, email, password, confirmPassword) => {
    setIsloding(true);
    setError(null);
    const response = await fetch(
      "https://topzone-auth.herokuapp.com/api/user/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsloding(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsloding(false);

      navigate("/");
    }
  };

  return { signup, isLoading, error };
};
