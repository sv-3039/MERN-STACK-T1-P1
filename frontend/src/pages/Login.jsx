import { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/axios";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login Successful 🎉");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={loginHandler}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;