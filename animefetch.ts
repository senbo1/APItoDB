import axios from 'axios';
import AnimeResponse from './types/anime';

const fetchPage = async (page: number = 1) => {
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
      mal_score: anime.score,
      mal_rank: anime.rank,
      mal_popularity: anime.popularity,
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
          type: g.type,
          mal_url: g.url,
        };
      }),
      themes: anime.themes.map((t) => {
        return {
          mal_id: t.mal_id,
          name: t.name,
          type: t.type,
          mal_url: t.url,
        };
      }),
      demographics: anime.demographics.map((d) => {
        return {
          mal_id: d.mal_id,
          name: d.name,
          type: d.type,
          mal_url: d.url,
        };
      }),
    };
  });
};

export default fetchPage;
