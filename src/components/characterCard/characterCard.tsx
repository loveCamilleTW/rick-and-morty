import { Fragment, useState, MouseEvent } from "react";
import type { InfiniteData } from "react-query";
import { useEpisode, useLocation } from "../../hooks";
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
        <CharacterCardBack character={character} isFlipped={isFlipped} />
      </div>
    </article>
  );
}

interface CharacterCardBackProps {
  character: Character;
  isFlipped: boolean;
}

function CharacterCardBack(props: CharacterCardBackProps) {
  const { character, isFlipped } = props;

  const { data: lastLocation } = useLocation(character.location.url, isFlipped);
  const { data: originLocation } = useLocation(character.origin.url, isFlipped);

  console.log("character = ", character);

  return (
    <div className="character-card-back">
      <div id="location-info-container">
        <h3 className="location-title">Last known location</h3>
        <div>{character.location.name}</div>
        <div>{lastLocation ? lastLocation.dimension : null}</div>
        <h3 className="location-title">First seen in</h3>
        <div>{character.origin.name}</div>
        <div>{originLocation ? originLocation.dimension : null}</div>
      </div>
      <div id="episode-info-container">
        <h3>Episodes</h3>
        <div id="episode-list">
          {character.episode.map((episodeUrl) => (
            <EpisodeLink
              key={episodeUrl}
              episodeUrl={episodeUrl}
              enabled={isFlipped}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface EpisodeLinkProps {
  episodeUrl: string;
  enabled: boolean;
}

function EpisodeLink(props: EpisodeLinkProps) {
  const { episodeUrl, enabled } = props;
  const { data: episode } = useEpisode(episodeUrl, enabled);

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  if (!episode) return null;

  return (
    <a href={episodeUrl} onClick={onClick}>
      {`${episode.episode} ${episode.name}`}
    </a>
  );
}
