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
  small_image_url: string;
  large_image_url: string;
};

type TrailerImages = {
  image_url: string;
  small_image_url: string;
  medium_image_url: string;
  large_image_url: string;
  maximum_image_url: string;
};

type Title = {
  type: string;
  title: string;
};

type AiredDate = {
  day: number;
  month: number;
  year: number;
};

type Aired = {
  from: string;
  to: string;
  prop: {
    from: AiredDate;
    to: AiredDate;
  };
  string: string;
};

type Producer = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Licensor = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Studio = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Genre = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Theme = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type AnimeData = {
  mal_id: number;
  url: string;
  images: {
    jpg: ImageUrls;
    webp: ImageUrls;
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: TrailerImages;
  };
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: Producer[];
  licensors: Licensor[];
  studios: Studio[];
  genres: Genre[];
  explicit_genres: any[];
  themes: Theme[];
  demographics: Demographic[];
};

export type AnimeResponse = {
  pagination: Pagination;
  data: AnimeData[];
};

type Demographic = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};
