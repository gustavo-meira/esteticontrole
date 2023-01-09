-- CreateTable
CREATE TABLE "Measures" (
    "id" TEXT NOT NULL PRIMARY KEY,
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

-- CreateTable
CREATE TABLE "Client" (
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
    "startingWeight" REAL
);

-- CreateIndex
CREATE UNIQUE INDEX "Measures_clientId_key" ON "Measures"("clientId");
