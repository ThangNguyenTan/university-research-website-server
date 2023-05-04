import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import connectDB from "./config/db";
import Router from "./routes";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app: Application = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use("/api", Router());

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
