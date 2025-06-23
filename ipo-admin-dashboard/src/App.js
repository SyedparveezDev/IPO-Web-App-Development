import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import IPOList from "./components/IPOList";
import IPOForm from "./components/IPOForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access"));

  if (!isAuthenticated) return <Login setIsAuthenticated={setIsAuthenticated} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IPOList />} />
        <Route path="/new" element={<IPOForm />} />
        <Route path="/edit/:id" element={<IPOForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
