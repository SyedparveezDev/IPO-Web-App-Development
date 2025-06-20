import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [ipos, setIpos] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/ipos/")
      .then(response => {
        setIpos(response.data);
      })
      .catch(error => {
        console.error("Error fetching IPOs:", error);
      });
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
              <strong>{ipo.company_name}</strong> — {ipo.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
