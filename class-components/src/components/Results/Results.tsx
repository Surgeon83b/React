import { Component } from 'react';
import type { Pokemon } from '../../types.ts';
import Card from '../Card.tsx';
import Spinner from '../Spinner.tsx';

interface ResultProps {
  data: Array<Pokemon> | undefined;
  error: string;
}

class Results extends Component<ResultProps> {
  render() {
    const { data, error } = this.props;
    if (!error && !data?.length) return <Spinner />;

    return (
      <>
        Results
        {data?.length ? (
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <td className={'green'}>Name</td>
                  <td className={'green'}>Description</td>
                </tr>
              </thead>
              <tbody>
                {data.map((card, index) => (
                  <Card key={index} name={card.name} description={card.url ?? `id: ${card.id}, height: ${card.height}, weight: ${card.weight}`} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>{error}</div>
        )}
      </>
    );
  }
}

export default Results;
