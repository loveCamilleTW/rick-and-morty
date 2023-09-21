import { Character } from "../types";
import "./characterCard.css";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard(props: CharacterCardProps) {
  const { character } = props;

  return (
    <article className="character-card">
      <div className="character-card-inner">
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
