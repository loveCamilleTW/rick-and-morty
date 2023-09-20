import axios from "axios";
import { useInfiniteQuery } from "react-query";

const BASE_URL = "https://rickandmortyapi.com/api";

export function useCharacters() {
  const queryFn = ({ pageParam = 0 }) =>
    axios({
      url: `${BASE_URL}/character`,
      params: { page: pageParam },
    });

  return useInfiniteQuery(["characters"], queryFn, {
    getNextPageParam: (lastPage) => {
      const nextPageURL = new URL(lastPage.data.info.next);
      const nextPage = nextPageURL.searchParams.get("page");
      return nextPage;
    },
  });
}
