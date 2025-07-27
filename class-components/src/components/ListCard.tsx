import { useSearchParams } from 'react-router';
import * as React from "react";

interface CardProps {
  id: number;
  name: string;
  description: string;
}

const ListCard = ({ id, name, description }: CardProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParams = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('details', String(id));
    setSearchParams(newParams);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setParams();
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <button onClick={handleClick}>{description}</button>
      </td>
    </tr>
  );
};

export default ListCard;
