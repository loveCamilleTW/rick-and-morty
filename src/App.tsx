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
    <div>
      <CharacterCardList characterPages={characterPages} />
      <div className="sentinal" ref={sentinalRef}>
        Hi
      </div>
    </div>
  );
}

export default App;
