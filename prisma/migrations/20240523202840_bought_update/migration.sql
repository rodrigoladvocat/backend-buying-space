/*
  Warnings:

  - The primary key for the `Bought` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Bought` table. All the data in the column will be lost.
  - Added the required column `buyId` to the `Bought` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bought" (
    "buyId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    CONSTRAINT "Bought_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bought" ("productName", "productPrice", "quantity", "userId") SELECT "productName", "productPrice", "quantity", "userId" FROM "Bought";
DROP TABLE "Bought";
ALTER TABLE "new_Bought" RENAME TO "Bought";
PRAGMA foreign_key_check("Bought");
PRAGMA foreign_keys=ON;
