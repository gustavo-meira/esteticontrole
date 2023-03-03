-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientName" TEXT NOT NULL,
    "treatment" TEXT,
    "notes" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL
);
