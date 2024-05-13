import dotenv from "dotenv";
import { app } from "./src/app.js";
import connectDB from "./src/DB/index.js";
import { task } from "./src/utils/emailSender.util.js";
import cron from "node-cron";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectDB()
  .then(
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    })
  )
  .catch((error) => {
    console.log("MongoDB connection failed !!! ", error);
  });

cron.schedule("0 12 * * *", task)
