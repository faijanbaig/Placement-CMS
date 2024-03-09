import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";


const app = express();
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"))
app.use(cookieParser());

// Routes import
import userRouter from "../src/routes/user.route.js";
import companyRouter from "./routes/company.route.js"
import jobRouter from "./routes/job.route.js"

// Secured routes
app.use("/api/v1/users", userRouter);
app.use("/api/v2/companies", companyRouter)
app.use("/api/v3/companies/job", jobRouter)


export { app };
