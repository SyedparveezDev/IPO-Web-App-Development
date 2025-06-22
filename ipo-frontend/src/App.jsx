import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [ipos, setIpos] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/ipos/")
      .then(res => setIpos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-violet-700">IPO Listings 🚀</h1>
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Admin Login
          </Link>
        </header>

        {localStorage.getItem("access") && (
          <div className="mb-6">
            <Link
              to="/create"
              className="inline-block bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 transition"
            >
              ➕ Create New IPO
            </Link>
          </div>
        )}

        <ul className="grid gap-4">
          {ipos.map((ipo) => (
            <li key={ipo.id}>
              <Link
                to={`/ipo/${ipo.id}`}
                className="block bg-white shadow hover:shadow-md transition rounded-lg p-4 border border-gray-200"
              >
                <div className="text-lg font-semibold text-gray-800">
                  {ipo.company_name}
                </div>
                <div className="text-sm text-gray-500">Status: {ipo.status}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
