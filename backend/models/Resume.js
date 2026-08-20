import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    organization: { type: String, default: "" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    link: { type: String, default: "" }
  },
  { _id: true }
);

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    technologies: { type: String, default: "" },
    link: { type: String, default: "" }
  },
  { _id: true }
);

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    personal: {
      name: { type: String, default: "" },
      role: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      website: { type: String, default: "" },
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" }
    },
    summary: { type: String, default: "" },
    skills: [{ type: String }],
    languages: [{ type: String }],
    education: [itemSchema],
    experience: [itemSchema],
    projects: [projectSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
