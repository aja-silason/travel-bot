/*
  Warnings:

  - You are about to drop the column `bi` on the `Schedule` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name_passanger" TEXT NOT NULL,
    "visa" TEXT NOT NULL,
    "time_travel" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Schedule" ("contact", "createdAt", "id", "name_passanger", "time_travel", "updatedAt", "visa") SELECT "contact", "createdAt", "id", "name_passanger", "time_travel", "updatedAt", "visa" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
