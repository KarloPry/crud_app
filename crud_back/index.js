import express from "express";
import { json } from "express";
import { Client } from "pg";
import cors from "cors";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  }),
);
app.use(json());

const client = new Client({
  user: "postgres",
  password: "PASS",
  host: "localhost",
  port: 5432,
  database: "NAME",
});

await client.connect();

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/tasks", async (req, res) => {
  const response = await client.query("SELECT * FROM tasks;");
  res.json(response.rows);
});

app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const response = await client.query(
    `
      INSERT INTO tasks VALUES($1, $2);
    `,
    [title, description],
  );
  res.json(response.rowCount);
});

app.patch("/tasks", async (req, res) => {
  const { title, description } = req.body;
  console.log(title, description);
  const response = await client.query(
    `
      UPDATE tasks SET description = $2
      WHERE title = $1;
    `,
    [title, description],
  );
  res.json("Updated", title);
});

app.delete("/tasks/:title", async (req, res) => {
  const { title } = req.params;
  const response = await client.query(
    `
      DELETE FROM tasks WHERE title = $1
    `,
    [title],
  );
  res.json(response.rowCount);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
