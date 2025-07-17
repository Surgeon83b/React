import { type ChangeEvent, Component } from 'react';
import { fetchData } from '../../api/fetch.ts';
import type { Pokemon, State } from '../../types.ts';
import { getQueryString } from '../../helpers.ts';

interface SearchProps {
  placeholder: string;
  onSearch: (data: Array<Pokemon> | undefined, error: string) => void;
}

class Search extends Component<SearchProps, State> {
  state = {
    search: localStorage.getItem('search') || '',
    data: [],
  };

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ search: e.target.value });
  };

  handleClick = () => {
    const trimmedSearch = this.state.search.trim();
    localStorage.setItem('search', trimmedSearch);
    this.setState({ search: trimmedSearch, data: [] });
    this.handleSearch(getQueryString(this.state.search));
  };

  handleSearch = (query: string) => {
    const { onSearch } = this.props;
    onSearch([], '');
    setTimeout(
      () =>
        fetchData(query).then(
          (data) => {
            this.setState({ ...this.state, data: data.data });
            onSearch(data.data, data.error ?? '');
          }
        ),
      500
    );
  };

  componentDidMount() {
    this.handleSearch(getQueryString(this.state.search));
  }

  render() {
    return (
      <>
        <div className='hint'>
          Type 'pokemon' or leave field empty to get data
        </div>
        <div className='flex space-between search'>
          <input
            placeholder={this.props.placeholder}
            value={this.state.search}
            onChange={this.handleInputChange}
          />
          <button onClick={this.handleClick}>Search</button>
        </div>
      </>
    );
  }
}

export default Search;
