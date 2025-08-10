import { useSearchParams } from 'react-router';
import * as React from 'react';
import type { ListCardProps } from '@/types.ts';
import { usePokemonState } from '@/store/store.ts';

const ListCard = ({ id, name, description }: ListCardProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toggleItem, isSelected } = usePokemonState();
  const checked = isSelected(id);

  const setParams = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('details', id);
    setSearchParams(newParams);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setParams();
  };

  return (
    <tr>
      <td>
        <input
          type='checkbox'
          checked={checked}
          onChange={() => toggleItem({ id, name, description })}
        />
      </td>
      <td>{name}</td>
      <td>
        <button onClick={handleClick}>{description}</button>
      </td>
    </tr>
  );
};

export default ListCard;
