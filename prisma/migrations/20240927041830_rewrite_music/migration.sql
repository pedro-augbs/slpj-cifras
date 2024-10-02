/*
  Warnings:

  - You are about to drop the column `scale` on the `Music` table. All the data in the column will be lost.
  - You are about to drop the column `tonality` on the `Music` table. All the data in the column will be lost.
  - Added the required column `key` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Music" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "letter" TEXT NOT NULL,
    "key" TEXT NOT NULL
);
INSERT INTO "new_Music" ("artist", "author", "bpm", "id", "letter", "name", "slug") SELECT "artist", "author", "bpm", "id", "letter", "name", "slug" FROM "Music";
DROP TABLE "Music";
ALTER TABLE "new_Music" RENAME TO "Music";
CREATE UNIQUE INDEX "Music_slug_key" ON "Music"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
