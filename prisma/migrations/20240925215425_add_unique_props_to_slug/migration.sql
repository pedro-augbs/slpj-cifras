-- CreateTable
CREATE TABLE "Music" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "letter" TEXT NOT NULL,
    "scale" TEXT NOT NULL,
    "tonality" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Music_slug_key" ON "Music"("slug");
