import { z } from "zod";

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  image: z.string(),
  episode: z.string().array(),
  url: z.string(),
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

export type Character = z.infer<typeof characterSchema>;
export type Location = z.infer<typeof locationSchema>;
export type Episode = z.infer<typeof episodeSchema>;
