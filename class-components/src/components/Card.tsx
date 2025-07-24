import { useSearchParams } from 'react-router';

interface CardProps {
  id: number;
  name: string;
  description: string;
}

const Card = ({ id, name, description }: CardProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParams = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('details', String(id));
    setSearchParams(newParams);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        <button onClick={() => setParams()}>{description}</button>
      </td>
    </tr>
  );
};

export default Card;
