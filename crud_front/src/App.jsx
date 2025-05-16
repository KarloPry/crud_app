import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import TestComponent from "./Test";

function App() {
  const [tasks, setTasks] = useState([]);
  const [titleVar, setTitleVar] = useState("");
  const [descriptionVar, setDescriptionVar] = useState("");
  useEffect(() => {
    async function getTasks() {
      const { data } = await axios.get("http://localhost:3000/tasks");
      setTasks(data);
    }
    getTasks();
  }, []);

  async function createTask() {
    await axios.post("http://localhost:3000/tasks", {
      title: titleVar,
      description: descriptionVar,
    });
    const { data } = await axios.get("http://localhost:3000/tasks");
    setTasks(data);
  }

  return (
    <div>
      <input
        placeholder="Titulo"
        onChange={(e) => {
          setTitleVar(e.target.value);
        }}
      />
      <input
        placeholder="Description"
        onChange={(e) => {
          setDescriptionVar(e.target.value);
        }}
      />
      <button onClick={createTask}>Crear task</button>
      <TestComponent setTasks={setTasks} tasks={tasks} />
    </div>
  );
}

export default App;
