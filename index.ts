import { PrismaClient } from '@prisma/client';
import { AnimeResponse } from './anime';
import axios from 'axios';
const prisma = new PrismaClient();

async function main() {
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
          producers: {
            connectOrCreate: a.producers.map((p) => {
              return {
                where: { mal_id: p.mal_id },
                create: {
                  mal_id: p.mal_id,
                  name: p.name,
                  mal_url: p.mal_url,
                },
              };
            }),
          },
          licensors: {
            connectOrCreate: a.licensors.map((l) => {
              return {
                where: { mal_id: l.mal_id },
                create: {
                  mal_id: l.mal_id,
                  name: l.name,
                  mal_url: l.mal_url,
                },
              };
            }),
          },
          studios: {
            connectOrCreate: a.studios.map((s) => {
              return {
                where: { mal_id: s.mal_id },
                create: {
                  mal_id: s.mal_id,
                  name: s.name,
                  mal_url: s.mal_url,
                },
              };
            }),
          },
          genres: {
            connectOrCreate: a.genres.map((g) => {
              return {
                where: { mal_id: g.mal_id },
                create: {
                  mal_id: g.mal_id,
                  name: g.name,
                  mal_url: g.mal_url,
                },
              };
            }),
          },
          demographics: {
            connectOrCreate: a.demographics.map((d) => {
              return {
                where: { mal_id: d.mal_id },
                create: {
                  mal_id: d.mal_id,
                  name: d.name,
                  mal_url: d.mal_url,
                },
              };
            }),
          },
        },
      });
      console.log(anime);
    });
  }
}

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
      producers: anime.producers.map((p) => {
        return {
          mal_id: p.mal_id,
          name: p.name,
          mal_url: p.url,
        };
      }),
      licensors: anime.licensors.map((l) => {
        return {
          mal_id: l.mal_id,
          name: l.name,
          mal_url: l.url,
        };
      }),
      studios: anime.studios.map((s) => {
        return {
          mal_id: s.mal_id,
          name: s.name,
          mal_url: s.url,
        };
      }),
      genres: anime.genres.map((g) => {
        return {
          mal_id: g.mal_id,
          name: g.name,
          mal_url: g.url,
        };
      }),
      demographics: anime.demographics.map((d) => {
        return {
          mal_id: d.mal_id,
          name: d.name,
          mal_url: d.url,
        };
      }),
    };
  });
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
