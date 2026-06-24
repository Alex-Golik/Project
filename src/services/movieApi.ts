import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MovieDetails, MovieSearchResponse } from '../types/movie';

const API_KEY = '372df539'; 

export interface OMDbBaseResponse {
  Response: 'True' | 'False';
  Error?: string;
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://omdbapi.com' }),
  endpoints: (builder) => ({
searchMovies: builder.query<MovieSearchResponse, { s: string; page: number; type?: string; y?: string }>({
      query: ({ s, page, type, y }) => ({
        url: '',
        params: {
          apikey: API_KEY,
          s: s.trim() || 'Batman',
          page,
          type: type || undefined,
          y: y || undefined,
        },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}_${queryArgs.s}_${queryArgs.type || ''}_${queryArgs.y || ''}`;
      },
       merge: (currentCache, newItems, { arg }) => {
        if (arg.page === 1) {
          return newItems;
        }

        if (currentCache.Search && newItems.Search) {

          const existingIds = new Set(currentCache.Search.map(m => m.imdbID));
          const uniqueNewMovies = newItems.Search.filter(m => !existingIds.has(m.imdbID));
          currentCache.Search.push(...uniqueNewMovies);
        }
        return currentCache;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page || currentArg?.s !== previousArg?.s;
      },
    }),

    getMovieDetails: builder.query<MovieDetails, string>({
      query: (id) => ({
        url: '',
        params: {
          apikey: API_KEY,
          i: id,
          plot: 'full',
        },
      }),

      transformResponse: (response: MovieDetails & OMDbBaseResponse) => {
        if (response.Response === 'False') {
          throw new Error(response.Error || 'Фильм не найден');
        }
        return response;
      },
    }),
  }),
});

export const { useSearchMoviesQuery, useGetMovieDetailsQuery } = movieApi;