/*
  Warnings:

  - You are about to drop the column `calorias` on the `Alimentos` table. All the data in the column will be lost.
  - Added the required column `peso` to the `Alimentos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alimentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" TEXT NOT NULL,
    "id_alimento" INTEGER NOT NULL,
    "peso" INTEGER NOT NULL
);
INSERT INTO "new_Alimentos" ("id", "id_alimento", "id_usuario") SELECT "id", "id_alimento", "id_usuario" FROM "Alimentos";
DROP TABLE "Alimentos";
ALTER TABLE "new_Alimentos" RENAME TO "Alimentos";
CREATE INDEX "Alimentos_id_usuario_idx" ON "Alimentos"("id_usuario");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
