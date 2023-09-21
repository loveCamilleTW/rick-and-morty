import { Fragment, useState } from "react";
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
        characterPages.pages.map((page) => (
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
          <img src={character.image} />
          <div className="character-info">
            <h3 className="character-name">{character.name}</h3>
            <div>{character.status}</div>
            <div>{character.type}</div>
            <div>{character.gender}</div>
          </div>
        </div>
        <div className="character-card-back">
          <div>{character.episode}</div>
        </div>
      </div>
    </article>
  );
}
