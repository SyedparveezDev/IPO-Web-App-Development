import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access"));

  if (!isAuthenticated) return <Login setIsAuthenticated={setIsAuthenticated} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Dashboard Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;