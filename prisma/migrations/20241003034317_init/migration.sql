-- CreateTable
CREATE TABLE "Music" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "letter" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Music_slug_key" ON "Music"("slug");
