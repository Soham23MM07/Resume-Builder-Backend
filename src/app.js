import express from "express";
import resumeRoutes from "./routes/resume.route.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://resume-builder-frontend.vercel.app",
      "https://resume-builder-frontend-brown.vercel.app/",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Resume Builder Backend is running");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

export default app;
