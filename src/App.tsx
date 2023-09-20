import { useEffect, useRef, Fragment } from "react";
import { useCharacters } from "./Hooks/fetchHooks";
import { CharacterCard } from "./components";
import type { Character } from "./components";

function App() {
  const { fetchNextPage, data: characterPages } = useCharacters();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sentinalRef.current) return;

    if (!observerRef.current) {
      const onView: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      };

      observerRef.current = new IntersectionObserver(onView);
      observerRef.current.observe(sentinalRef.current);
    }
  });

  if (!characterPages) return null;

  return (
    <div>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        characterPages.pages.map((page) => (
          <Fragment key={page.data.info.next}>
            {page.data.results.map((character: Character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </Fragment>
        ))
      }
      <div className="sentinal" ref={sentinalRef}>
        Hi
      </div>
    </div>
  );
}

export default App;
