import { useEffect, useState } from "react";
import mqtt from "mqtt";
import axios from "axios";
import "./App.css";

function App() {
  // API state (unchanged)
  const [apiResponse, setApiResponse] = useState("");

  // MQTT state
  const [mqttClient, setMqttClient] = useState(null);
  const [mqttStatus, setMqttStatus] = useState("Disconnected");
  const [publishMsg, setPublishMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState("");

  // MQTT config
  const MQTT_URL = "ws://192.168.1.80:8083";
  const MQTT_TOPIC = "smarthome/test";

  // ---- API CALL (AS-IS) ----
  useEffect(() => {
    axios
      .get("http://192.168.1.125:3000")
      .then((res) => setApiResponse(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  // ---- MQTT CONNECTION ----
  useEffect(() => {
    const client = mqtt.connect(MQTT_URL);

    client.on("connect", () => {
      console.log("MQTT connected");
      setMqttStatus("Connected");

      client.subscribe(MQTT_TOPIC, (err) => {
        if (!err) console.log("Subscribed:", MQTT_TOPIC);
      });
    });

    client.on("message", (topic, message) => {
      setReceivedMsg(message.toString());
    });

    client.on("error", (err) => {
      console.error("MQTT error", err);
      setMqttStatus("Error");
    });

    setMqttClient(client);

    return () => client.end();
  }, []);

  // ---- PUBLISH ----
  const publishMessage = () => {
    if (mqttClient && publishMsg) {
      mqttClient.publish(MQTT_TOPIC, publishMsg);
      setPublishMsg("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>🚀 Product Web UI</h1>

      {/* API Section */}
      <h3>API Response</h3>
      <p>{apiResponse}</p>

      <hr />

      {/* MQTT Section */}
      <h3>MQTT Status: {mqttStatus}</h3>

      <input
        type="text"
        value={publishMsg}
        onChange={(e) => setPublishMsg(e.target.value)}
        placeholder="Enter MQTT message"
      />

      <button onClick={publishMessage} style={{ marginLeft: 10 }}>
        Publish
      </button>

      <div style={{ marginTop: 20 }}>
        <h4>Received MQTT Message</h4>
        <p>{receivedMsg}</p>
      </div>
    </div>
  );
}

export default App;
