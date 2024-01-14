import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const inputRefs = {
    name: useRef(null),
    lastName: useRef(null),
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
    // Basic email validation regex
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
      .post('http://localhost:3000/register', newData)
      .then((res) => {
        console.log(res);
        // Handle success if needed
      })
      .catch((err) => {
        console.log(err);
        // Handle error if needed
      });

    for (const key in inputRefs) {
      inputRefs[key].current.value = '';
    }

    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="regForm">
        <input ref={inputRefs.name} className="inp" type="text" name="name" placeholder="Name" />
        <input ref={inputRefs.lastName} className="inp" type="text" name="lastName" placeholder="Lastname" />
        <input ref={inputRefs.email} className="inp" type="email" name="email" placeholder="Email" />
        <input ref={inputRefs.password} className="inp" type="password" name="password" placeholder="Password" />

        <button className="btn" type="submit">
          Register
        </button>
      </form>
      <button className="btn-log" onClick={() => navigate('/login')}>
        Go to login
      </button>
    </div>
  );
}

export default Register;












