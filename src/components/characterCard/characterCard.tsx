import { Fragment, useState, MouseEvent } from "react";
import type { InfiniteData } from "react-query";
import { CharacterRes, Character } from "../../types";
import "./characterCard.css";

interface CharacterCardListProps {
  characterPages: InfiniteData<CharacterRes>;
}

export function CharacterCardList(props: CharacterCardListProps) {
  const { characterPages } = props;

  return (
    <div className="characters">
      {characterPages.pages.map((page) => (
        <Fragment key={page.info.next}>
          {page.results.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </Fragment>
      ))}
    </div>
  );
}

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard(props: CharacterCardProps) {
  const { character } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  const onClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <article className="character-card" onClick={onClick}>
      <div
        className={`character-card-inner ${
          isFlipped ? "character-card-flip" : ""
        }`}
      >
        <div className="character-card-front">
          <div className="character-card-image-container">
            <img src={character.image} alt={character.name} />
          </div>
          <div className="character-info">
            <h2 className="character-name">{character.name}</h2>
            <ul>
              <li>
                <strong>Species:</strong> {character.species}
              </li>
              <li>
                <strong>Status:</strong> {character.status}
              </li>
              <li>
                <strong>Type:</strong> {character.type}
              </li>
              <li>
                <strong>Gender:</strong> {character.gender}
              </li>
            </ul>
          </div>
        </div>
        <div className="character-card-back">
          <h3>Episodes</h3>
          <div>
            {character.episode.map((episodeUrl) => (
              <EpisodeLink key={episodeUrl} episodeUrl={episodeUrl} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

interface EpisodeLinkProps {
  episodeUrl: string;
}

function EpisodeLink(props: EpisodeLinkProps) {
  const { episodeUrl } = props;
  const afterSplit = episodeUrl.split("/");
  const eipsodeNumber = afterSplit[afterSplit.length - 1];

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <a href={episodeUrl} onClick={onClick}>
      {eipsodeNumber}
    </a>
  );
}
