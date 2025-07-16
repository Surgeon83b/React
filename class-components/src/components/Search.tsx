import { type ChangeEvent, Component } from 'react';
import { fetchData } from '../api/fetch.ts';
import type { Pokemon, State } from '../types.ts';

interface SearchProps {
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
    this.handleSearch();
  };

  handleSearch = () => {
    const { onSearch } = this.props;
    onSearch([], '');
    setTimeout(
      () =>
        fetchData(this.state.search ? `/${this.state.search}` : '?limit=100&offset=0').then(
          (data) => {
            this.setState({ ...this.state, data: data.data });
            onSearch(data.data, data.error ?? '');
          }
        ),
      500
    );
  };

  componentDidMount() {
    this.handleSearch();
  }

  render() {
    return (
      <>
        <div className='hint'>
          Type 'pokemon' or leave field empty to get data
        </div>
        <div className='flex space-between search'>
          <input
            placeholder={'Search'}
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
