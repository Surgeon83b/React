import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import '@testing-library/jest-dom/vitest';

const mockOnSearch = vi.fn();

const defaultProps = {
  placeholder: 'Test placeholder',
  initialValue: '',
  onSearch: mockOnSearch,
};

describe('Search Component: Rendering', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // 1. Тест на рендеринг с переданными пропсами
  it('renders correctly with provided props', () => {
    render(<Search {...defaultProps} />);

    const input = screen.getByPlaceholderText(defaultProps.placeholder);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  // 2. Тест на загрузку из localStorage (с временной перезаписью мока)
  it('should display saved search term from localStorage on mount', () => {
    // Временная перезапись мока только для этого теста
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('pikachu');

    render(<Search {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('pikachu');
    expect(localStorage.getItem).toHaveBeenCalledWith('search');
  });

  it('should show empty input when no saved term exists', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    render(<Search {...defaultProps} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });


  /*// 5. Тест на обработку пустого ввода
  it('handles empty search correctly', async () => {
    const user = userEvent.setup();
    render(<Search {...defaultProps} />);

    const button = screen.getByRole('button', { name: /search/i });
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });*/
});

describe('Search Component: User events', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'search') {
        return 'pikachu'; // Начальное значение из localStorage
      }
      return null;
    });

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<Search {...defaultProps} />);

    const input = screen.getByPlaceholderText(defaultProps.placeholder);

    // 1. Проверяем начальное значение
    expect(input).toHaveValue('pikachu');

    // 2. Очищаем поле и вводим новое значение
    await user.clear(input);
    await user.type(input, 'bulbasaur');

    // 3. Проверяем обновленное значение
    expect(input).toHaveValue('bulbasaur');
  });

  it('saves search query to localStorage when search button is clicked', async () => {
    const user = userEvent.setup();
    const testQuery = 'new search query';

    render(<Search {...defaultProps} />);

    const input = screen.getByPlaceholderText(defaultProps.placeholder);
    const button = screen.getByRole('button', { name: /search/i });

    // Очищаем поле перед вводом нового значения
    await user.clear(input);
    await user.type(input, testQuery);
    await user.click(button);

    expect(localStorage.setItem).toHaveBeenCalledWith('search', testQuery);
  });

  it('should save trimmed value to localStorage on button click', async () => {
    const user = userEvent.setup();
    render(<Search {...defaultProps} />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    // Очищаем начальное значение перед новым вводом
    await user.clear(input);
    await user.type(input, '  charizard  ');
    await user.click(button);

    expect(localStorage.setItem).toHaveBeenCalledWith('search', 'charizard');
  });
});

