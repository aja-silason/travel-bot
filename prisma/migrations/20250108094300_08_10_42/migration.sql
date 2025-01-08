/*
  Warnings:

  - Added the required column `bi` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name_passanger" TEXT NOT NULL,
    "bi" TEXT NOT NULL,
    "visa" TEXT NOT NULL,
    "time_travel" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Schedule" ("bi", "contact", "createdAt", "id", "name_passanger", "time_travel", "updatedAt", "visa") SELECT "bi", "contact", "createdAt", "id", "name_passanger", "time_travel", "updatedAt", "visa" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
