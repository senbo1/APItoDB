import axios from 'axios';
import CharacterResponse from './types/character';

const fetchPage = async (page: number) => {
  const res = await axios.get<CharacterResponse>(
    `https://api.jikan.moe/v4/characters?page=${page}`
  );

  return res.data.data.map((character) => {
    return {
      mal_id: character.mal_id,
      mal_url: character.url,
      image_url: character.images.webp.image_url,
      name: character.name,
      name_kanji: character.name_kanji,
      about: character.about,
      favorites: character.favorites,
    };
  });
};

export default fetchPage;
