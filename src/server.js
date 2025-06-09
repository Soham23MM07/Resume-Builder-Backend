import app from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT;
console.log(port);

connectDB()
  .then(() => {
    app.listen(port, () => console.log("Server running on port 3000"));
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
