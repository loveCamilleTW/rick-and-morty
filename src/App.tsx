import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useCharacters, useDebounce } from "./hooks";
import { Header, CharacterCardList } from "./components";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);
  const { fetchNextPage, data: characterPages } = useCharacters(debouncedQuery);
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

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <main id="main-section">
      <Header query={query} onChange={handleQueryChange} />
      <article id="character-list">
        {!characterPages ? (
          <h2>not found...</h2>
        ) : (
          <CharacterCardList characterPages={characterPages} />
        )}
      </article>

      <div className="sentinal" ref={sentinalRef}>
        Hi
      </div>
    </main>
  );
}

export default App;
