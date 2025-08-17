import type {Pokemon} from "@/types.ts";
import Image from 'next/image';

const Card = (pokemon: Pokemon) => {
  const {name, sprites, height, weight} = pokemon;

  return (
    <div className='card'>
      <h2>{name}</h2>
      <Image src={sprites?.front_default ?? ''} alt={name} width="100" height="100"/>
      <div>Height: {height}</div>
      <div>Weight: {weight}</div>
    </div>
  );
};

export default Card;
