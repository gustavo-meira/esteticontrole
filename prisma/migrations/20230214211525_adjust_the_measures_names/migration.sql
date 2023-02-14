/*
  Warnings:

  - You are about to drop the column `chest` on the `Measures` table. All the data in the column will be lost.
  - You are about to drop the column `hips` on the `Measures` table. All the data in the column will be lost.
  - You are about to drop the column `leftCalf` on the `Measures` table. All the data in the column will be lost.
  - You are about to drop the column `rightCalf` on the `Measures` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Measures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "measuredDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rightArm" REAL,
    "leftArm" REAL,
    "upperAbdomen" REAL,
    "lowerAbdomen" REAL,
    "waist" REAL,
    "butt" REAL,
    "rightThigh" REAL,
    "leftThigh" REAL,
    "rightKnee" REAL,
    "leftKnee" REAL,
    "height" REAL,
    "weight" REAL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "Measures_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Measures" ("butt", "clientId", "height", "id", "leftArm", "leftThigh", "measuredDate", "rightArm", "rightThigh", "waist", "weight") SELECT "butt", "clientId", "height", "id", "leftArm", "leftThigh", "measuredDate", "rightArm", "rightThigh", "waist", "weight" FROM "Measures";
DROP TABLE "Measures";
ALTER TABLE "new_Measures" RENAME TO "Measures";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
