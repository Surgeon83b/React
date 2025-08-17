'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { usePokemonState } from '@/store/store';
import type { ListCardProps } from '@/types';

const ListCard = ({ id, name, description }: ListCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toggleItem, isSelected } = usePokemonState();
  const checked = isSelected(id);

  const setParams = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('details', id);
    router.push(`?${newParams.toString()}`);
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