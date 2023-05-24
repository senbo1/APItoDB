import { PrismaClient } from '@prisma/client';
import { AnimeResponse } from './types';
import axios from 'axios';
const prisma = new PrismaClient();

async function fetchPage(page: number = 1) {
  const res = await axios.get<AnimeResponse>(
    `https://api.jikan.moe/v4/anime?page=${page}`
  );

  return res.data.data.map((anime) => {
    return {
      mal_id: anime.mal_id,
      mal_url: anime.url,
      small_image_url: anime.images.webp.small_image_url,
      large_image_url: anime.images.webp.large_image_url,
      trailer_url: anime.url,
      title: anime.title,
      title_japanese: anime.title_japanese,
      title_english: anime.title_english,
      type: anime.type,
      source: anime.source,
      episodes: anime.episodes,
      status: anime.status,
      airing: anime.airing,
      airedFrom: anime.aired.from,
      airedTo: anime.aired.to,
      airedString: anime.aired.string,
      duration: anime.duration,
      rating: anime.rating,
      synposis: anime.synopsis,
      background: anime.background,
      season: anime.season,
      year: anime.year,
      broadcast: anime.broadcast.string,
    };
  });
}

async function main() {
  await prisma.anime.deleteMany({});

  // fetch last page number
  const res = await axios.get('https://api.jikan.moe/v4/anime');
  const pagination = res.data.pagination.last_visible_page;

  // fetch all pages
  for (let i = 1; i <= pagination; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

      const data = await fetchPage(i);

      data.map(async (a) => {
        const anime = await prisma.anime.create({
          data: {
            mal_id: a.mal_id,
            mal_url: a.mal_url,
            small_image_url: a.small_image_url,
            large_image_url: a.large_image_url,
            trailer_url: a.trailer_url,
            title: a.title,
            title_english: a.title_english,
            title_japanese: a.title_japanese,
            type: a.type,
            source: a.source,
            episodes: a.episodes,
            status: a.status,
            airing: a.airing,
            airedFrom: a.airedFrom,
            airedTo: a.airedTo,
            airedString: a.airedString,
            duration: a.duration,
            rating: a.rating,
            synposis: a.synposis,
            background: a.background,
            season: a.season,
            year: a.year,
            broadcast: a.broadcast,
          },
        });
      });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
