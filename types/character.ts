type JikanResponse = {
  pagination: Pagination;
  data: Character[];
};

type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
};

type ImageUrls = {
  image_url: string;
  small_image_url?: string;
};

type Character = {
  mal_id: number;
  url: string;
  images: {
    jpg: ImageUrls;
    webp: ImageUrls;
  };
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
};

export default JikanResponse;
