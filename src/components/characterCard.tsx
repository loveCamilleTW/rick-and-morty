import { Fragment, useState, MouseEvent } from "react";
import { Character } from "../types";
import "./characterCard.css";

interface CharacterCardListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  characterPages: any;
}

export function CharacterCardList(props: CharacterCardListProps) {
  const { characterPages } = props;

  return (
    <div className="characters">
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        characterPages.pages.map((page: any) => (
          <Fragment key={page.data.info.next}>
            {page.data.results.map((character: Character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </Fragment>
        ))
      }
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
            <img src={character.image} />
          </div>
          <div className="character-info">
            <h3 className="character-name">{character.name}</h3>
            <div>species: {character.species}</div>
            <div>{character.status}</div>
            <div>type: {character.type}</div>
            <div>{character.gender}</div>
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
