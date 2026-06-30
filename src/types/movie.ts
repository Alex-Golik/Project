export interface MovieShort {
  Title: string;
  Year: string;
  imdbID: string; 
  Type: string;
  Poster: string;
}


export interface MovieSearchResponse {
  Search?: MovieShort[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}


export interface MovieDetails {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string; 
  Poster: string;
  imdbRating: string;
  Response: "True" | "False";
}