-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Measures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "measuredDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rightArm" REAL,
    "leftArm" REAL,
    "chest" REAL,
    "waist" REAL,
    "hips" REAL,
    "butt" REAL,
    "rightThigh" REAL,
    "leftThigh" REAL,
    "rightCalf" REAL,
    "leftCalf" REAL,
    "height" REAL,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "Measures_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Measures" ("butt", "chest", "clientId", "height", "hips", "id", "leftArm", "leftCalf", "leftThigh", "rightArm", "rightCalf", "rightThigh", "waist") SELECT "butt", "chest", "clientId", "height", "hips", "id", "leftArm", "leftCalf", "leftThigh", "rightArm", "rightCalf", "rightThigh", "waist" FROM "Measures";
DROP TABLE "Measures";
ALTER TABLE "new_Measures" RENAME TO "Measures";
CREATE UNIQUE INDEX "Measures_clientId_key" ON "Measures"("clientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
