import { PrismaClient } from '@prisma/client';
import { ICreatePatientDto, IUpdatePatientDto, IPatientWithRelations } from '../models/patient.model';

const prisma = new PrismaClient();

// Find all patients
export const findAll = async (): Promise<IPatientWithRelations[]> => {
  return prisma.patient.findMany({
    include: {
      medecin: true,
      contacts_urgence: true,
      documents_patient: true,
      allergies: true,
      pathologies: true,
      antecedents: true
    }
  }) as unknown as IPatientWithRelations[];
};

// Find patient by ID
export const findById = async (id: number): Promise<IPatientWithRelations | null> => {
  return prisma.patient.findUnique({
    where: { id },
    include: {
      medecin: true,
      contacts_urgence: true,
      documents_patient: true,
      allergies: true,
      pathologies: true,
      antecedents: true
    }
  }) as unknown as IPatientWithRelations | null;
};

// Create new patient
export const create = async (data: ICreatePatientDto): Promise<IPatientWithRelations> => {
  const { 
    contacts_urgence, 
    documents_patient, // Correctly destructured
    allergies, 
    pathologies, 
    antecedents,
    assurances,
    credentials,
    ...patientData 
  } = data;
  
  return prisma.patient.create({
    data: {
      ...patientData,
      contacts_urgence: contacts_urgence ? {
        create: contacts_urgence
      } : undefined,
      
      documents_patient: documents_patient && documents_patient.length > 0 ? { // Fixed reference
        create: documents_patient
      } : undefined,
      
      allergies: allergies && allergies.length > 0 ? {
        create: allergies.map(nom => ({ allergie: nom }))
      } : undefined,
      
      pathologies: pathologies && pathologies.length > 0 ? {
        create: pathologies.map(nom => ({ pathologie: nom }))
      } : undefined,
      
      antecedents: antecedents && antecedents.length > 0 ? {
        create: antecedents.map(item => ({
          antecedent: item.antecedent,
          description: item.description,
          specialty: item.specialty,
          antecedant_date: item.antecedant_date,
          document1: item.document1,
          document2: item.document2,
          document3: item.document3,
          document4: item.document4,
          document5: item.document5
        }))
      } : undefined,
      
      assurances: assurances && assurances.length > 0 ? {
        create: assurances
      } : undefined,
      
      credentials: credentials ? {
        create: {
          nom_utilisateur: credentials.nom_utilisateur,
          mot_de_passe: credentials.mot_de_passe
        }
      } : undefined
    },
    include: {
      medecin: true,
      contacts_urgence: true,
      documents_patient: true,
      allergies: true,
      pathologies: true,
      antecedents: true,
      assurances: true,
      credentials: true
    }
  }) as unknown as IPatientWithRelations;
};

// Update patient
export const update = async (id: number, data: IUpdatePatientDto): Promise<IPatientWithRelations> => {
  const { 
    contacts_urgence, 
    documents_patient, // Changed from documents to documents_patient
    allergies, 
    pathologies, 
    antecedents,
    assurances,
    credentials,
    ...patientData 
  } = data;
  
  // First, delete existing related records if needed
  if (contacts_urgence) {
    await prisma.contactUrgence.deleteMany({
      where: { patient_id: id }
    });
  }
  
  if (documents_patient && documents_patient.length > 0) { // Fixed reference
    await prisma.documentPatient.deleteMany({
      where: { patient_id: id }
    });
  }
  
  if (allergies && allergies.length > 0) {
    await prisma.allergie.deleteMany({
      where: { patient_id: id }
    });
  }
  
  if (pathologies && pathologies.length > 0) {
    await prisma.pathologie.deleteMany({
      where: { patient_id: id }
    });
  }
  
  if (antecedents && antecedents.length > 0) {
    await prisma.antecedentMedical.deleteMany({
      where: { patient_id: id }
    });
  }
  
  if (assurances && assurances.length > 0) {
    await prisma.assurance.deleteMany({
      where: { patient_id: id }
    });
  }
  
  // Then update the patient with new related records
  return prisma.patient.update({
    where: { id },
    data: {
      ...patientData,
      contacts_urgence: contacts_urgence ? {
        create: contacts_urgence
      } : undefined,
      
      documents_patient: documents_patient && documents_patient.length > 0 ? { // Fixed reference
        create: documents_patient
      } : undefined,
      
      allergies: allergies && allergies.length > 0 ? {
        create: allergies.map(nom => ({ allergie: nom }))
      } : undefined,
      
      pathologies: pathologies && pathologies.length > 0 ? {
        create: pathologies.map(nom => ({ pathologie: nom }))
      } : undefined,
      
      antecedents: antecedents && antecedents.length > 0 ? {
        create: antecedents.map(item => ({
          antecedent: item.antecedent,
          description: item.description,
          specialty: item.specialty,
          antecedant_date: item.antecedant_date,
          document1: item.document1,
          document2: item.document2,
          document3: item.document3,
          document4: item.document4,
          document5: item.document5
        }))
      } : undefined,
      
      assurances: assurances && assurances.length > 0 ? {
        create: assurances
      } : undefined,
      
      credentials: credentials ? {
        upsert: {
          create: {
            nom_utilisateur: credentials.nom_utilisateur,
            mot_de_passe: credentials.mot_de_passe
          },
          update: {
            nom_utilisateur: credentials.nom_utilisateur,
            mot_de_passe: credentials.mot_de_passe
          }
        }
      } : undefined
    },
    include: {
      medecin: true,
      contacts_urgence: true,
      documents_patient: true,
      allergies: true,
      pathologies: true,
      antecedents: true,
      assurances: true,
      credentials: true
    }
  }) as unknown as IPatientWithRelations;
};

// Delete patient
export const remove = async (id: number): Promise<void> => {
  await prisma.patient.delete({
    where: { id }
  });
};