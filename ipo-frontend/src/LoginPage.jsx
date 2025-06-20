import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post("http://127.0.0.1:8000/api/token/", {
      username,
      password
    })
    .then(res => {
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      alert("Login successful!");
      navigate("/");
    })
    .catch(err => {
      alert("Login failed. Check credentials.");
      console.error(err);
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)} required /><br /><br />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
