import { z } from "zod";

const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string(),
  gender: z.string(),
  image: z.string(),
});

export type Character = z.infer<typeof characterSchema>;

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard(props: CharacterCardProps) {
  const { character } = props;

  return (
    <article>
      <img src={character.image} />
    </article>
  );
}
