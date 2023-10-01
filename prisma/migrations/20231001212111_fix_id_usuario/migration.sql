-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercicios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" TEXT NOT NULL,
    "id_exercicio" INTEGER NOT NULL,
    "treino" INTEGER NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Exercicios" ("data", "id", "id_exercicio", "id_usuario", "treino") SELECT "data", "id", "id_exercicio", "id_usuario", "treino" FROM "Exercicios";
DROP TABLE "Exercicios";
ALTER TABLE "new_Exercicios" RENAME TO "Exercicios";
CREATE INDEX "Exercicios_id_usuario_idx" ON "Exercicios"("id_usuario");
CREATE TABLE "new_Alimentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" TEXT NOT NULL,
    "id_alimento" INTEGER NOT NULL,
    "calorias" INTEGER NOT NULL
);
INSERT INTO "new_Alimentos" ("calorias", "id", "id_alimento", "id_usuario") SELECT "calorias", "id", "id_alimento", "id_usuario" FROM "Alimentos";
DROP TABLE "Alimentos";
ALTER TABLE "new_Alimentos" RENAME TO "Alimentos";
CREATE INDEX "Alimentos_id_usuario_idx" ON "Alimentos"("id_usuario");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
