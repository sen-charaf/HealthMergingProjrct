-- CreateTable
CREATE TABLE "Medecin" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "specialite" TEXT,

    CONSTRAINT "Medecin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "date_naissance" TIMESTAMP(3) NOT NULL,
    "sexe" TEXT NOT NULL,
    "cin_passeport" TEXT,
    "photo_profil" TEXT,
    "telephone" TEXT,
    "email" TEXT,
    "adresse" TEXT,
    "nom_utilisateur" TEXT,
    "mot_de_passe" TEXT,
    "groupe_sanguin" TEXT,
    "niveau_autonomie" TEXT,
    "antecedents_medicaux" TEXT,
    "pathologies_chroniques" TEXT,
    "allergies" TEXT,
    "medicaments" TEXT,
    "taille_cm" INTEGER,
    "poids_kg" INTEGER,
    "statut_tabac" TEXT,
    "consommation_alcool" TEXT,
    "assurance" TEXT,
    "numero_police" TEXT,
    "numero_dossier" TEXT,
    "medecin_id" INTEGER,
    "etat_civil" TEXT,
    "profession" TEXT,
    "langue_preferee" TEXT,
    "consentement" BOOLEAN NOT NULL DEFAULT false,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactUrgence" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "nom_complet" TEXT NOT NULL,
    "relation" TEXT,
    "telephone" TEXT NOT NULL,

    CONSTRAINT "ContactUrgence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentPatient" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "nom_fichier" TEXT,
    "url" TEXT,
    "type_document" TEXT,
    "date_upload" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentPatient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_cin_passeport_key" ON "Patient"("cin_passeport");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_nom_utilisateur_key" ON "Patient"("nom_utilisateur");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_numero_dossier_key" ON "Patient"("numero_dossier");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_medecin_id_fkey" FOREIGN KEY ("medecin_id") REFERENCES "Medecin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactUrgence" ADD CONSTRAINT "ContactUrgence_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentPatient" ADD CONSTRAINT "DocumentPatient_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
