import { useNavigate } from 'react-router-dom'
import { useRef } from "react"
import axios from 'axios'
import './Login.css'


function Login() {
  const navigate = useNavigate();

  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
  };

  const validateInputs = () => {
    let isValid = true;

    for (const key in inputRefs) {
      const value = inputRefs[key].current.value.trim();

      if (value === "") {
        alert(`Please enter ${key}`);
        isValid = false;
      }

      if (key === "email" && !isValidEmail(value)) {
        alert("Please enter a valid email address");
        isValid = false;
      }
    }

    return isValid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const newData = {};
    for (const key in inputRefs) {
      newData[key] = inputRefs[key].current.value;
    }

    axios
      .post("http://localhost:3000/login", newData)
      .then((res) => {
        if (res.status === 200) {
          console.log("Login successful!");
          navigate("/");
        } else {
          console.log("Login failed. Unexpected status code:", res.status);
        }
      })
      .catch((err) => {
        alert("Incorrect Email or Password");
      });

    for (const key in inputRefs) {
      inputRefs[key].current.value = "";
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <input ref={inputRefs.email} type="email" placeholder="email" />
        <input ref={inputRefs.password} type="password" placeholder="password" />
        <button className="submit">Login</button>
      </form>
      <button className="loginButton" onClick={() => navigate("/register")}>
        Don&apos;t have an account
      </button>
    </div>
  );
}

export default Login;







