import { z } from "zod";

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),

  // status	string	The status of the character ('Alive', 'Dead' or 'unknown').
  status: z.string(),
  species: z.string(),
  type: z.string(),

  // The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
  gender: z.string(),

  // Name and link to the character's origin location.
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),

  // Name and link to the character's last known location endpoint.
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  image: z.string(),
  episode: z.string().array(),
  url: z.string(),

  // Time at which the character was created in the database.
  created: z.string(),
});

export const locationSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  dimension: z.string(),
  residents: z.string().array(),
  url: z.string(),
  created: z.string(),
});

export const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  air_date: z.string(),
  episode: z.string(),
  characters: z.string().array(),
  url: z.string(),
  created: z.string(),
});

export const infoSchema = z.object({
  count: z.number(),
  next: z.nullable(z.string()),
  pages: z.number(),
  prev: z.nullable(z.string()),
});

export const characterResSchema = z.object({
  info: infoSchema,
  results: characterSchema.array(),
});

export type Character = z.infer<typeof characterSchema>;
export type Location = z.infer<typeof locationSchema>;
export type Episode = z.infer<typeof episodeSchema>;
export type CharacterRes = z.infer<typeof characterResSchema>;
