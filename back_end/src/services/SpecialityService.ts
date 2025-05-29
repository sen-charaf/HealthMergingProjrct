import HealthCondition from "../models/HealthCondition";
import Speciality from "../models/Speciality";

export class SpecialityService {
  /**
   * Get recommended specialties for specific health conditions
   * @param conditionIds Array of health condition IDs
   * @returns Array of specialties with match information
   */
  async getSpecialistsForConditions(conditionIds: string[]) {
    // Find health conditions
    const healthConditions = await HealthCondition.find({
      _id: { $in: conditionIds },
    });

    // Extract all associated specialties
    const specialityNames = new Set<string>();
    healthConditions.forEach((condition) => {
      if (condition.specialties && condition.specialties.length > 0) {
        condition.specialties.forEach((spec: string) =>
          specialityNames.add(spec)
        );
      }
    });

    // Find specialties
    const specialties = await Speciality.find({
      name: { $in: Array.from(specialityNames) },
    });

    // Create recommendations array
    const recommendations = specialties.map((speciality) => {
      // Calculate how many conditions are treated by this specialty
      const matchedConditions = healthConditions.filter((condition) =>
        condition.specialties.includes(speciality.name)
      ).length;

      return {
        _id: speciality._id,
        name: speciality.name,
        description: speciality.description,
        icon: speciality.icon,
        matchedConditionsCount: matchedConditions,
        totalConditionsCount: conditionIds.length,
      };
    });

    // Sort by number of matched conditions (descending)
    recommendations.sort(
      (a, b) => b.matchedConditionsCount - a.matchedConditionsCount
    );

    return recommendations;
  }

  /**
   * Get all specialties
   * @returns Array of all specialties
   */
  async getAllSpecialties() {
    return await Speciality.find().sort({ name: 1 });
  }

  /**
   * Get a specialty by ID
   * @param id Specialty ID
   * @returns Specialty object
   */
  async getSpecialtyById(id: string) {
    return await Speciality.findById(id);
  }

  /**
   * Create a new specialty
   * @param specialtyData Object containing specialty data
   * @returns The created specialty
   */
  async createSpecialty(specialtyData: {
    name: string;
    description?: string;
    icon?: string;
    commonConditions?: string[];
  }) {
    // Check if specialty already exists
    const existingSpecialty = await Speciality.findOne({
      name: specialtyData.name,
    });
    if (existingSpecialty) {
      throw new Error("Specialty with this name already exists");
    }

    // Create new specialty
    const specialty = new Speciality({
      name: specialtyData.name,
      description: specialtyData.description,
      icon: specialtyData.icon,
      commonConditions: specialtyData.commonConditions || [],
    });

    return await specialty.save();
  }
}

export default new SpecialityService();
