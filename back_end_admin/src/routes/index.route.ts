import express from 'express';
import patientRoutes from './patients.route';
import medecinRoutes from './medecins.route';
import contactUrgenceRoutes from './contactsUrgence.route';
import documentPatientRoutes from './documentsPatient.route';
import documentParametrageRoutes from './documentsParams.route';
import typeIdentiteRoutes from './typesIdentite.routes';
import historiquePatientRoutes from './historiquesPatient.route';
import allergieRoutes from './allergies.route';
import antecedentRoutes from './antecedents.route';
import pathologieRoutes from './pathologies.route';
import allergieParamsRoutes from './allergie-params.routes';
import antecedentParamsRoutes from './antecedent-params.routes';
import pathologieParamsRoutes from './pathologie-params.routes';

const router = express.Router();

// Register routes
router.use('/patients', patientRoutes);
router.use('/medecins', medecinRoutes);
router.use('/contacts-urgence', contactUrgenceRoutes);
router.use('/documents', documentPatientRoutes);
router.use('/documents-params', documentParametrageRoutes);
router.use('/types-identite', typeIdentiteRoutes);
router.use('/historiques', historiquePatientRoutes);
router.use('/allergies', allergieRoutes);
router.use('/antecedents', antecedentRoutes);
router.use('/pathologies', pathologieRoutes);
router.use('/allergie-params', allergieParamsRoutes);
router.use('/antecedent-params', antecedentParamsRoutes);
router.use('/pathologie-params', pathologieParamsRoutes);

export default router;