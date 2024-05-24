/*
  Warnings:

  - Added the required column `totalPrice` to the `BoughtItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BoughtItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "BoughtItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BoughtItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BoughtItem" ("id", "productId", "quantity", "userId") SELECT "id", "productId", "quantity", "userId" FROM "BoughtItem";
DROP TABLE "BoughtItem";
ALTER TABLE "new_BoughtItem" RENAME TO "BoughtItem";
PRAGMA foreign_key_check("BoughtItem");
PRAGMA foreign_keys=ON;
