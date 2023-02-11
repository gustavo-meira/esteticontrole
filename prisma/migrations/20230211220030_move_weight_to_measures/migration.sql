/*
  Warnings:

  - You are about to drop the column `startingWeight` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Measures" ADD COLUMN "weight" REAL;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "drink" BOOLEAN NOT NULL,
    "smoke" BOOLEAN NOT NULL,
    "children" INTEGER,
    "sleep" TEXT NOT NULL,
    "feeding" TEXT NOT NULL,
    "drinkWater" REAL NOT NULL,
    "intestine" TEXT NOT NULL,
    "surgeries" TEXT,
    "illnesses" TEXT,
    "medicines" TEXT,
    "illnessesInFamily" TEXT,
    "mentalHealth" TEXT,
    "otherTreatments" TEXT,
    "indication" TEXT,
    "description" TEXT
);
INSERT INTO "new_Client" ("birthDate", "children", "description", "drink", "drinkWater", "feeding", "id", "illnesses", "illnessesInFamily", "indication", "intestine", "medicines", "mentalHealth", "name", "otherTreatments", "sleep", "smoke", "surgeries") SELECT "birthDate", "children", "description", "drink", "drinkWater", "feeding", "id", "illnesses", "illnessesInFamily", "indication", "intestine", "medicines", "mentalHealth", "name", "otherTreatments", "sleep", "smoke", "surgeries" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
