type JikanResponse = {
  pagination: Pagination;
  data: Manga[];
};

type Manga = {
  mal_id: number;
  url: string;
  images: {
    jpg: Image;
    webp: Image;
  };
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  chapters: number | null;
  volumes: number | null;
  status: string;
  publishing: boolean;
  published: Published;
  score: number;
  scored: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: Author[];
  serializations: Serialization[];
  genres: Genre[];
  explicit_genres: any[];
  themes: Theme[];
  demographics: Demographic[];
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

type Image = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

type Title = {
  type: string;
  title: string;
};

type Published = {
  from: string;
  to: string | null;
  prop: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number | null;
      month: number | null;
      year: number | null;
    };
  };
  string: string;
};

type Author = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type Serialization = {
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

type Demographic = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export default JikanResponse;
