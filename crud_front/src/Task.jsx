import axios from "axios";
import { useState } from "react";

export default function Task({ task, setTasks }) {
  const [edit, setEdit] = useState(false);
  const [newDesc, setNewDesc] = useState(task.description);
  async function updateTask() {
    await axios.patch("http://localhost:3000/tasks", {
      title: task.title,
      description: newDesc,
    });
    const { data } = await axios.get("http://localhost:3000/tasks");
    setTasks(data);
  }

  return (
    <div
      style={{
        textAlign: "left",
        border: "2px solid gray",
        marginTop: "2px",
      }}
    >
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button
        onClick={function () {
          setEdit(!edit);
        }}
      >
        Editar
      </button>
      {edit && (
        <>
          <input
            onChange={function (e) {
              setNewDesc(e.target.value);
            }}
            placeholder={task.description}
          />
          <button onClick={updateTask}>Confirmar</button>
        </>
      )}
      <button
        onClick={async function () {
          await axios.delete("http://localhost:3000/tasks/" + task.title, {
            title: task.title,
            description: task.description,
          });
          const { data } = await axios.get("http://localhost:3000/tasks");
          setTasks(data);
        }}
      >
        Borrar
      </button>
    </div>
  );
}
