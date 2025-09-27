// TypeScript interfaces for movie API responses
export interface ImageData {
  url: string;
  width: number;
  height: number;
  type: string;
}

export interface DateData {
  year: number;
  month: number;
  day: number;
}

export interface MeterRanking {
  currentRank: number;
  changeDirection: string;
  difference: number;
}

export interface Person {
  id: string;
  displayName: string;
  alternativeNames: string[];
  primaryImage: ImageData;
  primaryProfessions: string[];
  biography: string;
  heightCm: number;
  birthName: string;
  birthDate: DateData;
  birthLocation: string;
  deathDate: DateData;
  deathLocation: string;
  deathReason: string;
  meterRanking: MeterRanking;
}

export interface Rating {
  aggregateRating: number;
  voteCount: number;
}

export interface Metacritic {
  url: string;
  score: number;
  reviewCount: number;
}

export interface Country {
  code: string;
  name: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface Interest {
  id: string;
  name: string;
  primaryImage: ImageData;
  description: string;
  isSubgenre: boolean;
  similarInterests: any[];
}

export interface Movie {
  id: string;
  type: string;
  isAdult: boolean;
  primaryTitle: string;
  originalTitle: string;
  primaryImage: ImageData;
  startYear: number;
  endYear: number;
  runtimeSeconds: number;
  genres: string[];
  rating: Rating;
  metacritic: Metacritic;
  plot: string;
  directors: Person[];
  writers: Person[];
  stars: Person[];
  originCountries: Country[];
  spokenLanguages: Language[];
  interests: Interest[];
}

export interface MovieSearchResponse {
  titles: Movie[];
  totalCount: number;
  nextPageToken: string;
}

export const IMDB_API_CONFIG = {
  base_url: "https://api.imdbapi.dev",
};

export const fetchMovies = async ({
  title,
}: {
  title: string;
}): Promise<Movie[]> => {
  const url = title
    ? `${IMDB_API_CONFIG.base_url}/search/titles?query=${title}`
    : `${IMDB_API_CONFIG.base_url}/titles?sortBy=SORT_BY_POPULARITY&sortOrder=ASC`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`failed to fetch movies: ${response.statusText}`);
  }
  const responseJson: MovieSearchResponse = await response.json();
  return responseJson.titles;
};
