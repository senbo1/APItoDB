import axios from 'axios';
import MangaResponse from './types/manga';

const fetchPage = async (page: number = 1) => {
  const res = await axios.get<MangaResponse>(
    `https://api.jikan.moe/v4/manga?page=${page}`
  );

  return res.data.data.map((manga) => {
    return {
      mal_id: manga.mal_id,
      mal_url: manga.url,
      small_image_url: manga.images.webp.small_image_url,
      large_image_url: manga.images.webp.large_image_url,
      approved: manga.approved,
      title: manga.title,
      title_english: manga.title_english,
      title_japanese: manga.title_japanese,
      type: manga.type,
      chapters: manga.chapters,
      volumes: manga.volumes,
      status: manga.status,
      publishing: manga.publishing,
      publishedFrom: manga.published.from,
      publishedTo: manga.published.to,
      publishedString: manga.published.string,
      mal_score: manga.score,
      mal_rank: manga.rank,
      mal_popularity: manga.popularity,
      synopsis: manga.synopsis,
      background: manga.background,
      authors: manga.authors.map((a) => {
        return {
          mal_id: a.mal_id,
          name: a.name,
          mal_url: a.url,
        };
      }),
      serializations: manga.serializations.map((s) => {
        return {
          mal_id: s.mal_id,
          name: s.name,
          mal_url: s.url,
        };
      }),
      genres: manga.genres.map((g) => {
        return {
          mal_id: g.mal_id,
          name: g.name,
          type: g.type,
          mal_url: g.url,
        };
      }),
      themes: manga.themes.map((t) => {
        return {
          mal_id: t.mal_id,
          name: t.name,
          type: t.type,
          mal_url: t.url,
        };
      }),
      demographics: manga.demographics.map((d) => {
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
