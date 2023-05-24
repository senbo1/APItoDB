-- CreateEnum
CREATE TYPE "Type" AS ENUM ('TV', 'Movie', 'OVA', 'ONA', 'Special');

-- CreateTable
CREATE TABLE "Anime" (
    "id" TEXT NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "mal_url" TEXT NOT NULL,
    "small_image_url" TEXT NOT NULL,
    "large_image_url" TEXT NOT NULL,
    "trailer_url" TEXT,
    "title" TEXT,
    "title_japanese" TEXT,
    "title_english" TEXT,
    "type" TEXT,
    "source" TEXT,
    "episodes" INTEGER,
    "status" TEXT,
    "airing" BOOLEAN,
    "airedFrom" TEXT,
    "airedTo" TEXT,
    "airedString" TEXT,
    "duration" TEXT,
    "rating" TEXT,
    "synposis" TEXT,
    "background" TEXT,
    "season" TEXT,
    "year" INTEGER,
    "broadcast" TEXT,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producer" (
    "id" TEXT NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "mal_url" TEXT NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Licensors" (
    "id" TEXT NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "mal_url" TEXT NOT NULL,

    CONSTRAINT "Licensors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" TEXT NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "mal_url" TEXT NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "mal_url" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demographic" (
    "id" TEXT NOT NULL,
    "mal_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "mal_url" TEXT NOT NULL,

    CONSTRAINT "Demographic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnimeToProducer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToLicensors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToStudio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AnimeToDemographic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Producer_mal_id_key" ON "Producer"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Producer_mal_url_key" ON "Producer"("mal_url");

-- CreateIndex
CREATE UNIQUE INDEX "Licensors_mal_id_key" ON "Licensors"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Licensors_mal_url_key" ON "Licensors"("mal_url");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_mal_id_key" ON "Studio"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Studio_mal_url_key" ON "Studio"("mal_url");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_mal_id_key" ON "Genre"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_mal_url_key" ON "Genre"("mal_url");

-- CreateIndex
CREATE UNIQUE INDEX "Demographic_mal_id_key" ON "Demographic"("mal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Demographic_mal_url_key" ON "Demographic"("mal_url");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToProducer_AB_unique" ON "_AnimeToProducer"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToProducer_B_index" ON "_AnimeToProducer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToLicensors_AB_unique" ON "_AnimeToLicensors"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToLicensors_B_index" ON "_AnimeToLicensors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToStudio_AB_unique" ON "_AnimeToStudio"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToStudio_B_index" ON "_AnimeToStudio"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToGenre_AB_unique" ON "_AnimeToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToGenre_B_index" ON "_AnimeToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AnimeToDemographic_AB_unique" ON "_AnimeToDemographic"("A", "B");

-- CreateIndex
CREATE INDEX "_AnimeToDemographic_B_index" ON "_AnimeToDemographic"("B");

-- AddForeignKey
ALTER TABLE "_AnimeToProducer" ADD CONSTRAINT "_AnimeToProducer_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToProducer" ADD CONSTRAINT "_AnimeToProducer_B_fkey" FOREIGN KEY ("B") REFERENCES "Producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToLicensors" ADD CONSTRAINT "_AnimeToLicensors_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToLicensors" ADD CONSTRAINT "_AnimeToLicensors_B_fkey" FOREIGN KEY ("B") REFERENCES "Licensors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToStudio" ADD CONSTRAINT "_AnimeToStudio_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToStudio" ADD CONSTRAINT "_AnimeToStudio_B_fkey" FOREIGN KEY ("B") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToGenre" ADD CONSTRAINT "_AnimeToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToDemographic" ADD CONSTRAINT "_AnimeToDemographic_A_fkey" FOREIGN KEY ("A") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnimeToDemographic" ADD CONSTRAINT "_AnimeToDemographic_B_fkey" FOREIGN KEY ("B") REFERENCES "Demographic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
