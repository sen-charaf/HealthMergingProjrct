import mongoose from "mongoose";
import HealthCondition from "../models/HealthCondition";
import Speciality from "../models/Speciality";
import dotenv from "dotenv";

dotenv.config();

const seedHealthData = async () => {
  try {
    // Connexion à la base de données
    

    // Supprimer les données existantes
    await HealthCondition.deleteMany({});
    await Speciality.deleteMany({});
    console.log("Deleted existing data");

    // Créer les spécialités
    const specialties = await Speciality.insertMany([
      {
        name: "General Practitioner",
        description: "For common health issues and routine check-ups",
        icon: "stethoscope",
      },
      {
        name: "Cardiologist",
        description: "For heart and cardiovascular conditions",
        icon: "heart",
      },
      {
        name: "Psychological Care",
        description: "For mental health and emotional well-being",
        icon: "brain",
      },
      {
        name: "Dermatologist",
        description: "For skin conditions and treatments",
        icon: "skin",
      },
      {
        name: "Ophthalmologist",
        description: "For eye care and vision problems",
        icon: "eye",
      },
      {
        name: "Dentist",
        description: "For oral health and dental care",
        icon: "tooth",
      },
      {
        name: "Orthopedist",
        description: "For bone, joint, and muscle issues",
        icon: "bone",
      },
    ]);
    console.log(`Created ${specialties.length} specialties`);

    // Créer les conditions de santé
    const commonHealthIssues = [
      {
        name: "Fever & Flu",
        description: "Cold, cough, or seasonal flu symptoms",
        category: "Common Health Issues",
        icon: "thermometer",
        specialties: ["General Practitioner"],
      },
      {
        name: "Headache",
        description: "Recurring or severe headaches",
        category: "Common Health Issues",
        icon: "head-pain",
        specialties: ["General Practitioner", "Neurologist"],
      },
      {
        name: "Stomach Issues",
        description: "Digestive problems or abdominal pain",
        category: "Common Health Issues",
        icon: "stomach",
        specialties: ["General Practitioner", "Gastroenterologist"],
      },
      {
        name: "Allergies",
        description: "Seasonal allergies or reactions",
        category: "Common Health Issues",
        icon: "allergen",
        specialties: ["General Practitioner", "Allergist"],
      },
    ];

    const chronicConditions = [
      {
        name: "Diabetes",
        description: "Blood sugar monitoring and management",
        category: "Chronic Conditions",
        icon: "diabetes",
        specialties: ["General Practitioner", "Endocrinologist"],
      },
      {
        name: "Hypertension",
        description: "Blood pressure concerns",
        category: "Chronic Conditions",
        icon: "blood-pressure",
        specialties: ["General Practitioner", "Cardiologist"],
      },
      {
        name: "Heart Disease",
        description: "Cardiovascular health issues",
        category: "Chronic Conditions",
        icon: "heart",
        specialties: ["Cardiologist"],
      },
      {
        name: "Arthritis",
        description: "Joint pain and inflammation",
        category: "Chronic Conditions",
        icon: "joint",
        specialties: ["General Practitioner", "Rheumatologist", "Orthopedist"],
      },
    ];

    const mentalHealth = [
      {
        name: "Anxiety",
        description: "Feelings of worry, nervousness, or unease",
        category: "Mental Health",
        icon: "anxiety",
        specialties: ["Psychological Care"],
      },
      {
        name: "Depression",
        description: "Persistent feeling of sadness and loss of interest",
        category: "Mental Health",
        icon: "depression",
        specialties: ["Psychological Care"],
      },
      {
        name: "ADHD",
        description: "Attention and focus concerns",
        category: "Mental Health",
        icon: "attention",
        specialties: ["Psychological Care"],
      },
      {
        name: "Stress",
        description: "Difficulty coping with pressure or demands",
        category: "Mental Health",
        icon: "stress",
        specialties: ["Psychological Care"],
      },
    ];

    const specializedCare = [
      {
        name: "Skin Issues",
        description: "Rashes, acne, or other skin concerns",
        category: "Specialized Care",
        icon: "skin",
        specialties: ["Dermatologist"],
      },
      {
        name: "Vision Problems",
        description: "Blurred vision, eye pain, or other concerns",
        category: "Specialized Care",
        icon: "eye",
        specialties: ["Ophthalmologist"],
      },
      {
        name: "Dental Issues",
        description: "Tooth pain, gum disease, or dental concerns",
        category: "Specialized Care",
        icon: "tooth",
        specialties: ["Dentist"],
      },
      {
        name: "Physical Therapy",
        description: "Rehabilitation and movement",
        category: "Specialized Care",
        icon: "physical-therapy",
        specialties: ["Orthopedist", "Physical Therapist"],
      },
    ];

    const healthConditions = [
      ...commonHealthIssues,
      ...chronicConditions,
      ...mentalHealth,
      ...specializedCare,
    ];

    const createdConditions = await HealthCondition.insertMany(
      healthConditions
    );
    console.log(`Created ${createdConditions.length} health conditions`);

    // Mettre à jour les spécialités avec les conditions associées
    for (const condition of createdConditions) {
      for (const specialityName of condition.specialties) {
        await Speciality.updateOne(
          { name: specialityName },
          { $push: { commonConditions: condition._id } }
        );
      }
    }
    console.log("Updated specialties with associated conditions");

    console.log("Health data seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding health data:", error);
    process.exit(1);
  }
};

seedHealthData();
