import { PrismaClient } from '@prisma/client';
import animePageFetch from './animefetch';
import mangaPageFetch from './mangafetch';
import characterPageFetch from './characterfetch';
import axios from 'axios';
const prisma = new PrismaClient();

const main = async () => {
  const anime = await prisma.anime.findMany({
    select: {
      mal_id: true,
    },
    distinct: ['mal_id'],
  });
  fetchAndInsertCharacters();
};

const fetchAndInsertAnime = async () => {
  // fetch last page number
  const lastPage = await fetchlastPage('https://api.jikan.moe/v4/anime');

  // fetch all pages
  for (let i = 1; i <= lastPage; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await animePageFetch(i);

    for (const a of data) {
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
          mal_score: a.mal_score,
          mal_rank: a.mal_rank,
          mal_popularity: a.mal_popularity,
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
                  type: g.type,
                  mal_url: g.mal_url,
                },
              };
            }),
          },
          themes: {
            connectOrCreate: a.themes.map((t) => {
              return {
                where: { mal_id: t.mal_id },
                create: {
                  mal_id: t.mal_id,
                  name: t.name,
                  type: t.type,
                  mal_url: t.mal_url,
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
                  type: d.type,
                  mal_url: d.mal_url,
                },
              };
            }),
          },
        },
      });
      console.log(anime.title);
    }
  }
};

const fetchAndInsertManaga = async () => {
  // fetch last page number
  const lastPage = await fetchlastPage('https://api.jikan.moe/v4/manga');

  // fetch all pages
  for (let i = 1; i <= lastPage; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await mangaPageFetch(i);

    for (const m of data) {
      const manga = await prisma.manga.create({
        data: {
          mal_id: m.mal_id,
          mal_url: m.mal_url,
          small_image_url: m.small_image_url,
          large_image_url: m.large_image_url,
          approved: m.approved,
          title: m.title,
          title_english: m.title_english,
          title_japanese: m.title_japanese,
          type: m.type,
          chapters: m.chapters,
          volumes: m.volumes,
          status: m.status,
          publishing: m.publishing,
          publishedFrom: m.publishedFrom,
          publishedTo: m.publishedTo,
          publishedString: m.publishedString,
          mal_score: m.mal_score,
          mal_rank: m.mal_rank,
          mal_popularity: m.mal_popularity,
          synopsis: m.synopsis,
          background: m.background,
          authors: {
            connectOrCreate: m.authors.map((a) => {
              return {
                where: { mal_id: a.mal_id },
                create: {
                  mal_id: a.mal_id,
                  name: a.name,
                  mal_url: a.mal_url,
                },
              };
            }),
          },
          serializations: {
            connectOrCreate: m.serializations.map((s) => {
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
            connectOrCreate: m.genres.map((g) => {
              return {
                where: { mal_id: g.mal_id },
                create: {
                  mal_id: g.mal_id,
                  name: g.name,
                  type: g.type,
                  mal_url: g.mal_url,
                },
              };
            }),
          },
          themes: {
            connectOrCreate: m.themes.map((t) => {
              return {
                where: { mal_id: t.mal_id },
                create: {
                  mal_id: t.mal_id,
                  name: t.name,
                  type: t.type,
                  mal_url: t.mal_url,
                },
              };
            }),
          },
          demographics: {
            connectOrCreate: m.demographics.map((d) => {
              return {
                where: { mal_id: d.mal_id },
                create: {
                  mal_id: d.mal_id,
                  name: d.name,
                  type: d.type,
                  mal_url: d.mal_url,
                },
              };
            }),
          },
        },
      });
      console.log(manga.title);
    }
  }
};

const fetchAndInsertCharacters = async () => {
  // fetch last page number
  const lastPage = await fetchlastPage('https://api.jikan.moe/v4/characters');

  // fetch all pages
  for (let i = 6334; i <= lastPage; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = await characterPageFetch(i);

    await prisma.character.createMany({
      data,
      skipDuplicates: true,
    });

    console.log(`Page ${i} done`);
  }
};

const connectCharacterstoAnime = async () => {
  const anime = await prisma.anime.findMany({
    select: {
      mal_id: true,
    },
    distinct: ['mal_id'],
  });

  for (const a of anime) {
    
  }

};

const fetchlastPage = async (link: string) => {
  const res = await axios.get(link);
  return res.data.pagination.last_visible_page;
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
