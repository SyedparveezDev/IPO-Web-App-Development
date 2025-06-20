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
    <div style={{ padding: "20px" }}>
      <h1>IPO List</h1>
      {ipos.length === 0 ? (
        <p>No IPOs available.</p>
      ) : (
        <ul>
          {ipos.map(ipo => (
            <li key={ipo.id}>
              <Link to={`/ipo/${ipo.id}`}>
                {ipo.company_name} ({ipo.status})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
