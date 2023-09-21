import { useEffect, useRef } from "react";
import { useCharacters } from "./hooks/fetchHooks";
import { CharacterCardList } from "./components";
import "./App.css";

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
    <main id="main-section">
      <header>header</header>
      <article id="character-list">
        <CharacterCardList characterPages={characterPages} />
      </article>
      <div className="sentinal" ref={sentinalRef}>
        Hi
      </div>
    </main>
  );
}

export default App;
