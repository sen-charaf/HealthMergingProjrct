import Doctor from "../models/Doctor.js";
import { BaseService } from "./BaseService.js";

export class DoctorService extends BaseService<any> {
  constructor() {
    super(Doctor);
  }

  async findByUserId(userId: string): Promise<any | null> {
    try {
      return await Doctor.findOne({ user: userId }).exec();
    } catch (error) {
      throw error;
    }
  }

  async findBySpeciality(
    speciality: string,
    populate?: string | string[]
  ): Promise<any[]> {
    try {
      let query = Doctor.find({ speciality: speciality });

      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach((field) => {
            query = query.populate(field);
          });
        } else {
          query = query.populate(populate);
        }
      }

      return await query.exec();
    } catch (error) {
      throw error;
    }
  }

  async updateDoctorProfile(userId: string, doctorData: any): Promise<any> {
    try {
      const doctor = await this.findByUserId(userId);

      if (!doctor) {
        throw new Error("Doctor profile not found");
      }

      // Update doctor profile
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        doctor._id,
        {
          status: "Pending",
          speciality: doctorData.speciality,
          professionalLicenseNumber: doctorData.professionalLicenseNumber,
          biography: doctorData.biography,
          education: doctorData.education,
          experience: doctorData.experience,
          languages: doctorData.languages,
          consultationFee: doctorData.consultationFee,
          availabilitySchedule: doctorData.availabilitySchedule,
        },
        { new: true }
      ).populate("user");

      return updatedDoctor;
    } catch (error) {
      throw error;
    }
  }

  async getDoctorWithUser(userId: string): Promise<any> {
    try {
      const doctor = await Doctor.findOne({ user: userId })
        .populate("user")
        .exec();

      if (!doctor) {
        throw new Error("Doctor profile not found");
      }

      return doctor;
    } catch (error) {
      throw error;
    }
  }
}

export default new DoctorService();
