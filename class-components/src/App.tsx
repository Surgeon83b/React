import './App.css';
import Search from './components/Search/Search.tsx';
import Results from './components/Results/Results.tsx';
import { Component } from 'react';
import type { Pokemon } from './types.ts';
import { ErrorBoundary } from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton.tsx';
import ErrorPage from './components/ErrorPage.tsx';

interface AppState {
  data?: Pokemon[];
  error: string;
}

class App extends Component<Record<string, never>, AppState> {
  state: AppState = {
    data: [],
    error: '',
  };

  onSearch = (newData: Array<Pokemon> | undefined, err: string) => {
    this.setState({ data: newData, error: err });
  };

  render() {

    return (
      <ErrorBoundary fallback={<ErrorPage />}>
        <div className='flex wrapper full'>
          <div className='info'>
            <Search onSearch={this.onSearch} placeholder={'Search'} />
            <Results data={this.state.data} error={this.state.error} />
          </div>
          <ErrorButton />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
