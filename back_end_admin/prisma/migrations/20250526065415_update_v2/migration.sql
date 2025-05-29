/*
  Warnings:

  - You are about to drop the column `nom` on the `Allergie` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `AntecedentMedical` table. All the data in the column will be lost.
  - You are about to drop the column `document_parametrage_id` on the `DocumentPatient` table. All the data in the column will be lost.
  - You are about to drop the column `assurance` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `date_creation` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `medecin_id` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `numero_dossier` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `numero_police` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `type_identite_id` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `DocumentParametrage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PathologieChronique` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientAllergie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientAntecedentMedical` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PatientPathologie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[patient_id,allergie]` on the table `Allergie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `allergie` to the `Allergie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `Allergie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `antecedent` to the `AntecedentMedical` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `AntecedentMedical` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `DocumentPatient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_identifiant` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Made the column `identifiant` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DocumentPatient" DROP CONSTRAINT "DocumentPatient_document_parametrage_id_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_medecin_id_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_type_identite_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientAllergie" DROP CONSTRAINT "PatientAllergie_allergie_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientAllergie" DROP CONSTRAINT "PatientAllergie_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientAntecedentMedical" DROP CONSTRAINT "PatientAntecedentMedical_antecedent_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientAntecedentMedical" DROP CONSTRAINT "PatientAntecedentMedical_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientPathologie" DROP CONSTRAINT "PatientPathologie_pathologie_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientPathologie" DROP CONSTRAINT "PatientPathologie_patient_id_fkey";

-- DropIndex
DROP INDEX "Allergie_nom_key";

-- DropIndex
DROP INDEX "AntecedentMedical_nom_key";

-- DropIndex
DROP INDEX "Patient_numero_dossier_key";

-- AlterTable
ALTER TABLE "Allergie" DROP COLUMN "nom",
ADD COLUMN     "allergie" TEXT NOT NULL,
ADD COLUMN     "patient_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AntecedentMedical" DROP COLUMN "nom",
ADD COLUMN     "antecedant_date" TIMESTAMP(3),
ADD COLUMN     "antecedent" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "document1" TEXT,
ADD COLUMN     "document2" TEXT,
ADD COLUMN     "document3" TEXT,
ADD COLUMN     "document4" TEXT,
ADD COLUMN     "document5" TEXT,
ADD COLUMN     "patient_id" INTEGER NOT NULL,
ADD COLUMN     "specialty" TEXT;

-- AlterTable
ALTER TABLE "DocumentPatient" DROP COLUMN "document_parametrage_id",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "assurance",
DROP COLUMN "date_creation",
DROP COLUMN "medecin_id",
DROP COLUMN "numero_dossier",
DROP COLUMN "numero_police",
DROP COLUMN "type_identite_id",
ADD COLUMN     "medecinId" INTEGER,
ADD COLUMN     "type_identifiant" TEXT NOT NULL,
ALTER COLUMN "identifiant" SET NOT NULL;

-- DropTable
DROP TABLE "DocumentParametrage";

-- DropTable
DROP TABLE "PathologieChronique";

-- DropTable
DROP TABLE "PatientAllergie";

-- DropTable
DROP TABLE "PatientAntecedentMedical";

-- DropTable
DROP TABLE "PatientPathologie";

-- CreateTable
CREATE TABLE "DocumentParams" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentParams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllergieParams" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AllergieParams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PathologieParams" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PathologieParams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pathologie" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "pathologie" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pathologie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AntecedentParams" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AntecedentParams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assurance" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "assurance" TEXT NOT NULL,
    "numero_police" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authentification" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "nom_utilisateur" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Authentification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentParams_nom_key" ON "DocumentParams"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "AllergieParams_nom_key" ON "AllergieParams"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "PathologieParams_nom_key" ON "PathologieParams"("nom");

-- CreateIndex
CREATE INDEX "Pathologie_patient_id_idx" ON "Pathologie"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pathologie_patient_id_pathologie_key" ON "Pathologie"("patient_id", "pathologie");

-- CreateIndex
CREATE UNIQUE INDEX "AntecedentParams_nom_key" ON "AntecedentParams"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Authentification_patient_id_key" ON "Authentification"("patient_id");

-- CreateIndex
CREATE INDEX "Allergie_patient_id_idx" ON "Allergie"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "Allergie_patient_id_allergie_key" ON "Allergie"("patient_id", "allergie");

-- CreateIndex
CREATE INDEX "AntecedentMedical_patient_id_idx" ON "AntecedentMedical"("patient_id");

-- CreateIndex
CREATE INDEX "DocumentPatient_patient_id_idx" ON "DocumentPatient"("patient_id");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_medecinId_fkey" FOREIGN KEY ("medecinId") REFERENCES "Medecin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergie" ADD CONSTRAINT "Allergie_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pathologie" ADD CONSTRAINT "Pathologie_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AntecedentMedical" ADD CONSTRAINT "AntecedentMedical_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assurance" ADD CONSTRAINT "Assurance_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authentification" ADD CONSTRAINT "Authentification_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
