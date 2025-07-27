import type {Pokemon} from "@/types.ts";

const Card = (pokemon: Pokemon) => {
  const {name, sprites, height, weight} = pokemon;

  return (
    <div className='card'>
      <h2>{name}</h2>
      <img src={sprites.front_default} alt={name} />
      <div>Height: {height}</div>
      <div>Weight: {weight}</div>
    </div>
  );
};

export default Card;
