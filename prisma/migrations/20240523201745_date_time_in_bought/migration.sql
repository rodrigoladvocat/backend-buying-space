/*
  Warnings:

  - The primary key for the `Bought` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bought" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "createdAt"),
    CONSTRAINT "Bought_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bought" ("productName", "productPrice", "quantity", "userId") SELECT "productName", "productPrice", "quantity", "userId" FROM "Bought";
DROP TABLE "Bought";
ALTER TABLE "new_Bought" RENAME TO "Bought";
PRAGMA foreign_key_check("Bought");
PRAGMA foreign_keys=ON;
