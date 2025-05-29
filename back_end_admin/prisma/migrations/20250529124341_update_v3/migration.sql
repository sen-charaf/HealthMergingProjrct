/*
  Warnings:

  - You are about to drop the column `mot_de_passe` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `nom_utilisateur` on the `Patient` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Patient_nom_utilisateur_key";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "mot_de_passe",
DROP COLUMN "nom_utilisateur";
