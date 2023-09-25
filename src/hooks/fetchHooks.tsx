import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  characterResSchema,
  CharacterRes,
  episodeSchema,
  Episode,
  locationSchema,
  Location,
} from "../types";

const BASE_URL = "https://rickandmortyapi.com/api";

export function useCharacters(name: string) {
  const queryFn = ({ pageParam = 0 }) =>
    axios({
      url: `${BASE_URL}/character`,
      params: {
        name,
        page: pageParam,
      },
    }).then((res) => {
      characterResSchema.parse(res.data);
      return res.data as CharacterRes;
    });

  return useInfiniteQuery(["characters", name], queryFn, {
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) return;

      const nextPageURL = new URL(lastPage.info.next);
      const nextPage = nextPageURL.searchParams.get("page");
      return nextPage;
    },
    useErrorBoundary: false,
  });
}

export function useEpisode(url: string, enabled: boolean) {
  const queryFn = () =>
    axios({ url }).then((res) => {
      episodeSchema.parse(res.data);
      return res.data as Episode;
    });

  return useQuery(["epidsode", url], queryFn, {
    enabled: !!url && enabled,
    cacheTime: 1000 * 60 * 5, // 5 min
  });
}

export function useLocation(url: string, enabled: boolean) {
  const queryFn = () =>
    axios({ url }).then((res) => {
      locationSchema.parse(res.data);
      return res.data as Location;
    });

  return useQuery(["epidsode", url], queryFn, {
    enabled: !!url && enabled,
    cacheTime: 1000 * 60 * 5, // 5 min
  });
}
