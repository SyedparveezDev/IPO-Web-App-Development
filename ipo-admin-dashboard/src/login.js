import React, { useState } from "react";
import API from "../api";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/token/", { username: email, password });
      localStorage.setItem("access", res.data.access);
      setIsAuthenticated(true);
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={login} className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Admin Login</h3>
      <input type="text" placeholder="Username" className="form-control mb-2" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="form-control mb-2" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary w-100">Login</button>
    </form>
  );
}
