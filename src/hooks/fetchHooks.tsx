import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { characterResSchema, CharacterRes } from "../types";

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
      const nextPageURL = new URL(lastPage.info.next);
      const nextPage = nextPageURL.searchParams.get("page");
      return nextPage;
    },
    useErrorBoundary: true,
  });
}
