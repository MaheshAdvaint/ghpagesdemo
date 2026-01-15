
import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [response, setResponse] = useState('');


  useEffect(() => {
    axios
      .get("http://192.168.1.191:3000")
      .then((response) => {
        console.log("res", response.data);
        setResponse(response.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);


  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>🚀 Product Web UI</h1>
      <p>React containerized and versioned</p>
      <p>React API With Axios</p>
      <div>
        <h3>{'API Response :' + response}</h3>
      </div>
    </div>
  );
}

export default App;
