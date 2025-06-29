import { Resume } from "../models/model.js";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

const getUserResumes = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumes = await Resume.find({ userId });
    console.log("Resumes for GET", resumes);

    res.status(200).json(resumes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch resumes", error: error.message });
  }
};

const getResumeById = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const id = req.params.id;
    console.log("Get Resume By Id");

    console.log(id, userId);

    const resume = await Resume.findOne({ _id: id, userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    console.log("Get Resume Id", resume);

    res.status(200).json({ data: resume });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch resume", error: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const id = req.params.id;
    console.log(id, userId);

    console.log("inside update resume");

    const resume = await Resume.findOne({ _id: id, userId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    Object.assign(resume, req.body);
    const updatedResume = await resume.save();

    res
      .status(200)
      .json({ message: "Resume updated successfully", resume: updatedResume });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update resume", error: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const id = req.params.id;

    const deletedResume = await Resume.findOneAndDelete({ _id: id, userId });

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete resume", error: error.message });
  }
};

const createResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    console.log("userId", userId);
    console.log(req.body);

    const newResume = await Resume.create({
      ...req.body,
      userId,
    });

    res
      .status(201)
      .json({ message: "Resume created successfully", data: newResume });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create resume", error: error.message });
  }
};

const uploadImage = async (req, res) => {
  try {
    const file = req.files?.avatar?.[0];
    if (!file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const result = await uploadBufferToCloudinary(
      file.buffer,
      file.originalname
    );

    console.log("Result", result.url);

    return res.status(200).json({ imageUrl: result.url });
  } catch (error) {
    console.error("Image upload failed:", error.message);
    return res.status(500).json({ error: "Failed to upload image" });
  }
};

export {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
  uploadImage,
};
