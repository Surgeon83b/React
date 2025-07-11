import { Component } from 'react';

interface CardProps {
  name: string;
  description: string;
}

class Card extends Component<CardProps> {
  render() {
    const { name, description } = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>
          <a href={description}>{description}</a>
        </td>
      </tr>
    );
  }
}

export default Card;
