import mongoose from "mongoose";

const specialitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  icon: String,
  commonConditions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthCondition",
    },
  ],
});

export default mongoose.models.Speciality ||
mongoose.model("Speciality", specialitySchema);