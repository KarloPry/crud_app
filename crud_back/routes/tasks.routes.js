import { Router } from "express";
import { Client } from "pg";
const tasks = Router();

const connection = new Client({
  user: "postgres",
  password: "PASS",
  host: "localhost",
  port: 5432,
  database: "NAME",
});

await connection.connect();

tasks.get("/tasks", async (req, res) => {
  const response = await connection.query("SELECT * FROM tasks;");
  res.json(response.rows);
});

tasks.get("/tasks/:title", async (req, res) => {
  const { title } = req.params;
  const task = await connection.query("SELECT * FROM tasks WHERE title = $1", [
    title,
  ]);
  res.json(task.rows[0]);
});

tasks.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const response = await connection.query(
    `
      INSERT INTO tasks VALUES($1, $2);
    `,
    [title, description],
  );
  res.json(response.rowCount);
});

tasks.patch("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const response = await connection.query(
    `
      UPDATE tasks SET description = $2
      WHERE title = $1;
    `,
    [title, description],
  );
  res.json("Updated", title);
});

tasks.delete("/tasks/:title", async (req, res) => {
  const { title } = req.params;
  const response = await connection.query(
    `
      DELETE FROM tasks WHERE title = $1;
    `,
    [title],
  );
  res.json(response.rowCount);
});

export default tasks;
