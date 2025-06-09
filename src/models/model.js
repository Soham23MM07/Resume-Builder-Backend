import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, default: "Untitled Resume" },
  template: { type: String },
  profileimageurl: String,
  basics: {
    name: String,
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    rollno: String,
    summary: String,
  },
  sections: {
    education: [
      {
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: String,
        endDate: String,
        grade: String,
        description: String,
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        location: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    skills: [
      {
        name: String,
      },
    ],
    projects: [
      {
        name: String,
        description: String,
        link: String,
      },
    ],
    certifications: [
      {
        name: String,
        issuer: String,
        date: String,
      },
    ],
  },
  lastEdited: { type: Date, default: Date.now },
});

export const Resume = mongoose.model("Resume", resumeSchema);
