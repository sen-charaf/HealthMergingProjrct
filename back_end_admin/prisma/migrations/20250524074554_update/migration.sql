/*
  Warnings:

  - You are about to drop the column `type_document` on the `DocumentPatient` table. All the data in the column will be lost.
  - You are about to drop the column `allergies` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `antecedents_medicaux` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `cin_passeport` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `medicaments` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `pathologies_chroniques` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `ContactUrgence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_parametrage_id` to the `DocumentPatient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `DocumentPatient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Medecin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Patient_cin_passeport_key";

-- AlterTable
ALTER TABLE "ContactUrgence" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DocumentPatient" DROP COLUMN "type_document",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "document_parametrage_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Medecin" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "allergies",
DROP COLUMN "antecedents_medicaux",
DROP COLUMN "cin_passeport",
DROP COLUMN "medicaments",
DROP COLUMN "pathologies_chroniques",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dernier_visite" TIMESTAMP(3),
ADD COLUMN     "identifiant" TEXT,
ADD COLUMN     "priorite" TEXT,
ADD COLUMN     "service" TEXT,
ADD COLUMN     "statuts" TEXT,
ADD COLUMN     "type_identite_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "TypeIdentite" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TypeIdentite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentParametrage" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentParametrage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoriquePatient" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "attribut" TEXT NOT NULL,
    "ancienne_valeur" TEXT,
    "nouvelle_valeur" TEXT,
    "modifie_le" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifie_par" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistoriquePatient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Allergie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Allergie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientAllergie" (
    "patient_id" INTEGER NOT NULL,
    "allergie_id" INTEGER NOT NULL,

    CONSTRAINT "PatientAllergie_pkey" PRIMARY KEY ("patient_id","allergie_id")
);

-- CreateTable
CREATE TABLE "PathologieChronique" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PathologieChronique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientPathologie" (
    "patient_id" INTEGER NOT NULL,
    "pathologie_id" INTEGER NOT NULL,

    CONSTRAINT "PatientPathologie_pkey" PRIMARY KEY ("patient_id","pathologie_id")
);

-- CreateTable
CREATE TABLE "AntecedentMedical" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AntecedentMedical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientAntecedentMedical" (
    "patient_id" INTEGER NOT NULL,
    "antecedent_id" INTEGER NOT NULL,

    CONSTRAINT "PatientAntecedentMedical_pkey" PRIMARY KEY ("patient_id","antecedent_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeIdentite_nom_key" ON "TypeIdentite"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentParametrage_nom_key" ON "DocumentParametrage"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Allergie_nom_key" ON "Allergie"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "PathologieChronique_nom_key" ON "PathologieChronique"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "AntecedentMedical_nom_key" ON "AntecedentMedical"("nom");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_type_identite_id_fkey" FOREIGN KEY ("type_identite_id") REFERENCES "TypeIdentite"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentPatient" ADD CONSTRAINT "DocumentPatient_document_parametrage_id_fkey" FOREIGN KEY ("document_parametrage_id") REFERENCES "DocumentParametrage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriquePatient" ADD CONSTRAINT "HistoriquePatient_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientAllergie" ADD CONSTRAINT "PatientAllergie_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientAllergie" ADD CONSTRAINT "PatientAllergie_allergie_id_fkey" FOREIGN KEY ("allergie_id") REFERENCES "Allergie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientPathologie" ADD CONSTRAINT "PatientPathologie_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientPathologie" ADD CONSTRAINT "PatientPathologie_pathologie_id_fkey" FOREIGN KEY ("pathologie_id") REFERENCES "PathologieChronique"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientAntecedentMedical" ADD CONSTRAINT "PatientAntecedentMedical_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientAntecedentMedical" ADD CONSTRAINT "PatientAntecedentMedical_antecedent_id_fkey" FOREIGN KEY ("antecedent_id") REFERENCES "AntecedentMedical"("id") ON DELETE CASCADE ON UPDATE CASCADE;
