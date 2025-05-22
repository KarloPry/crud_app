import express from "express";
import { json } from "express";
import { Client } from "pg";
import cors from "cors";

import tasksRoutes from "./routes/tasks.routes.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "*",
  }),
);
app.use(json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.use(tasksRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
