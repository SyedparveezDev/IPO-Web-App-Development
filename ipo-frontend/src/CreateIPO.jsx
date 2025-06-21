import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateIPO() {
  const [formData, setFormData] = useState({
    company_name: "",
    status: "upcoming",
    open_date: "",
    close_date: "",
    issue_type: "Book Building"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");

    axios.post("http://127.0.0.1:8000/api/ipos/create/", formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      alert("IPO created successfully!");
      navigate("/");
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to create IPO. Are you logged in as admin?");
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New IPO</h2>
      <form onSubmit={handleSubmit}>
        <input name="company_name" placeholder="Company Name" onChange={handleChange} required /><br /><br />
        <select name="status" onChange={handleChange}>
          <option value="upcoming">Upcoming</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select><br /><br />
        <input name="open_date" type="date" onChange={handleChange} required /><br /><br />
        <input name="close_date" type="date" onChange={handleChange} required /><br /><br />
        <input name="issue_type" placeholder="Issue Type" onChange={handleChange} required /><br /><br />
        <button type="submit">Create IPO</button>
      </form>
    </div>
  );
}

export default CreateIPO;
