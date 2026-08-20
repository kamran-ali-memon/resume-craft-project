import Resume from "../models/Resume.js";

const emptyResume = {
  personal: {
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    github: "",
    linkedin: ""
  },
  summary: "",
  skills: [],
  languages: [],
  education: [],
  experience: [],
  projects: []
};

export async function getResumes(req, res) {
  const resumes = await Resume.find({ user: req.userId }).sort({
    updatedAt: -1
  });

  res.json({ success: true, resumes });
}

export async function getResume(req, res) {
  const resume = await Resume.findOne({
    _id: req.params.id,
    user: req.userId
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found"
    });
  }

  res.json({ success: true, resume });
}

export async function createResume(req, res) {
  const title = req.body.title?.trim() || "My Resume";

  const resume = await Resume.create({
    ...emptyResume,
    ...req.body,
    title,
    user: req.userId
  });

  res.status(201).json({ success: true, resume });
}

export async function updateResume(req, res) {
  const resume = await Resume.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found"
    });
  }

  res.json({ success: true, resume });
}

export async function deleteResume(req, res) {
  const resume = await Resume.findOneAndDelete({
    _id: req.params.id,
    user: req.userId
  });

  if (!resume) {
    return res.status(404).json({
      success: false,
      message: "Resume not found"
    });
  }

  res.json({
    success: true,
    message: "Resume deleted"
  });
}
