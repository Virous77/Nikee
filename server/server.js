import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { routes } from "./src/routes.js";

dotenv.config();
const app = express();

//App middleware
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

// App api middleware
app.use("/api/v1", routes);

//Handle app Error
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong, Try again!";

  return res.status(errorStatus).json({
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
    success: false,
  });
});

const PORT = process.env.PORT || 3000;

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server up and running on port ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
