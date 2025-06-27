import express from "express";
import resumeRoutes from "./routes/resume.route.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["https://full-stack-resume-builder.netlify.app/"],
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
