import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function IPOPage() {
  const { id } = useParams();
  const [ipo, setIpo] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/ipos/${id}/`)
      .then(response => setIpo(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!ipo) return <p>Loading IPO...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{ipo.company_name}</h2>
      <p>Status: {ipo.status}</p>
      <p>Price Band: {ipo.price_band}</p>
      <p>Open Date: {ipo.open_date}</p>
      <p>Close Date: {ipo.close_date}</p>
      <p>Issue Type: {ipo.issue_type}</p>
    </div>
  );
}

export default IPOPage;
